"use client";

import * as React from "react";
import {
  Upload,
  X,
  ImageIcon,
  Plus,
  Video as VideoIcon,
  Play,
  Camera,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { InputLabel } from "@/components/custom/Input/InputLabel";
import { InputHelper } from "@/components/custom/Input/InputHelper";
import {
  dropzoneVariants,
  iconWrapperVariants,
  avatarContainerVariants,
  ICON_SIZES,
  AVATAR_ICON_SIZES,
  PLACEHOLDER_TEXT,
  BROWSE_HINT,
  FILE_UPLOAD_COLORS,
  FILE_UPLOAD_SIZES,
  FILE_UPLOAD_STATUS_STYLES,
  FILE_UPLOAD_TRANSITION,
  PROGRESS_TRANSITION,
  getDropzoneStyle,
  getFileExt,
  truncateMiddle,
  type FileUploadStatus,
  type FileUploadTone,
  type FileUploadSizeKey,
} from "./fileUploadVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FileUploadVariant =
  | "image"
  | "file"
  | "avatar"
  | "video"
  /** Single-document row for long forms — a dropzone would dominate the page. */
  | "compact"
  /** Reorderable image grid whose first tile is always the cover. */
  | "gallery";

export type FileUploadSize = FileUploadSizeKey;

export type { FileUploadStatus, FileUploadTone } from "./fileUploadVariants";

/** Internal representation of a locally-selected file with a preview URL. */
export interface FileUploadLocalFile {
  file: File;
  /** Object URL for image preview — created via URL.createObjectURL(). */
  previewUrl: string;
  /** Stable random ID for React key. */
  id: string;
}

/**
 * A file row driven entirely by the caller. Pass these through `items` when the
 * upload lifecycle lives in your own store — the component then renders the
 * design's nine states rather than deriving `idle` / `done` from `value`.
 */
export interface FileUploadItem {
  /** Stable key. Falls back to the name when omitted. */
  id?: string;
  name: string;
  /** Bytes, or a pre-formatted string such as `"1.2 MB"`. */
  size?: number | string;
  /** Tile label. Derived from the extension in `name` when omitted. */
  ext?: string;
  /** Lifecycle state. Defaults to `"idle"`. */
  status?: FileUploadStatus;
  /** 0–100. Drives the bar and the `{pct}` badge on in-flight rows. */
  progress?: number;
  /** Overrides the status's default note — name the rule that was broken. */
  note?: string;
  /** Preview URL, used by the image / gallery / video shapes. */
  url?: string;
}

export interface FileUploadProps {
  // ── Visual ──────────────────────────────────────────────────────────────────
  /** Controls layout and default accept type. Defaults to "file". */
  variant?: FileUploadVariant;
  /** Controls spacing and icon sizes. Defaults to "md". */
  size?: FileUploadSize;
  /** Surface the control sits on. `"dark"` restyles the dropzone. Defaults to "light". */
  tone?: FileUploadTone;

  // ── Native input ────────────────────────────────────────────────────────────
  /** Forwarded to the hidden <input type="file" accept="...">. Overrides variant default. */
  accept?: string;
  /** Allow selecting multiple files at once. */
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  /** Native input name — useful in form submissions. */
  name?: string;
  /** Explicit id for the hidden input (also used for label htmlFor). */
  id?: string;

  // ── Constraints ─────────────────────────────────────────────────────────────
  /** Per-file size limit in bytes. Files exceeding this are rejected. */
  maxSize?: number;
  /** Maximum number of files allowed (only meaningful when multiple=true). */
  maxFiles?: number;
  /**
   * Allowed file extensions. Files with any other extension are rejected with
   * an error message. Accepts with or without a leading dot — e.g. `['jpg', '.png', 'pdf']`.
   * Also sets the native `accept` attribute on the hidden input (overridden by `accept` prop).
   */
  allowedFiles?: string[];
  /**
   * Constraint chips shown inside the dropzone, before anything is picked.
   * Auto-derived from `allowedFiles` and `maxSize` when omitted; pass `[]` to hide.
   */
  formats?: string[];

  // ── Controlled value (server/existing URLs) ─────────────────────────────────
  /**
   * Controlled URL(s) for showing already-uploaded content.
   * - image / avatar / gallery: renders as <img> preview
   * - file / compact: renders as a file row
   * Pass a string for single, string[] for multiple.
   */
  value?: string | string[];
  /**
   * Fully-controlled file rows with their own lifecycle state. When provided,
   * the row list is rendered from these instead of being derived from `value`
   * and the local selection.
   */
  items?: FileUploadItem[];

  // ── Callbacks ───────────────────────────────────────────────────────────────
  /** Fired whenever the user selects valid files. Receives the raw File list. */
  onChange?: (files: File[]) => void;
  /**
   * Fired with the internal FileUploadLocalFile list on every change.
   * Useful when you need the auto-generated preview URLs.
   */
  onFilesChange?: (files: FileUploadLocalFile[]) => void;
  /** Fired when the remove button is clicked on a single-value field. */
  onRemove?: () => void;
  /** Fired when a specific item is removed from a multi-value field (index into the combined display list). */
  onRemoveFile?: (index: number) => void;
  /** Fired when any files are rejected due to size/count validation. */
  onValidationError?: (errors: string[]) => void;
  /** Retry a single failed row — one failure never restarts the batch. */
  onRetry?: (item: FileUploadItem, index: number) => void;
  /** Retry every failed row from the batch summary bar. */
  onRetryAll?: () => void;
  /** Keep the existing copy of a duplicate. */
  onSkip?: (item: FileUploadItem, index: number) => void;
  /** Overwrite the existing copy of a duplicate. */
  onReplace?: (item: FileUploadItem, index: number) => void;
  /** Open the crop tool for an image whose dimensions do not match. */
  onCrop?: (item: FileUploadItem, index: number) => void;

  // ── Field decoration ────────────────────────────────────────────────────────
  label?: React.ReactNode;
  required?: boolean;
  /** Shown below the field in red. Also shown for internal validation errors. */
  error?: string;
  helperText?: string;
  /** Main line in the empty-state dropzone. Falls back to variant default. */
  placeholder?: string;
  /** Sub-line in the empty-state dropzone (e.g. "PNG, JPG up to 5 MB"). */
  description?: string;
  /** Sub-line under the dropzone title. Defaults to "or click to browse". */
  browseHint?: string;

  // ── Behaviour ───────────────────────────────────────────────────────────────
  /** Enable drag-and-drop. Defaults to true. */
  dragAndDrop?: boolean;
  /**
   * Auto-generate local object-URL previews from selected File objects
   * (shown immediately before upload completes). Defaults to true.
   * Previews are revoked automatically on unmount or when `value` prop changes.
   */
  showLocalPreview?: boolean;
  /** Show the × clear button. Defaults to true. */
  clearable?: boolean;
  /**
   * Show the "Change" button in the image hover overlay. Defaults to true.
   * Set to false to make the preview display-only while still allowing removal via clearable.
   * When both changeable and clearable are false the overlay is hidden entirely.
   */
  changeable?: boolean;
  /**
   * Render the right-hand status pill on each row. Defaults to true. With it
   * off, done rows fall back to the check disc and in-flight rows to a bare
   * percentage, as in the design's live-upload list.
   */
  showStatusBadge?: boolean;
  /** Render the "Nothing uploaded yet" placeholder when the row list is empty. */
  showEmptyListHint?: boolean;
  /**
   * Render the dropzone above the row list. Defaults to true. Turn it off to
   * show the rows on their own — e.g. when the picker lives elsewhere on the page.
   */
  showDropzone?: boolean;
  /**
   * Render the batch summary bar above the rows. It never blocks the page —
   * uploading continues while the operator works.
   */
  batchSummary?: boolean;
  /** Caption under the batch bar, e.g. "14.2 MB of 19.0 MB · about 40 seconds left". */
  batchCaption?: string;

  // ── Avatar shape ────────────────────────────────────────────────────────────
  /** Initials fallback for the avatar — never a grey silhouette icon. */
  initials?: string;

  // ── Gallery shape ───────────────────────────────────────────────────────────
  /** Tiles per row in the gallery shape. Defaults to 4. */
  galleryColumns?: number;
  /** Mark the first tile as the cover. Defaults to true. */
  coverBadge?: boolean;

  // ── Icon badge ──────────────────────────────────────────────────────────────
  /**
   * Icon element rendered as a small badge in the bottom-right corner of the
   * image or avatar preview. Useful for camera, edit, or brand indicators.
   * Not rendered in the file variant or on empty-state dropzones.
   */
  icon?: React.ReactNode;

  // ── Styling ─────────────────────────────────────────────────────────────────
  /** Applied to the outermost wrapper div. */
  className?: string;
  /** Applied to the dropzone area (not used in avatar variant). */
  dropzoneClassName?: string;

  // ── Ref ─────────────────────────────────────────────────────────────────────
  /** Ref forwarded to the hidden <input type="file"> element. */
  inputRef?: React.Ref<HTMLInputElement>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const C = FILE_UPLOAD_COLORS;

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${units[i]}`;
}

function getDefaultAccept(variant: FileUploadVariant): string | undefined {
  if (variant === "image" || variant === "avatar" || variant === "gallery") return "image/*";
  if (variant === "video") return "video/*";
  return undefined;
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function deriveInitials(source?: string): string | null {
  if (!source) return null;
  const parts = source.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  return parts
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

/** Tabular figures keep percentages and sizes from jittering as they tick. */
const TABULAR: React.CSSProperties = { fontFeatureSettings: '"tnum" 1, "lnum" 1' };

// ─── Component ────────────────────────────────────────────────────────────────

function FileUpload({
  variant = "file",
  size = "md",
  tone = "light",
  accept,
  multiple = false,
  disabled = false,
  readOnly = false,
  name,
  id,
  maxSize,
  maxFiles,
  allowedFiles,
  formats,
  value,
  items,
  onChange,
  onFilesChange,
  onRemove,
  onRemoveFile,
  onValidationError,
  onRetry,
  onRetryAll,
  onSkip,
  onReplace,
  onCrop,
  label,
  required = false,
  error,
  helperText,
  placeholder,
  description,
  browseHint = BROWSE_HINT,
  dragAndDrop = true,
  showLocalPreview = true,
  clearable = true,
  changeable = true,
  showStatusBadge = true,
  showEmptyListHint = false,
  showDropzone = true,
  batchSummary = false,
  batchCaption,
  initials,
  galleryColumns = 4,
  coverBadge = true,
  icon,
  className,
  dropzoneClassName,
  inputRef: externalInputRef,
}: FileUploadProps) {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const spec = FILE_UPLOAD_SIZES[size] ?? FILE_UPLOAD_SIZES.md;

  const internalInputRef = React.useRef<HTMLInputElement>(null);

  // Merge external and internal refs onto the hidden <input>
  const attachInputRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      (internalInputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (!externalInputRef) return;
      if (typeof externalInputRef === "function") {
        externalInputRef(node);
      } else {
        (externalInputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [externalInputRef],
  );

  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);
  const [localFiles, setLocalFiles] = React.useState<FileUploadLocalFile[]>([]);
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);

  const isImageVariant = variant === "image" || variant === "avatar" || variant === "gallery";
  const isPreviewVariant = isImageVariant || variant === "video";

  // Normalise allowedFiles → ['.jpg', '.png', ...] (lowercase, leading dot)
  const normalizedAllowedExts = React.useMemo(
    () => allowedFiles?.map((e) => (e.startsWith(".") ? e.toLowerCase() : `.${e.toLowerCase()}`)),
    [allowedFiles],
  );

  // accept: explicit prop wins, then allowedFiles-derived, then variant default
  const effectiveAccept =
    accept ??
    (normalizedAllowedExts ? normalizedAllowedExts.join(",") : getDefaultAccept(variant));

  /**
   * Constraint chips. Every dropzone states its accepted formats and size cap
   * before anything is selected — rejecting a file after a 40-second upload is
   * a design failure, not a validation success.
   */
  const chips = React.useMemo<string[]>(() => {
    if (formats) return formats;
    const derived: string[] = [];
    normalizedAllowedExts?.forEach((e) => derived.push(e.replace(".", "").toUpperCase()));
    if (maxSize) derived.push(`Max ${formatBytes(maxSize, 0)}`);
    return derived;
  }, [formats, normalizedAllowedExts, maxSize]);

  // Derive controlled URLs
  const controlledUrls = React.useMemo<string[]>(() => {
    if (!value) return [];
    return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
  }, [value]);

  const hasControlledValue = controlledUrls.length > 0;

  // Build unified display list: controlled URLs first, then local file previews
  type DisplayItem =
    | { kind: "url"; url: string; index: number }
    | { kind: "file"; localFile: FileUploadLocalFile; index: number };

  const displayItems = React.useMemo<DisplayItem[]>(() => {
    const list: DisplayItem[] = [];
    controlledUrls.forEach((url, i) => list.push({ kind: "url", url, index: i }));
    if (showLocalPreview) {
      localFiles.forEach((lf, i) =>
        list.push({ kind: "file", localFile: lf, index: controlledUrls.length + i }),
      );
    }
    return list;
  }, [controlledUrls, localFiles, showLocalPreview]);


  // Clear local previews when controlled value is set (upload completed)
  React.useEffect(() => {
    if (hasControlledValue && localFiles.length > 0) {
      localFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
      setLocalFiles([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasControlledValue]);

  // Revoke all local object URLs on unmount
  React.useEffect(() => {
    return () => {
      localFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── File validation ────────────────────────────────────────────────────────

  const validateAndFilter = (incoming: File[]): { valid: File[]; errors: string[] } => {
    const errors: string[] = [];
    let valid = incoming;

    if (normalizedAllowedExts && normalizedAllowedExts.length > 0) {
      const rejected = valid.filter((f) => {
        const ext = `.${f.name.split(".").pop()?.toLowerCase() ?? ""}`;
        return !normalizedAllowedExts.includes(ext);
      });
      if (rejected.length > 0) {
        errors.push(
          `${rejected.map((f) => f.name).join(", ")} ${rejected.length === 1 ? "is" : "are"} not allowed. Accepted types: ${normalizedAllowedExts.join(", ")}`,
        );
        valid = valid.filter((f) => {
          const ext = `.${f.name.split(".").pop()?.toLowerCase() ?? ""}`;
          return normalizedAllowedExts.includes(ext);
        });
      }
    }

    if (maxSize) {
      const oversized = valid.filter((f) => f.size > maxSize);
      if (oversized.length > 0) {
        oversized.forEach((f) => {
          errors.push(
            `${f.name} (${formatBytes(f.size)}) exceeds the ${formatBytes(maxSize)} limit`,
          );
        });
        valid = valid.filter((f) => f.size <= maxSize);
      }
    }

    if (multiple && maxFiles !== undefined) {
      const current = displayItems.length;
      const remaining = maxFiles - current;
      if (valid.length > remaining) {
        const skipped = valid.length - Math.max(0, remaining);
        if (skipped > 0) {
          errors.push(`${skipped} file(s) skipped — max ${maxFiles} allowed`);
        }
        valid = valid.slice(0, Math.max(0, remaining));
      }
    }

    return { valid, errors };
  };

  // ── File processing ────────────────────────────────────────────────────────

  const processFiles = React.useCallback(
    (incoming: FileList | File[]) => {
      const fileArray = Array.from(incoming);
      const { valid, errors } = validateAndFilter(fileArray);

      if (errors.length > 0) {
        setValidationErrors(errors);
        onValidationError?.(errors);
      } else {
        setValidationErrors([]);
      }

      if (valid.length === 0) return;

      if (showLocalPreview && isPreviewVariant) {
        const newLocal: FileUploadLocalFile[] = valid.map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
          id: makeId(),
        }));

        if (multiple) {
          setLocalFiles((prev) => {
            const updated = [...prev, ...newLocal];
            onFilesChange?.(updated);
            return updated;
          });
        } else {
          setLocalFiles((prev) => {
            prev.forEach((f) => URL.revokeObjectURL(f.previewUrl));
            const updated = newLocal.slice(0, 1);
            onFilesChange?.(updated);
            return updated;
          });
        }
      } else if (!isPreviewVariant && multiple) {
        const newLocal: FileUploadLocalFile[] = valid.map((file) => ({
          file,
          previewUrl: "",
          id: makeId(),
        }));
        setLocalFiles((prev) => {
          const updated = [...prev, ...newLocal];
          onFilesChange?.(updated);
          return updated;
        });
      } else if (!isPreviewVariant) {
        const newLocal: FileUploadLocalFile[] = valid.slice(0, 1).map((file) => ({
          file,
          previewUrl: "",
          id: makeId(),
        }));
        setLocalFiles(() => {
          onFilesChange?.(newLocal);
          return newLocal;
        });
      }

      onChange?.(valid);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiple, maxFiles, maxSize, normalizedAllowedExts, displayItems.length, isImageVariant, showLocalPreview, onChange, onFilesChange, onValidationError],
  );

  // ── Interaction handlers ───────────────────────────────────────────────────

  const openFilePicker = React.useCallback(() => {
    if (disabled || readOnly) return;
    internalInputRef.current?.click();
  }, [disabled, readOnly]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // Allow re-selecting the same file
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (disabled || readOnly || !dragAndDrop) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (disabled || readOnly || !dragAndDrop) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFilePicker();
    }
  };

  const handleRemoveItem = (e: React.MouseEvent, item: DisplayItem) => {
    e.preventDefault();
    e.stopPropagation();

    if (item.kind === "url") {
      // Single value: call onRemove; multi: call onRemoveFile(index)
      if (!multiple && controlledUrls.length === 1) {
        onRemove?.();
      } else {
        onRemoveFile?.(item.index);
      }
    } else {
      // Local file
      URL.revokeObjectURL(item.localFile.previewUrl);
      setLocalFiles((prev) => {
        const updated = prev.filter((f) => f.id !== item.localFile.id);
        onFilesChange?.(updated);
        return updated;
      });
      onRemoveFile?.(item.index);
    }
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    localFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setLocalFiles([]);
    setValidationErrors([]);
    onFilesChange?.([]);
    onRemove?.();
  };

  // ── Dropzone state ─────────────────────────────────────────────────────────

  type DzState = "idle" | "hover" | "dragover" | "error" | "disabled";
  const dzState: DzState = disabled
    ? "disabled"
    : isDragOver
    ? "dragover"
    : error || validationErrors.length > 0
    ? "error"
    : isHover && !readOnly
    ? "hover"
    : "idle";

  const dz = getDropzoneStyle(dzState, tone);

  const combinedError = error ?? validationErrors[0];
  const iconSize = ICON_SIZES[size] ?? spec.tileIcon;
  const avatarIconSize = AVATAR_ICON_SIZES[size] ?? 20;

  // ── Row list ───────────────────────────────────────────────────────────────

  /**
   * Rows come from `items` when the caller owns the lifecycle; otherwise they
   * are derived from the controlled URLs (already uploaded → done) and the
   * local selection (picked, nothing has happened yet → idle).
   */
  const rows = React.useMemo<FileUploadItem[]>(() => {
    if (items) return items;
    return displayItems.map((item) => {
      if (item.kind === "url") {
        const fileName = item.url.split("/").pop() || item.url;
        return { id: `url-${item.index}`, name: fileName, url: item.url, status: "done" as const };
      }
      return {
        id: item.localFile.id,
        name: item.localFile.file.name,
        size: item.localFile.file.size,
        url: item.localFile.previewUrl || undefined,
        status: "idle" as const,
      };
    });
  }, [items, displayItems]);

  /** Occupied slots — `items` wins when the caller owns the lifecycle. */
  const filledCount = items ? rows.length : displayItems.length;

  const canAddMore =
    !disabled &&
    !readOnly &&
    (!maxFiles || filledCount < maxFiles);

  const removeRow = (index: number) => {
    if (items) {
      onRemoveFile?.(index);
      return;
    }
    const target = displayItems[index];
    if (!target) return;
    handleRemoveItem(
      { preventDefault() {}, stopPropagation() {} } as unknown as React.MouseEvent,
      target,
    );
  };

  // ── Shared drag/click props for empty drop zones ──────────────────────────

  const dropzoneInteractionProps = {
    role: "button" as const,
    tabIndex: disabled ? -1 : 0,
    onClick: openFilePicker,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    onKeyDown: handleKeyDown,
    onMouseEnter: () => setIsHover(true),
    onMouseLeave: () => setIsHover(false),
    "aria-label": placeholder ?? PLACEHOLDER_TEXT[variant] ?? PLACEHOLDER_TEXT.file,
  };

  // Drag-only props for filled-state containers (no click — buttons handle that)
  const filledDragProps = dragAndDrop && !disabled && !readOnly
    ? { onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop }
    : {};

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: dropzone (shared by file / image / video / gallery empty states)
  // ─────────────────────────────────────────────────────────────────────────────

  const renderDropzone = (glyph: React.ReactNode, title: string) => (
    <div
      {...dropzoneInteractionProps}
      className={cn(dropzoneVariants({ size, state: disabled ? "disabled" : "idle" }), dropzoneClassName)}
      style={{
        gap: spec.dropGap,
        padding: `${spec.dropPadY}px ${spec.dropPadX}px`,
        borderRadius: spec.dropRadius,
        background: dz.background,
        border: dz.border,
        boxShadow: dz.boxShadow,
        cursor: dz.cursor,
        opacity: dz.opacity,
        transition: FILE_UPLOAD_TRANSITION,
      }}
    >
      <span
        className={iconWrapperVariants({ size })}
        style={{
          width: spec.tile,
          height: spec.tile,
          borderRadius: spec.tileRadius,
          background: dz.tileBg,
          border: dz.tileBorder,
          color: dz.tileFg,
        }}
      >
        {glyph}
      </span>

      <span
        style={{
          fontSize: spec.title,
          fontWeight: 600,
          lineHeight: 1.3,
          color: dz.titleColor,
        }}
      >
        {title}
      </span>

      {browseHint && (
        <span style={{ fontSize: spec.sub, fontWeight: 400, lineHeight: 1.5, color: dz.subColor }}>
          {browseHint}
        </span>
      )}

      {description && (
        <span style={{ fontSize: spec.sub, fontWeight: 400, lineHeight: 1.5, color: dz.subColor }}>
          {description}
        </span>
      )}

      {chips.length > 0 && (
        <span className="flex flex-wrap items-center justify-center" style={{ gap: 6, marginTop: 2 }}>
          {chips.map((chip) => (
            <span
              key={chip}
              style={{
                fontSize: spec.chip,
                fontWeight: 600,
                lineHeight: 1.4,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                background: dz.chipBg,
                border: dz.chipBorder,
                color: dz.chipFg,
                padding: "3px 7px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
              {chip}
            </span>
          ))}
        </span>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: one file row (the nine upload states)
  // ─────────────────────────────────────────────────────────────────────────────

  const renderRow = (row: FileUploadItem, index: number) => {
    const status: FileUploadStatus = row.status ?? "idle";
    const st = FILE_UPLOAD_STATUS_STYLES[status];
    const pct = Math.max(0, Math.min(100, Math.round(row.progress ?? 0)));
    const pctLabel = `${pct}%`;

    const sizeLabel =
      typeof row.size === "number" ? formatBytes(row.size) : row.size ?? undefined;
    const note = row.note ?? st.note;
    const badgeText = showStatusBadge ? st.badgeText.replace("{pct}", pctLabel) : "";
    const showBar = st.bar;

    const actionPill = (
      text: string,
      onPress: (() => void) | undefined,
      border: string,
      color: string,
      bg: string = C.surface,
    ) => (
      <button
        key={text}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPress?.();
        }}
        disabled={disabled || readOnly}
        style={{
          height: spec.action,
          padding: "0 9px",
          border: `1px solid ${border}`,
          borderRadius: 7,
          background: bg,
          color,
          fontSize: spec.actionFont,
          fontWeight: 600,
          lineHeight: 1,
          cursor: disabled || readOnly ? "not-allowed" : "pointer",
          flex: "none",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </button>
    );

    return (
      <div
        key={row.id ?? `${row.name}-${index}`}
        className="flex items-center"
        style={{
          gap: spec.rowGap,
          padding: `${spec.rowPadY}px ${spec.rowPadX}px`,
          borderRadius: spec.rowRadius,
          minHeight: spec.rowMinHeight,
          background: st.rowBg,
          border: st.rowBorder,
        }}
      >
        {/* Extension tile */}
        <span
          className="flex items-center justify-center flex-none"
          style={{
            width: spec.extTile,
            height: spec.extTile,
            borderRadius: spec.extRadius,
            background: st.tileBg,
            color: st.tileFg,
            fontSize: spec.extFont,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {row.ext ?? getFileExt(row.name)}
        </span>

        {/* Name · size · bar · note */}
        <span className="flex-1 min-w-0 flex flex-col" style={{ gap: 5 }}>
          <span className="flex items-center" style={{ gap: 8 }}>
            <span
              className="flex-1 min-w-0 truncate"
              title={row.name}
              style={{
                fontSize: spec.name,
                fontWeight: 600,
                lineHeight: 1.3,
                color: st.nameColor,
              }}
            >
              {truncateMiddle(row.name, 34)}
            </span>
            {sizeLabel && (
              <span
                className="flex-none"
                style={{ ...TABULAR, fontSize: spec.meta, fontWeight: 500, lineHeight: 1, color: C.inkFg3 }}
              >
                {sizeLabel}
              </span>
            )}
          </span>

          {showBar && (
            <span
              className="block overflow-hidden"
              style={{ height: spec.bar, borderRadius: 99, background: C.borderSoft }}
            >
              <span
                className="block h-full"
                style={{
                  width: `${pct}%`,
                  borderRadius: 99,
                  background: st.barColor,
                  transition: PROGRESS_TRANSITION,
                }}
              />
            </span>
          )}

          {note && (
            <span
              style={{ ...TABULAR, fontSize: spec.meta, fontWeight: 500, lineHeight: 1.4, color: st.noteColor }}
            >
              {note}
            </span>
          )}
        </span>

        {/* Badge + actions */}
        <span className="flex items-center flex-none" style={{ gap: 6 }}>
          {badgeText && (
            <span
              className="flex-none"
              style={{
                ...TABULAR,
                fontSize: spec.actionFont,
                fontWeight: 600,
                lineHeight: 1,
                padding: "5px 9px",
                borderRadius: 7,
                background: st.badgeBg,
                color: st.badgeFg,
              }}
            >
              {badgeText}
            </span>
          )}

          {/* Bare percentage / check disc when the badge is switched off */}
          {!showStatusBadge && (status === "uploading" || status === "processing") && (
            <span style={{ ...TABULAR, fontSize: spec.actionFont, fontWeight: 600, color: C.inkFg3 }}>
              {pctLabel}
            </span>
          )}
          {!showStatusBadge && status === "done" && (
            <span
              className="flex items-center justify-center"
              style={{ width: 20, height: 20, borderRadius: "50%", background: C.mint }}
            >
              <Check size={11} strokeWidth={3.2} color={C.greenInk} />
            </span>
          )}

          {st.action === "retry" &&
            actionPill("Retry", () => onRetry?.(row, index), C.dangerOutline, C.dangerInk)}
          {st.action === "crop" &&
            actionPill("Crop it", () => onCrop?.(row, index), C.warnOutline, C.warnInk, C.onTint)}
          {st.action === "duplicate" && (
            <>
              {actionPill("Skip", () => onSkip?.(row, index), C.border, C.inkFg2)}
              {actionPill("Replace", () => onReplace?.(row, index), C.outlineBorder, C.deep)}
            </>
          )}

          {clearable && !disabled && !readOnly && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeRow(index);
              }}
              className="flex items-center justify-center flex-none transition-colors hover:bg-[#FBE9EA] hover:text-[#A8000F]"
              style={{ width: 24, height: 24, borderRadius: 6, background: "transparent", color: C.inkFg3 }}
              aria-label={`Remove ${row.name}`}
            >
              <X size={11} strokeWidth={3} />
            </button>
          )}
        </span>
      </div>
    );
  };

  const renderEmptyListHint = () => (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{
        gap: 6,
        border: `1px solid ${C.borderSoft}`,
        borderRadius: spec.rowRadius,
        padding: `${spec.dropPadY}px ${spec.dropPadX}px`,
      }}
    >
      <span style={{ fontSize: spec.name, fontWeight: 600, lineHeight: 1.3, color: C.inkFg2 }}>
        Nothing uploaded yet
      </span>
      <span style={{ fontSize: spec.meta, fontWeight: 400, lineHeight: 1.4, color: C.inkFg3 }}>
        Files appear here as a list with their own progress and errors.
      </span>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: batch summary bar
  // ─────────────────────────────────────────────────────────────────────────────

  const renderBatchSummary = () => {
    const total = rows.length;
    const doneCount = rows.filter((r) => r.status === "done" || r.status === "partial").length;
    const failedCount = rows.filter(
      (r) => r.status === "failed" || r.status === "rejected",
    ).length;
    const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

    return (
      <div
        className="overflow-hidden"
        style={{ border: `1px solid ${C.border}`, borderRadius: spec.compactRadius }}
      >
        <div
          className="flex items-center"
          style={{
            gap: 9,
            padding: `${spec.compactPadY}px ${spec.compactPadX}px`,
            background: C.subtle,
            borderBottom: `1px solid ${C.borderSoft}`,
          }}
        >
          <span
            className="flex-1"
            style={{ ...TABULAR, fontSize: spec.name, fontWeight: 600, lineHeight: 1.3, color: C.ink }}
          >
            {doneCount} of {total} uploaded
          </span>
          {failedCount > 0 && (
            <span
              style={{ ...TABULAR, fontSize: spec.meta, fontWeight: 500, lineHeight: 1.3, color: C.dangerInk }}
            >
              {failedCount} failed
            </span>
          )}
          {failedCount > 0 && onRetryAll && (
            <button
              type="button"
              onClick={onRetryAll}
              disabled={disabled || readOnly}
              style={{
                fontSize: spec.name,
                fontWeight: 600,
                lineHeight: 1.3,
                color: C.forest,
                background: "transparent",
                border: 0,
                cursor: disabled || readOnly ? "not-allowed" : "pointer",
              }}
            >
              Retry all
            </button>
          )}
        </div>
        <div
          className="flex flex-col"
          style={{ gap: 8, padding: `${spec.rowPadY}px ${spec.rowPadX}px` }}
        >
          <span
            className="block overflow-hidden"
            style={{ height: spec.bar + 1, borderRadius: 99, background: C.borderSoft }}
          >
            <span
              className="block h-full"
              style={{
                width: `${pct}%`,
                borderRadius: 99,
                background: C.deep,
                transition: PROGRESS_TRANSITION,
              }}
            />
          </span>
          {batchCaption && (
            <span style={{ ...TABULAR, fontSize: spec.meta, fontWeight: 500, lineHeight: 1.4, color: C.inkFg3 }}>
              {batchCaption}
            </span>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: image variant
  // ─────────────────────────────────────────────────────────────────────────────

  const renderImageVariant = () => {
    // ── Single image ───────────────────────────────────────────────────────────
    if (!multiple) {
      const item = displayItems[0];
      const previewUrl = item
        ? item.kind === "url"
          ? item.url
          : item.localFile.previewUrl
        : null;

      if (previewUrl) {
        return (
          <div
            {...filledDragProps}
            className="relative w-full overflow-hidden group"
            style={{
              borderRadius: spec.dropRadius,
              border: isDragOver ? `1.5px solid ${C.dropBorderActive}` : `1px solid ${C.border}`,
              transition: FILE_UPLOAD_TRANSITION,
              height: size === "sm" ? 96 : size === "lg" ? 176 : 128,
            }}
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
            {isDragOver && !disabled && !readOnly && (
              <div
                className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] pointer-events-none"
                style={{ background: "rgba(242,251,235,.7)" }}
              >
                <span style={{ fontSize: spec.name, fontWeight: 600, color: C.forest }}>
                  Drop to replace
                </span>
              </div>
            )}
            {icon && !disabled && !readOnly && (
              <button
                type="button"
                onClick={openFilePicker}
                onKeyDown={handleKeyDown}
                className="absolute bottom-2 right-2 z-10 flex items-center justify-center rounded-full"
                style={{
                  width: spec.avatarBadge,
                  height: spec.avatarBadge,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  color: C.forest,
                  boxShadow: "1px 1px 3px rgba(0,0,0,.12)",
                }}
                aria-label="Change image"
              >
                {icon}
              </button>
            )}
            {!disabled && !readOnly && (changeable || clearable) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 p-2.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
                  {changeable && (
                    <button
                      type="button"
                      onClick={openFilePicker}
                      onKeyDown={handleKeyDown}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 shadow transition-colors"
                      style={{
                        background: "rgba(255,255,255,.95)",
                        color: C.deep,
                        fontSize: spec.meta + 1,
                        fontWeight: 600,
                      }}
                      aria-label="Change image"
                    >
                      <ImageIcon size={12} />
                      Change
                    </button>
                  )}
                  {clearable && (
                    <button
                      type="button"
                      onClick={(e) => item && handleRemoveItem(e, item)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 shadow transition-colors"
                      style={{
                        background: C.dangerBar,
                        color: "#FFFFFF",
                        fontSize: spec.meta + 1,
                        fontWeight: 600,
                      }}
                      aria-label="Remove image"
                    >
                      <X size={12} />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      }

      return renderDropzone(
        <ImageIcon size={iconSize} strokeWidth={2} />,
        placeholder ?? PLACEHOLDER_TEXT.image,
      );
    }

    // ── Multiple images ────────────────────────────────────────────────────────
    if (displayItems.length === 0) {
      return renderDropzone(
        <ImageIcon size={iconSize} strokeWidth={2} />,
        placeholder ?? PLACEHOLDER_TEXT.image,
      );
    }

    return (
      <div
        {...filledDragProps}
        className="w-full"
        style={{
          borderRadius: spec.compactRadius,
          border: isDragOver ? `1.5px solid ${C.dropBorderActive}` : `1px solid ${C.border}`,
          padding: spec.galleryPad,
          transition: FILE_UPLOAD_TRANSITION,
        }}
      >
        <div className="flex flex-wrap" style={{ gap: spec.galleryGap }}>
          {displayItems.map((item) => {
            const url = item.kind === "url" ? item.url : item.localFile.previewUrl;
            return (
              <div
                key={item.kind === "url" ? `url-${item.index}` : item.localFile.id}
                className="relative group flex-shrink-0 overflow-hidden"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: spec.galleryTileRadius,
                  border: `1px solid ${C.galleryTileBorder}`,
                  background: C.galleryTileBg,
                }}
              >
                <img src={url} alt={`Image ${item.index + 1}`} className="w-full h-full object-cover" />
                {!disabled && !readOnly && clearable && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveItem(e, item)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(0,0,0,.6)" }}
                    aria-label="Remove"
                  >
                    <X size={10} strokeWidth={3} className="text-white" />
                  </button>
                )}
              </div>
            );
          })}

          {canAddMore && (
            <button
              type="button"
              onClick={openFilePicker}
              className="flex flex-col items-center justify-center flex-shrink-0 transition-colors"
              style={{
                width: 80,
                height: 80,
                gap: 2,
                borderRadius: spec.galleryTileRadius,
                border: `1.5px dashed ${C.borderStrong}`,
                background: C.surface,
                color: C.inkFg3,
              }}
              aria-label="Add image"
            >
              <Plus size={15} strokeWidth={2.4} />
              <span style={{ fontSize: spec.chip + 1, fontWeight: 600 }}>Add</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: gallery variant — reorderable grid, first tile is always the cover
  // ─────────────────────────────────────────────────────────────────────────────

  const renderGalleryVariant = () => (
    <div
      {...filledDragProps}
      className="w-full grid"
      style={{
        gridTemplateColumns: `repeat(${galleryColumns}, 1fr)`,
        gap: spec.galleryGap,
        padding: spec.galleryPad,
        borderRadius: spec.galleryRadius,
        border: isDragOver ? `1.5px solid ${C.dropBorderActive}` : `1px solid ${C.border}`,
        transition: FILE_UPLOAD_TRANSITION,
      }}
    >
      {displayItems.map((item) => {
        const url = item.kind === "url" ? item.url : item.localFile.previewUrl;
        return (
          <span
            key={item.kind === "url" ? `url-${item.index}` : item.localFile.id}
            className="relative group flex items-center justify-center overflow-hidden"
            style={{
              aspectRatio: "1",
              borderRadius: spec.galleryTileRadius,
              background: C.galleryTileBg,
              border: `1px solid ${C.galleryTileBorder}`,
            }}
          >
            {url ? (
              <img src={url} alt={`Image ${item.index + 1}`} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon size={15} strokeWidth={1.7} color={C.forest} style={{ opacity: 0.55 }} />
            )}

            {coverBadge && item.index === 0 && (
              <span
                className="absolute text-center"
                style={{
                  bottom: 3,
                  left: 3,
                  right: 3,
                  fontSize: 8,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  background: C.coverBg,
                  color: C.coverFg,
                  borderRadius: 4,
                  padding: "2px 0",
                }}
              >
                Cover
              </span>
            )}

            {!disabled && !readOnly && clearable && (
              <button
                type="button"
                onClick={(e) => handleRemoveItem(e, item)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,.6)" }}
                aria-label="Remove"
              >
                <X size={10} strokeWidth={3} className="text-white" />
              </button>
            )}
          </span>
        );
      })}

      {canAddMore && (
        <button
          type="button"
          onClick={openFilePicker}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="flex items-center justify-center transition-colors"
          style={{
            aspectRatio: "1",
            borderRadius: spec.galleryTileRadius,
            background: C.surface,
            border: `1.5px dashed ${C.borderStrong}`,
            color: C.borderStrong,
          }}
          aria-label="Add image"
        >
          <Plus size={15} strokeWidth={2.4} />
        </button>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: compact variant — a single required document inside a form row
  // ─────────────────────────────────────────────────────────────────────────────

  const renderCompactVariant = () => {
    const title =
      placeholder ?? (typeof label === "string" ? label : undefined) ?? PLACEHOLDER_TEXT.compact;
    const sub =
      description ??
      (chips.length > 0 ? chips.join(" · ") : undefined);

    return (
      <div className="flex flex-col" style={{ gap: 9 }}>
        <div
          {...filledDragProps}
          className="flex items-center w-full"
          style={{
            gap: 10,
            padding: `${spec.compactPadY}px ${spec.compactPadX}px`,
            border: isDragOver ? `1px solid ${C.dropBorderActive}` : `1px solid ${C.border}`,
            borderRadius: spec.compactRadius,
            background: disabled ? C.subtle : C.surface,
            transition: FILE_UPLOAD_TRANSITION,
          }}
        >
          <span className="flex-1 min-w-0 flex flex-col" style={{ gap: 2 }}>
            <span
              className="truncate"
              style={{
                fontSize: spec.name,
                fontWeight: 600,
                lineHeight: 1.3,
                color: disabled ? C.muted : C.inkFg1,
              }}
            >
              {title}
              {required && <span style={{ color: C.dangerBar, marginLeft: 3 }}>*</span>}
            </span>
            {sub && (
              <span style={{ fontSize: spec.meta, fontWeight: 400, lineHeight: 1.4, color: C.inkFg3 }}>
                {sub}
              </span>
            )}
          </span>

          <button
            type="button"
            onClick={openFilePicker}
            disabled={disabled || readOnly}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="flex-none"
            style={{
              height: spec.compactButton,
              padding: "0 12px",
              border: `1px solid ${isHover && !disabled && !readOnly ? C.dropBorderActive : C.outlineBorder}`,
              borderRadius: 8,
              background: isHover && !disabled && !readOnly ? C.outlineHoverBg : C.surface,
              color: disabled ? C.muted : C.deep,
              fontSize: spec.meta + 1,
              fontWeight: 600,
              lineHeight: 1,
              cursor: disabled || readOnly ? "not-allowed" : "pointer",
              transition: FILE_UPLOAD_TRANSITION,
              whiteSpace: "nowrap",
            }}
          >
            Choose file
          </button>
        </div>

        {rows.length > 0 && (
          <div className="flex flex-col" style={{ gap: 9 }}>
            {rows.map(renderRow)}
          </div>
        )}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: avatar variant — initials are the fallback, never a grey silhouette
  // ─────────────────────────────────────────────────────────────────────────────

  const renderAvatarVariant = () => {
    const item = displayItems[0];
    const previewUrl = item
      ? item.kind === "url"
        ? item.url
        : item.localFile.previewUrl
      : null;

    const avatarState = disabled ? "disabled" : previewUrl ? "filled" : "empty";
    const title =
      placeholder ?? (typeof label === "string" ? label : undefined) ?? PLACEHOLDER_TEXT.avatar;
    const fallbackInitials = initials ?? deriveInitials(typeof label === "string" ? label : placeholder);

    return (
      <div
        className="flex items-center w-full"
        style={{
          gap: 14,
          padding: spec.galleryPad + 2,
          border: `1px solid ${C.border}`,
          borderRadius: spec.compactRadius,
          background: disabled ? C.subtle : C.surface,
        }}
      >
        {/* Avatar disc + camera badge */}
        <div className="relative flex-shrink-0" style={{ width: spec.avatar, height: spec.avatar }}>
          <div
            {...(!previewUrl ? dropzoneInteractionProps : {})}
            className={avatarContainerVariants({ size, state: avatarState })}
            style={{
              width: spec.avatar,
              height: spec.avatar,
              background: previewUrl ? C.surface : C.deep,
              color: C.mint,
            }}
          >
            {previewUrl ? (
              <>
                <img src={previewUrl} alt="Avatar" className="w-full h-full object-cover" />
                {!disabled && !readOnly && (
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                    style={{ background: "rgba(0,0,0,.4)" }}
                    onClick={openFilePicker}
                    role="button"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    aria-label="Change photo"
                  >
                    <ImageIcon size={avatarIconSize} className="text-white" />
                  </div>
                )}
              </>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ fontSize: spec.avatarInitials, fontWeight: 700, lineHeight: 1 }}
              >
                {fallbackInitials ?? <Upload size={avatarIconSize} />}
              </div>
            )}
          </div>

          {!disabled && !readOnly && (
            <button
              type="button"
              onClick={openFilePicker}
              onKeyDown={handleKeyDown}
              className="absolute z-10 flex items-center justify-center rounded-full"
              style={{
                bottom: -2,
                right: -2,
                width: spec.avatarBadge,
                height: spec.avatarBadge,
                background: C.surface,
                border: `1px solid ${C.border}`,
                color: C.forest,
                boxShadow: "1px 1px 3px rgba(0,0,0,.12)",
              }}
              aria-label="Change photo"
            >
              {icon ?? <Camera size={Math.round(spec.avatarBadge * 0.46)} strokeWidth={2.2} />}
            </button>
          )}
        </div>

        {/* Aside */}
        <div className="flex-1 min-w-0 flex flex-col" style={{ gap: 5 }}>
          <span
            className="truncate"
            style={{ fontSize: spec.name, fontWeight: 600, lineHeight: 1.3, color: C.inkFg1 }}
          >
            {title}
          </span>
          {description && (
            <span style={{ fontSize: spec.meta, fontWeight: 400, lineHeight: 1.4, color: C.inkFg3 }}>
              {description}
            </span>
          )}
          {!disabled && !readOnly && (
            <span className="flex items-center" style={{ gap: 9, marginTop: 2 }}>
              <button
                type="button"
                onClick={openFilePicker}
                style={{
                  fontSize: spec.meta + 1,
                  fontWeight: 600,
                  lineHeight: 1,
                  color: C.forest,
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                }}
              >
                {previewUrl ? "Change" : "Upload"}
              </button>
              {clearable && previewUrl && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  style={{
                    fontSize: spec.meta + 1,
                    fontWeight: 600,
                    lineHeight: 1,
                    color: C.dangerBar,
                    background: "transparent",
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              )}
            </span>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: file variant — dropzone above, rows below
  // ─────────────────────────────────────────────────────────────────────────────

  const renderFileVariant = () => (
    <div className="flex flex-col w-full" style={{ gap: 10 }}>
      {showDropzone && (canAddMore || rows.length === 0) &&
        renderDropzone(
          <Upload size={iconSize} strokeWidth={2} />,
          placeholder ?? PLACEHOLDER_TEXT.file,
        )}

      {batchSummary && rows.length > 0 && renderBatchSummary()}

      {rows.length > 0 ? (
        <div className="flex flex-col" style={{ gap: 9 }}>
          {rows.map(renderRow)}
        </div>
      ) : (
        showEmptyListHint && renderEmptyListHint()
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: video variant
  // ─────────────────────────────────────────────────────────────────────────────

  const renderVideoVariant = () => {
    // ── Single video ───────────────────────────────────────────────────────────
    if (!multiple) {
      const item = displayItems[0];
      const previewUrl = item
        ? item.kind === "url"
          ? item.url
          : item.localFile.previewUrl
        : null;

      if (previewUrl) {
        return (
          <div
            {...filledDragProps}
            className="relative w-full overflow-hidden bg-black group"
            style={{
              borderRadius: spec.dropRadius,
              border: isDragOver ? `1.5px solid ${C.dropBorderActive}` : `1px solid ${C.border}`,
              height: size === "sm" ? 96 : size === "lg" ? 176 : 128,
              transition: FILE_UPLOAD_TRANSITION,
            }}
          >
            <video
              src={previewUrl}
              className="absolute inset-0 w-full h-full object-contain"
              controls
              preload="metadata"
            />
            {isDragOver && !disabled && !readOnly && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px] pointer-events-none z-10">
                <span style={{ fontSize: spec.name, fontWeight: 600 }} className="text-white">
                  Drop to replace
                </span>
              </div>
            )}
            {!disabled && !readOnly && (changeable || clearable) && (
              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-2.5 bg-gradient-to-b from-black/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                {changeable && (
                  <button
                    type="button"
                    onClick={openFilePicker}
                    onKeyDown={handleKeyDown}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 shadow"
                    style={{
                      background: "rgba(255,255,255,.95)",
                      color: C.deep,
                      fontSize: spec.meta + 1,
                      fontWeight: 600,
                    }}
                    aria-label="Change video"
                  >
                    <VideoIcon size={12} />
                    Change
                  </button>
                )}
                {clearable && (
                  <button
                    type="button"
                    onClick={(e) => item && handleRemoveItem(e, item)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 shadow"
                    style={{
                      background: C.dangerBar,
                      color: "#FFFFFF",
                      fontSize: spec.meta + 1,
                      fontWeight: 600,
                    }}
                    aria-label="Remove video"
                  >
                    <X size={12} />
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
        );
      }

      return renderDropzone(
        <VideoIcon size={iconSize} strokeWidth={2} />,
        placeholder ?? PLACEHOLDER_TEXT.video,
      );
    }

    // ── Multiple videos ────────────────────────────────────────────────────────
    if (displayItems.length === 0) {
      return renderDropzone(
        <VideoIcon size={iconSize} strokeWidth={2} />,
        placeholder ?? PLACEHOLDER_TEXT.video,
      );
    }

    return (
      <div
        {...filledDragProps}
        className="w-full"
        style={{
          borderRadius: spec.compactRadius,
          border: isDragOver ? `1.5px solid ${C.dropBorderActive}` : `1px solid ${C.border}`,
          padding: spec.galleryPad,
          transition: FILE_UPLOAD_TRANSITION,
        }}
      >
        <div className="flex flex-wrap" style={{ gap: spec.galleryGap }}>
          {displayItems.map((item) => {
            const url = item.kind === "url" ? item.url : item.localFile.previewUrl;
            return (
              <div
                key={item.kind === "url" ? `url-${item.index}` : item.localFile.id}
                className="relative group flex-shrink-0 overflow-hidden bg-black"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: spec.galleryTileRadius,
                  border: `1px solid ${C.border}`,
                }}
              >
                <video src={url} className="w-full h-full object-cover" muted preload="metadata" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,.5)" }}
                  >
                    <Play size={10} className="text-white ml-0.5" />
                  </div>
                </div>
                {!disabled && !readOnly && clearable && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveItem(e, item)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(0,0,0,.6)" }}
                    aria-label="Remove"
                  >
                    <X size={10} strokeWidth={3} className="text-white" />
                  </button>
                )}
              </div>
            );
          })}

          {canAddMore && (
            <button
              type="button"
              onClick={openFilePicker}
              className="flex flex-col items-center justify-center flex-shrink-0"
              style={{
                width: 80,
                height: 80,
                gap: 2,
                borderRadius: spec.galleryTileRadius,
                border: `1.5px dashed ${C.borderStrong}`,
                background: C.surface,
                color: C.inkFg3,
              }}
              aria-label="Add video"
            >
              <Plus size={15} strokeWidth={2.4} />
              <span style={{ fontSize: spec.chip + 1, fontWeight: 600 }}>Add</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  /** Compact and avatar carry their own label line inside the box. */
  const hideOuterLabel =
    (variant === "compact" || variant === "avatar") && !placeholder && typeof label === "string";

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {/* Field label */}
      {label && !hideOuterLabel && (
        <InputLabel
          htmlFor={inputId}
          required={required}
          size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
        >
          {label}
        </InputLabel>
      )}

      {/* Upload area */}
      {variant === "avatar"
        ? renderAvatarVariant()
        : variant === "compact"
        ? renderCompactVariant()
        : variant === "gallery"
        ? renderGalleryVariant()
        : variant === "image"
        ? renderImageVariant()
        : variant === "video"
        ? renderVideoVariant()
        : renderFileVariant()}

      {/* Hidden native file input — the dropzone is a real input behind a label,
          so keyboard and screen-reader users get the native picker. */}
      <input
        ref={attachInputRef}
        type="file"
        id={inputId}
        accept={effectiveAccept}
        multiple={multiple}
        disabled={disabled}
        name={name}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleInputChange}
      />

      {/* Helper / Error */}
      <InputHelper
        size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
        error={combinedError}
        helperText={combinedError ? undefined : helperText}
      />
    </div>
  );
}

FileUpload.displayName = "FileUpload";

export { FileUpload };
