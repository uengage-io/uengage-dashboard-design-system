"use client";

import * as React from "react";
import { Upload, X, ImageIcon, Plus, File as FileIcon, Video as VideoIcon, Play } from "lucide-react";
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
} from "./fileUploadVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FileUploadVariant = "image" | "file" | "avatar" | "video";
export type FileUploadSize = "sm" | "md" | "lg";

/** Internal representation of a locally-selected file with a preview URL. */
export interface FileUploadLocalFile {
  file: File;
  /** Object URL for image preview — created via URL.createObjectURL(). */
  previewUrl: string;
  /** Stable random ID for React key. */
  id: string;
}

export interface FileUploadProps {
  // ── Visual ──────────────────────────────────────────────────────────────────
  /** Controls layout and default accept type. Defaults to "file". */
  variant?: FileUploadVariant;
  /** Controls spacing and icon sizes. Defaults to "md". */
  size?: FileUploadSize;

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

  // ── Controlled value (server/existing URLs) ─────────────────────────────────
  /**
   * Controlled URL(s) for showing already-uploaded content.
   * - image / avatar: renders as <img> preview
   * - file: renders as filename chip(s)
   * Pass a string for single, string[] for multiple.
   */
  value?: string | string[];

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

  // ── Field decoration ────────────────────────────────────────────────────────
  label?: string;
  required?: boolean;
  /** Shown below the field in red. Also shown for internal validation errors. */
  error?: string;
  helperText?: string;
  /** Main line in the empty-state dropzone. Falls back to variant default. */
  placeholder?: string;
  /** Sub-line in the empty-state dropzone (e.g. "PNG, JPG up to 5 MB"). */
  description?: string;

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

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${units[i]}`;
}

function getDefaultAccept(variant: FileUploadVariant): string | undefined {
  if (variant === "image" || variant === "avatar") return "image/*";
  if (variant === "video") return "video/*";
  return undefined;
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Component ────────────────────────────────────────────────────────────────

function FileUpload({
  variant = "file",
  size = "md",
  accept,
  multiple = false,
  disabled = false,
  readOnly = false,
  name,
  id,
  maxSize,
  maxFiles,
  value,
  onChange,
  onFilesChange,
  onRemove,
  onRemoveFile,
  onValidationError,
  label,
  required = false,
  error,
  helperText,
  placeholder,
  description,
  dragAndDrop = true,
  showLocalPreview = true,
  clearable = true,
  changeable = true,
  icon,
  className,
  dropzoneClassName,
  inputRef: externalInputRef,
}: FileUploadProps) {
  const reactId = React.useId();
  const inputId = id ?? reactId;

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
  const [localFiles, setLocalFiles] = React.useState<FileUploadLocalFile[]>([]);
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);

  const isImageVariant = variant === "image" || variant === "avatar";
  const isPreviewVariant = isImageVariant || variant === "video";
  const effectiveAccept = accept ?? getDefaultAccept(variant);

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
    const items: DisplayItem[] = [];
    controlledUrls.forEach((url, i) => items.push({ kind: "url", url, index: i }));
    if (showLocalPreview) {
      localFiles.forEach((lf, i) =>
        items.push({ kind: "file", localFile: lf, index: controlledUrls.length + i }),
      );
    }
    return items;
  }, [controlledUrls, localFiles, showLocalPreview]);

  const hasContent = displayItems.length > 0;

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

    if (maxSize) {
      const oversized = incoming.filter((f) => f.size > maxSize);
      if (oversized.length > 0) {
        errors.push(
          `${oversized.map((f) => f.name).join(", ")} exceed${oversized.length === 1 ? "s" : ""} the ${formatBytes(maxSize)} size limit`,
        );
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
    [multiple, maxFiles, maxSize, displayItems.length, isImageVariant, showLocalPreview, onChange, onFilesChange, onValidationError],
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

  type DzState = "idle" | "dragover" | "error" | "disabled";
  const dzState: DzState = disabled
    ? "disabled"
    : isDragOver
    ? "dragover"
    : error || validationErrors.length > 0
    ? "error"
    : "idle";

  const combinedError = error ?? validationErrors[0];
  const iconSize = ICON_SIZES[size] ?? 18;
  const avatarIconSize = AVATAR_ICON_SIZES[size] ?? 20;

  const canAddMore =
    !disabled &&
    !readOnly &&
    (!maxFiles || displayItems.length < maxFiles);

  // ── Shared drag/click props for drop zones ─────────────────────────────────

  const dropzoneInteractionProps = {
    role: "button" as const,
    tabIndex: disabled ? -1 : 0,
    onClick: openFilePicker,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    onKeyDown: handleKeyDown,
    "aria-label": placeholder ?? PLACEHOLDER_TEXT[variant],
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: image / avatar variant
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
            className={cn(
              "relative w-full overflow-hidden rounded-xl border border-gray-200 group",
              size === "sm" && "h-24",
              size === "md" && "h-32",
              size === "lg" && "h-44",
            )}
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
            {icon && !disabled && !readOnly && (
              <button
                type="button"
                onClick={openFilePicker}
                onKeyDown={handleKeyDown}
                className="absolute bottom-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:text-[#007a4d] hover:border-[#007a4d] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d]"
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
                      className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800 shadow hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                      className="flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
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

      // Empty state
      return (
        <div
          {...dropzoneInteractionProps}
          className={cn(dropzoneVariants({ size, state: dzState }), dropzoneClassName)}
        >
          <div className={iconWrapperVariants({ size })}>
            <ImageIcon size={iconSize} className="text-gray-400" />
          </div>
          <div className="flex flex-col items-center gap-0.5 text-center">
            <span
              className={cn(
                "font-medium text-gray-600",
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                size === "lg" && "text-base",
              )}
            >
              {placeholder ?? PLACEHOLDER_TEXT.image}
            </span>
            {description && (
              <span
                className={cn(
                  "text-gray-400",
                  size === "sm" && "text-[10px]",
                  size === "md" && "text-xs",
                  size === "lg" && "text-sm",
                )}
              >
                {description}
              </span>
            )}
          </div>
          {dragAndDrop && (
            <span className="text-[10px] text-gray-300">Drag &amp; drop supported</span>
          )}
        </div>
      );
    }

    // ── Multiple images ────────────────────────────────────────────────────────

    // Empty state — dropzone already has fixed height via dropzoneVariants
    if (displayItems.length === 0) {
      return (
        <div
          {...dropzoneInteractionProps}
          className={cn(dropzoneVariants({ size, state: dzState }), "w-full", dropzoneClassName)}
        >
          <div className={iconWrapperVariants({ size })}>
            <ImageIcon size={iconSize} className="text-gray-400" />
          </div>
          <span
            className={cn(
              "font-medium text-gray-600",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
            )}
          >
            {placeholder ?? PLACEHOLDER_TEXT.image}
          </span>
          {description && (
            <span
              className={cn(
                "text-gray-400",
                size === "sm" && "text-[10px]",
                size === "md" && "text-xs",
                size === "lg" && "text-sm",
              )}
            >
              {description}
            </span>
          )}
        </div>
      );
    }

    // Filled state — fixed-height scrollable grid
    return (
      <div
        className={cn(
          "w-full overflow-y-auto rounded-xl border border-gray-200",
          size === "sm" && "h-24",
          size === "md" && "h-32",
          size === "lg" && "h-44",
        )}
      >
        <div className="flex flex-wrap gap-2 p-2">
          {displayItems.map((item) => {
            const url =
              item.kind === "url" ? item.url : item.localFile.previewUrl;
            return (
              <div
                key={item.kind === "url" ? `url-${item.index}` : item.localFile.id}
                className="relative group w-20 h-20 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0"
              >
                <img
                  src={url}
                  alt={`Image ${item.index + 1}`}
                  className="w-full h-full object-cover"
                />
                {!disabled && !readOnly && clearable && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveItem(e, item)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove"
                  >
                    <X size={10} className="text-white" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Add-more slot */}
          {canAddMore && (
            <button
              type="button"
              onClick={openFilePicker}
              className="rounded-xl border-2 border-dashed border-gray-300 w-20 h-20 flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:border-[#007a4d] hover:text-green-600 hover:bg-green-50/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d]"
              aria-label="Add image"
            >
              <Plus size={18} />
              <span className="text-[10px] font-medium">Add</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: avatar variant
  // ─────────────────────────────────────────────────────────────────────────────

  const renderAvatarVariant = () => {
    const item = displayItems[0];
    const previewUrl = item
      ? item.kind === "url"
        ? item.url
        : item.localFile.previewUrl
      : null;

    const avatarState = disabled ? "disabled" : previewUrl ? "filled" : "empty";

    return (
      <div className="flex items-center gap-4">
        {/* Avatar circle + optional icon badge */}
        <div className="relative flex-shrink-0">
          <div
            {...(!previewUrl ? dropzoneInteractionProps : {})}
            className={avatarContainerVariants({ size, state: avatarState })}
          >
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                {!disabled && !readOnly && (
                  <div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full"
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
              <div className="w-full h-full flex items-center justify-center">
                <Upload size={avatarIconSize} className="text-gray-400" />
              </div>
            )}
          </div>

          {/* Icon badge — bottom-right corner, outside overflow-hidden */}
          {icon && !disabled && !readOnly && (
            <button
              type="button"
              onClick={openFilePicker}
              onKeyDown={handleKeyDown}
              className="absolute bottom-0 right-0 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow border border-gray-100 text-gray-600 hover:text-[#007a4d] hover:border-[#007a4d] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d]"
              aria-label="Change photo"
            >
              {icon}
            </button>
          )}
        </div>

        {/* Aside text */}
        <div className="flex flex-col gap-1">
          {!disabled && !readOnly && (
            <button
              type="button"
              onClick={openFilePicker}
              className="text-sm font-medium text-[#007a4d] hover:underline text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d] rounded"
            >
              {previewUrl ? "Change photo" : (placeholder ?? "Upload photo")}
            </button>
          )}
          {description && (
            <p className="text-xs text-gray-400">{description}</p>
          )}
          {clearable && previewUrl && !disabled && !readOnly && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-red-400 hover:text-red-600 text-left"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: file variant
  // ─────────────────────────────────────────────────────────────────────────────

  const renderFileVariant = () => {
    // ── File list (has content) ────────────────────────────────────────────────
    if (hasContent) {
      return (
        <div
          className={cn(
            "w-full rounded-xl border border-gray-200 overflow-hidden flex flex-col",
            size === "sm" && "h-24",
            size === "md" && "h-32",
            size === "lg" && "h-44",
            disabled && "opacity-50",
          )}
        >
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 min-h-0">
            {displayItems.map((item) => {
              const name =
                item.kind === "file"
                  ? item.localFile.file.name
                  : item.url.split("/").pop() ?? item.url;
              const size_ =
                item.kind === "file" ? formatBytes(item.localFile.file.size) : null;

              return (
                <div
                  key={
                    item.kind === "url"
                      ? `url-${item.index}`
                      : item.localFile.id
                  }
                  className="flex items-center gap-3 px-3 py-2.5 bg-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <FileIcon size={15} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                    {size_ && (
                      <p className="text-xs text-gray-400">{size_}</p>
                    )}
                  </div>
                  {clearable && !disabled && !readOnly && (
                    <button
                      type="button"
                      onClick={(e) => handleRemoveItem(e, item)}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded flex-shrink-0"
                      aria-label={`Remove ${name}`}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add-more row — pinned to bottom */}
          {multiple && canAddMore && (
            <button
              type="button"
              onClick={openFilePicker}
              className="flex-shrink-0 w-full flex items-center gap-2 px-3 py-2.5 bg-gray-50 border-t border-gray-100 text-sm text-gray-500 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#007a4d]"
            >
              <Plus size={14} />
              Add more files
            </button>
          )}
        </div>
      );
    }

    // ── Empty dropzone ─────────────────────────────────────────────────────────
    return (
      <div
        {...dropzoneInteractionProps}
        className={cn(dropzoneVariants({ size, state: dzState }), dropzoneClassName)}
      >
        <div className={iconWrapperVariants({ size })}>
          <Upload size={iconSize} className="text-gray-400" />
        </div>
        <div className="flex flex-col items-center gap-0.5 text-center">
          <span
            className={cn(
              "font-medium text-gray-600",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
            )}
          >
            {placeholder ?? PLACEHOLDER_TEXT.file}
          </span>
          {description && (
            <span
              className={cn(
                "text-gray-400",
                size === "sm" && "text-[10px]",
                size === "md" && "text-xs",
                size === "lg" && "text-sm",
              )}
            >
              {description}
            </span>
          )}
        </div>
        {dragAndDrop && (
          <span className="text-[10px] text-gray-300">Drag &amp; drop supported</span>
        )}
      </div>
    );
  };

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
            className={cn(
              "relative w-full overflow-hidden rounded-xl border border-gray-200 bg-black group",
              size === "sm" && "h-24",
              size === "md" && "h-32",
              size === "lg" && "h-44",
            )}
          >
            <video
              src={previewUrl}
              className="absolute inset-0 w-full h-full object-contain"
              controls
              preload="metadata"
            />
            {!disabled && !readOnly && (changeable || clearable) && (
              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-2.5 bg-gradient-to-b from-black/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                {changeable && (
                  <button
                    type="button"
                    onClick={openFilePicker}
                    onKeyDown={handleKeyDown}
                    className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800 shadow hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                    className="flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
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

      // Empty state
      return (
        <div
          {...dropzoneInteractionProps}
          className={cn(dropzoneVariants({ size, state: dzState }), dropzoneClassName)}
        >
          <div className={iconWrapperVariants({ size })}>
            <VideoIcon size={iconSize} className="text-gray-400" />
          </div>
          <div className="flex flex-col items-center gap-0.5 text-center">
            <span
              className={cn(
                "font-medium text-gray-600",
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                size === "lg" && "text-base",
              )}
            >
              {placeholder ?? PLACEHOLDER_TEXT.video}
            </span>
            {description && (
              <span
                className={cn(
                  "text-gray-400",
                  size === "sm" && "text-[10px]",
                  size === "md" && "text-xs",
                  size === "lg" && "text-sm",
                )}
              >
                {description}
              </span>
            )}
          </div>
          {dragAndDrop && (
            <span className="text-[10px] text-gray-300">Drag &amp; drop supported</span>
          )}
        </div>
      );
    }

    // ── Multiple videos ────────────────────────────────────────────────────────

    // Empty state — dropzone already has fixed height via dropzoneVariants
    if (displayItems.length === 0) {
      return (
        <div
          {...dropzoneInteractionProps}
          className={cn(dropzoneVariants({ size, state: dzState }), "w-full", dropzoneClassName)}
        >
          <div className={iconWrapperVariants({ size })}>
            <VideoIcon size={iconSize} className="text-gray-400" />
          </div>
          <span
            className={cn(
              "font-medium text-gray-600",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
            )}
          >
            {placeholder ?? PLACEHOLDER_TEXT.video}
          </span>
          {description && (
            <span
              className={cn(
                "text-gray-400",
                size === "sm" && "text-[10px]",
                size === "md" && "text-xs",
                size === "lg" && "text-sm",
              )}
            >
              {description}
            </span>
          )}
        </div>
      );
    }

    // Filled state — fixed-height scrollable grid
    return (
      <div
        className={cn(
          "w-full overflow-y-auto rounded-xl border border-gray-200",
          size === "sm" && "h-24",
          size === "md" && "h-32",
          size === "lg" && "h-44",
        )}
      >
        <div className="flex flex-wrap gap-2 p-2">
          {displayItems.map((item) => {
            const url = item.kind === "url" ? item.url : item.localFile.previewUrl;
            return (
              <div
                key={item.kind === "url" ? `url-${item.index}` : item.localFile.id}
                className="relative group w-20 h-20 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 bg-black"
              >
                <video
                  src={url}
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                    <Play size={10} className="text-white ml-0.5" />
                  </div>
                </div>
                {!disabled && !readOnly && clearable && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveItem(e, item)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove"
                  >
                    <X size={10} className="text-white" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Add-more slot */}
          {canAddMore && (
            <button
              type="button"
              onClick={openFilePicker}
              className="rounded-xl border-2 border-dashed border-gray-300 w-20 h-20 flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:border-[#007a4d] hover:text-green-600 hover:bg-green-50/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d]"
              aria-label="Add video"
            >
              <Plus size={18} />
              <span className="text-[10px] font-medium">Add</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {/* Field label */}
      {label && (
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
        : variant === "image"
        ? renderImageVariant()
        : variant === "video"
        ? renderVideoVariant()
        : renderFileVariant()}

      {/* Hidden native file input — shadcn ui/input base */}
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
