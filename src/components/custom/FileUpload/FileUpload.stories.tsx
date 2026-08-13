import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Camera, Pencil, Store } from "lucide-react";
import { FileUpload, type FileUploadItem } from "./FileUpload";

// ─── Stable placeholder assets ────────────────────────────────────────────────

const BANNER_URL  = "https://picsum.photos/seed/uengage-banner/800/300";
const AVATAR_URL  = "https://picsum.photos/seed/uengage-avatar/200/200";
const THUMB_URLS  = [
  "https://picsum.photos/seed/thumb-a/200/200",
  "https://picsum.photos/seed/thumb-b/200/200",
  "https://picsum.photos/seed/thumb-c/200/200",
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A file upload field built on a real `<input type=\"file\">` behind a label, so keyboard and screen-reader users get the native picker — drag-and-drop is an enhancement on top, never the only way in.\n\nSix shapes (`file` dropzone, `image`, `video`, `compact`, `avatar`, `gallery`) across three sizes, and eleven row states covering the whole lifecycle: idle, queued, uploading, processing, done, failed, rejected, partial, paused, duplicate and wrong-dimension. Every dropzone states its accepted formats and size cap before anything is selected; every error attaches to the file row and names the rule that was broken; retry is per file, so one failure never restarts the batch.\n\nSee the **Design ·** stories for the full state gallery.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["file", "image", "video", "compact", "avatar", "gallery"],
      description: "Controls the visual layout and the default `accept` type.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Adjusts dropzone height, icon size, and text scale.",
    },
    accept: {
      control: "text",
      description: "Forwarded directly to `<input accept>`. Overrides the variant default.",
    },
    multiple: {
      control: "boolean",
      description: "Allow selecting more than one file at a time.",
    },
    disabled: { control: "boolean" },
    readOnly: {
      control: "boolean",
      description: "Shows existing content but prevents picking new files.",
    },
    maxSize: {
      control: "number",
      description: "Per-file size ceiling in bytes. Files over this limit are rejected.",
    },
    maxFiles: {
      control: "number",
      description: "Maximum files allowed (multiple mode). The Add button disappears when the limit is reached.",
    },
    allowedFiles: {
      control: "object",
      description:
        "Array of allowed file extensions (with or without a leading dot). Files with any other extension are rejected with an inline error message. Also sets the native `accept` attribute — overridden by the explicit `accept` prop.",
    },
    value: {
      control: "text",
      description: "Controlled URL(s) for showing already-uploaded content. Pass a string for single, string[] for multiple.",
    },
    label: { control: "text" },
    required: { control: "boolean" },
    error: { control: "text" },
    helperText: { control: "text" },
    placeholder: {
      control: "text",
      description: "Main line in the empty-state dropzone.",
    },
    description: {
      control: "text",
      description: "Sub-line in the empty-state dropzone (e.g. accepted formats).",
    },
    dragAndDrop: {
      control: "boolean",
      description: "Enable/disable drag-and-drop. Shows a hint label when enabled.",
    },
    showLocalPreview: {
      control: "boolean",
      description: "Auto-generate a local object-URL preview from the selected File before upload completes.",
    },
    clearable: {
      control: "boolean",
      description: "Show the × remove button on filled states.",
    },
    changeable: {
      control: "boolean",
      description:
        'Show the "Change" button in the image hover overlay. Defaults to true. Set to false to make the preview display-only. When both changeable and clearable are false the overlay is hidden entirely.',
    },
    icon: {
      control: false,
      description:
        "Icon element rendered as a small badge in the bottom-right corner of the image or avatar preview. Accepts any ReactNode (e.g. a Lucide icon). Not shown on empty-state dropzones or the file variant.",
    },
    tone: {
      control: "radio",
      options: ["light", "dark"],
      description: "Surface the control sits on. `dark` restyles the dropzone for a dark panel.",
    },
    formats: {
      control: "object",
      description:
        "Constraint chips shown inside the dropzone before anything is picked. Auto-derived from `allowedFiles` + `maxSize` when omitted; pass `[]` to hide.",
    },
    items: {
      control: false,
      description:
        "Fully-controlled file rows with their own lifecycle `status` and `progress`. Renders the nine upload states instead of deriving idle/done from `value`.",
    },
    showStatusBadge: {
      control: "boolean",
      description:
        "Render the right-hand status pill on each row. With it off, done rows fall back to the check disc and in-flight rows to a bare percentage.",
    },
    showDropzone: {
      control: "boolean",
      description: "Render the dropzone above the row list. Turn off to show rows on their own.",
    },
    showEmptyListHint: {
      control: "boolean",
      description: 'Render the "Nothing uploaded yet" placeholder when the row list is empty.',
    },
    batchSummary: {
      control: "boolean",
      description: "Render the batch summary bar above the rows. It never blocks the page.",
    },
    batchCaption: { control: "text" },
    browseHint: { control: "text" },
    initials: {
      control: "text",
      description: "Initials fallback for the avatar — never a grey silhouette icon.",
    },
    galleryColumns: { control: "number" },
    coverBadge: {
      control: "boolean",
      description: "Mark the first gallery tile as the cover.",
    },
    onChange:          { action: "onChange" },
    onFilesChange:     { action: "onFilesChange" },
    onRemove:          { action: "onRemove" },
    onRemoveFile:      { action: "onRemoveFile" },
    onValidationError: { action: "onValidationError" },
    onRetry:           { action: "onRetry" },
    onRetryAll:        { action: "onRetryAll" },
    onSkip:            { action: "onSkip" },
    onReplace:         { action: "onReplace" },
    onCrop:            { action: "onCrop" },
  },
  args: {
    variant:          "file",
    size:             "md",
    tone:             "light",
    disabled:         false,
    required:         false,
    readOnly:         false,
    multiple:         false,
    dragAndDrop:      true,
    showLocalPreview: true,
    clearable:        true,
    changeable:       true,
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ──────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

/* ── Variants ─────────────────────────────────────────────────────────────── */

export const ImageVariant: Story = {
  name: "Variant · Image",
  args: {
    variant:     "image",
    label:       "Widget Banner",
    description: "PNG, JPG, WebP up to 5 MB",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const FileVariant: Story = {
  name: "Variant · File",
  args: {
    variant:     "file",
    label:       "Attachment",
    accept:      ".pdf,.xlsx,.csv",
    description: "PDF, XLSX, CSV",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const AvatarVariant: Story = {
  name: "Variant · Avatar",
  args: {
    variant:     "avatar",
    label:       "Profile Photo",
    description: "Square image recommended",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const VideoVariant: Story = {
  name: "Variant · Video",
  args: {
    variant:     "video",
    label:       "Product Video",
    description: "MP4, WebM up to 50 MB",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const VideoWithValue: Story = {
  name: "Video · With value",
  parameters: {
    docs: {
      description: {
        story:
          "Pass a URL via `value` to display an already-uploaded video. Hover over the player to reveal the **Change** / **Remove** overlay.",
      },
    },
  },
  args: {
    variant: "video",
    label:   "Product Video",
    value:   "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const MultipleVideos: Story = {
  name: "Video · Multiple",
  args: {
    variant:     "video",
    label:       "Video Gallery",
    multiple:    true,
    maxFiles:    4,
    description: "MP4, WebM — up to 4 videos",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

/* ── Sizes ────────────────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-96">
      <FileUpload variant="image" size="sm" label="Small"  description="PNG, JPG up to 2 MB" />
      <FileUpload variant="image" size="md" label="Medium" description="PNG, JPG up to 2 MB" />
      <FileUpload variant="image" size="lg" label="Large"  description="PNG, JPG up to 2 MB" />
    </div>
  ),
};

export const AvatarSizes: Story = {
  name: "Sizes · Avatar",
  render: () => (
    <div className="flex flex-col gap-8 w-96">
      <FileUpload variant="avatar" size="sm" label="Small"  description="Recommended: 100×100" />
      <FileUpload variant="avatar" size="md" label="Medium" description="Recommended: 200×200" />
      <FileUpload variant="avatar" size="lg" label="Large"  description="Recommended: 400×400" />
    </div>
  ),
};

/* ── Controlled value (existing URL preview) ──────────────────────────────── */

export const ImageWithValue: Story = {
  name: "Image · With value",
  parameters: {
    docs: {
      description: {
        story:
          "Pass a URL via `value` to display an already-uploaded image. Hover over the preview to reveal the **Change photo** overlay. The × button calls `onRemove`.",
      },
    },
  },
  args: {
    variant: "image",
    label:   "Widget Banner",
    value:   BANNER_URL,
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const AvatarWithValue: Story = {
  name: "Avatar · With value",
  args: {
    variant:     "avatar",
    label:       "Profile Photo",
    description: "Hover to see the change overlay",
    value:       AVATAR_URL,
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

/* ── Multiple ─────────────────────────────────────────────────────────────── */

export const MultipleImages: Story = {
  name: "Image · Multiple (empty)",
  args: {
    variant:     "image",
    label:       "Banner Gallery",
    multiple:    true,
    maxFiles:    6,
    description: "Up to 6 images",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const MultipleImagesWithValues: Story = {
  name: "Image · Multiple with values",
  parameters: {
    docs: {
      description: {
        story:
          "Render a thumbnail grid from a `string[]` of URLs. The + Add slot appears until `maxFiles` is reached. Each thumbnail has a hover × button wired to `onRemoveFile(index)`.",
      },
    },
  },
  args: {
    variant:  "image",
    label:    "Banner Gallery",
    multiple: true,
    maxFiles: 6,
    value:    THUMB_URLS,
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const MultipleFiles: Story = {
  name: "File · Multiple",
  args: {
    variant:     "file",
    label:       "Documents",
    multiple:    true,
    maxFiles:    5,
    accept:      ".pdf,.xlsx,.csv",
    description: "PDF, XLSX, CSV — up to 5 files",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

/* ── Field decoration ─────────────────────────────────────────────────────── */

export const WithLabel: Story = {
  args: {
    variant:     "file",
    label:       "Attachment",
    placeholder: "Click or drag to upload",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const Required: Story = {
  args: {
    variant:     "image",
    label:       "Widget Banner",
    required:    true,
    description: "Required to make this widget visible",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    variant:     "file",
    label:       "Lottie Animation",
    accept:      ".json",
    placeholder: "Choose a Lottie file",
    helperText:  "Only .json Lottie files are accepted.",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    variant:  "image",
    label:    "Widget Banner",
    required: true,
    error:    "A banner image is required.",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const CustomPlaceholder: Story = {
  name: "Custom placeholder & description",
  args: {
    variant:     "file",
    label:       "Import data",
    placeholder: "Drop your CSV here",
    description: "Must have headers: name, email, phone",
    accept:      ".csv",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

/* ── Constraints ──────────────────────────────────────────────────────────── */

export const MaxSize: Story = {
  name: "Constraint · Max size (2 MB)",
  parameters: {
    docs: {
      description: {
        story:
          "Files over `maxSize` are rejected before `onChange` fires. The offending filenames appear in an error message via `InputHelper` and are also passed to `onValidationError`.",
      },
    },
  },
  args: {
    variant:     "image",
    label:       "Widget Banner",
    maxSize:     2 * 1024 * 1024,
    description: "Max 2 MB — try uploading a large file to see the error",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const MaxFiles: Story = {
  name: "Constraint · Max files (3)",
  parameters: {
    docs: {
      description: {
        story:
          "The **+ Add** slot disappears once `maxFiles` is reached. Additional files selected in the same batch are silently capped.",
      },
    },
  },
  args: {
    variant:     "image",
    label:       "Banner Gallery",
    multiple:    true,
    maxFiles:    3,
    value:       THUMB_URLS,
    description: "3 / 3 images — Add button is hidden",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const AllowedFilesImages: Story = {
  name: "Constraint · allowedFiles (images only)",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `allowedFiles={['jpg', 'jpeg', 'png', 'webp']}` to restrict accepted extensions. The native file picker already filters by these extensions. If a file with a disallowed extension is dropped or selected, it is rejected and an error message appears inline.",
      },
    },
  },
  args: {
    variant:      "image",
    label:        "Product Image",
    allowedFiles: ["jpg", "jpeg", "png", "webp"],
    description:  "JPG, JPEG, PNG, WebP only — try dropping a .gif or .pdf to see the error",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const AllowedFilesDocuments: Story = {
  name: "Constraint · allowedFiles (documents)",
  parameters: {
    docs: {
      description: {
        story:
          "Restricts uploads to PDF, XLSX, and CSV. Extensions can be passed with or without a leading dot — both `'pdf'` and `'.pdf'` are accepted.",
      },
    },
  },
  args: {
    variant:      "file",
    label:        "Import Document",
    allowedFiles: [".pdf", ".xlsx", ".csv"],
    description:  "PDF, XLSX, CSV only",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const AllowedFilesWithCallback: Story = {
  name: "Constraint · allowedFiles + onValidationError",
  parameters: {
    docs: {
      description: {
        story:
          "Combine `allowedFiles` with `onValidationError` to capture the rejection reason in parent state. Try dropping any non-JSON file to trigger the error.",
      },
    },
  },
  render: function AllowedFilesCallbackStory() {
    const [error, setError] = React.useState<string>("");
    return (
      <div className="flex flex-col gap-3 w-96">
        <FileUpload
          variant="file"
          label="Lottie Animation"
          allowedFiles={["json"]}
          placeholder="Drop a .json Lottie file"
          description=".json files only"
          error={error || undefined}
          onValidationError={(errs) => setError(errs[0])}
          onChange={() => setError("")}
        />
        <code className="text-xs text-[#6B7280]">
          onValidationError: {error || "—"}
        </code>
      </div>
    );
  },
};

/* ── States ───────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    variant:     "image",
    label:       "Widget Banner",
    disabled:    true,
    description: "PNG, JPG up to 5 MB",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const DisabledWithValue: Story = {
  name: "Disabled · With value",
  args: {
    variant:  "image",
    label:    "Widget Banner",
    disabled: true,
    value:    BANNER_URL,
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const ReadOnly: Story = {
  name: "Read only",
  parameters: {
    docs: {
      description: {
        story:
          "Shows existing content at full opacity but prevents picking new files. Unlike `disabled`, there is no dimming — it looks live, just non-interactive.",
      },
    },
  },
  args: {
    variant:    "image",
    label:      "Widget Banner",
    readOnly:   true,
    value:      BANNER_URL,
    helperText: "This field is read-only.",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const NoClearButton: Story = {
  name: "Clearable · false",
  args: {
    variant:    "image",
    label:      "Permanent Banner",
    clearable:  false,
    value:      BANNER_URL,
    helperText: "The × remove button is hidden via `clearable={false}`.",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const NoChangeButton: Story = {
  name: "Changeable · false",
  parameters: {
    docs: {
      description: {
        story:
          "Set `changeable={false}` to hide the Change button from the hover overlay. The Remove button (controlled by `clearable`) is unaffected. When both are false the overlay disappears entirely.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <FileUpload
        variant="image"
        label="changeable={false} — remove only"
        value={BANNER_URL}
        changeable={false}
        helperText="Hover to see only the Remove button."
      />
      <FileUpload
        variant="image"
        label="changeable={false} clearable={false} — no overlay"
        value={BANNER_URL}
        changeable={false}
        clearable={false}
        helperText="Overlay is fully hidden — display-only preview."
      />
    </div>
  ),
};

export const NoDragAndDrop: Story = {
  name: "Drag & drop · disabled",
  args: {
    variant:     "file",
    label:       "Attachment",
    dragAndDrop: false,
    helperText:  "Drop events are ignored. The hint label is also hidden.",
  },
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

/* ── Controlled stories ───────────────────────────────────────────────────── */

export const ControlledImage: Story = {
  name: "Controlled · Image",
  parameters: {
    docs: {
      description: {
        story:
          "Full controlled round-trip: `onChange` fires with the raw `File`, the parent creates a local `URL.createObjectURL` preview and passes it back via `value`. In production, you would replace the object URL with the server-returned URL once the upload finishes.",
      },
    },
  },
  render: function ControlledImageStory() {
    const [previewUrl, setPreviewUrl] = React.useState<string>("");

    const handleChange = (files: File[]) => {
      // Simulate immediate preview — in production swap for the server URL on success.
      const objectUrl = URL.createObjectURL(files[0]);
      setPreviewUrl(objectUrl);
    };

    const handleRemove = () => setPreviewUrl("");

    return (
      <div className="flex flex-col gap-3 w-96">
        <FileUpload
          variant="image"
          label="Widget Banner"
          description="PNG, JPG up to 5 MB"
          value={previewUrl}
          onChange={handleChange}
          onRemove={handleRemove}
          showLocalPreview={false}
          helperText="Select a file — preview is driven by the parent via value."
        />
        <code className="text-xs text-[#6B7280]">
          value: {previewUrl ? `"${previewUrl.slice(0, 42)}…"` : '""'}
        </code>
      </div>
    );
  },
};

export const ControlledAvatar: Story = {
  name: "Controlled · Avatar",
  render: function ControlledAvatarStory() {
    const [url, setUrl] = React.useState(AVATAR_URL);

    const handleChange = (files: File[]) => {
      // Revoke previous object URL to avoid memory leaks.
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      setUrl(URL.createObjectURL(files[0]));
    };

    return (
      <div className="flex flex-col gap-3 w-96">
        <FileUpload
          variant="avatar"
          size="lg"
          label="Profile Photo"
          description="Square, min 200×200 px"
          value={url}
          onChange={handleChange}
          onRemove={() => setUrl("")}
          showLocalPreview={false}
        />
        <code className="text-xs text-[#6B7280]">
          value: {url ? `"${url.slice(0, 42)}…"` : '""'}
        </code>
      </div>
    );
  },
};

export const ControlledFileList: Story = {
  name: "Controlled · File list",
  parameters: {
    docs: {
      description: {
        story:
          "The component operates in uncontrolled mode here — internal state drives the file chips. `onChange` fires with every batch of valid `File` objects and the results are mirrored below, showing how a parent can observe selections without owning the list.",
      },
    },
  },
  render: function ControlledFileListStory() {
    const [selected, setSelected] = React.useState<File[]>([]);

    return (
      <div className="flex flex-col gap-3 w-96">
        <FileUpload
          variant="file"
          label="Documents"
          multiple
          maxFiles={5}
          maxSize={10 * 1024 * 1024}
          accept=".pdf,.xlsx,.csv"
          description="PDF, XLSX, CSV — max 5 files, 10 MB each"
          onChange={(files) => setSelected((prev) => [...prev, ...files])}
        />
        <div className="flex flex-col gap-1">
          {selected.length === 0 ? (
            <code className="text-xs text-[#6B7280]">No files selected yet</code>
          ) : (
            selected.map((f, i) => (
              <code key={i} className="text-xs text-[#6B7280]">
                [{i}] {f.name} — {(f.size / 1024).toFixed(1)} KB
              </code>
            ))
          )}
        </div>
      </div>
    );
  },
};

export const ValidationErrors: Story = {
  name: "Validation · Error callbacks",
  parameters: {
    docs: {
      description: {
        story:
          "Pick a file over 100 KB to trigger the `maxSize` validation. The error appears inline via `InputHelper` and `onValidationError` is called with the error strings (visible in the **Actions** panel).",
      },
    },
  },
  render: function ValidationStory() {
    const [error, setError] = React.useState<string>("");

    return (
      <div className="flex flex-col gap-3 w-96">
        <FileUpload
          variant="file"
          label="Small files only"
          maxSize={100 * 1024}
          description="Max 100 KB per file"
          error={error || undefined}
          onValidationError={(errors) => setError(errors[0])}
          onChange={() => setError("")}
        />
        <code className="text-xs text-[#6B7280]">
          onValidationError: {error ? `"${error}"` : "—"}
        </code>
      </div>
    );
  },
};

/* ── Overview ─────────────────────────────────────────────────────────────── */

export const AllVariantsOverview: Story = {
  name: "Overview · All variants",
  render: () => (
    <div className="flex flex-col gap-10 w-96">
      <FileUpload
        variant="image"
        label="Image — empty"
        description="PNG, JPG, WebP up to 5 MB"
      />
      <FileUpload
        variant="image"
        label="Image — with preview"
        value={BANNER_URL}
        description="Hover to see the Change overlay"
      />
      <FileUpload
        variant="file"
        label="File — empty"
        description="Any file type"
      />
      <FileUpload
        variant="avatar"
        label="Avatar — empty"
        size="md"
        description="Square image recommended"
      />
      <FileUpload
        variant="avatar"
        label="Avatar — with photo"
        value={AVATAR_URL}
        size="md"
      />
      <FileUpload
        variant="video"
        label="Video — empty"
        description="MP4, WebM up to 50 MB"
      />
    </div>
  ),
};

/* ── Icon badge ────────────────────────────────────────────────────────────── */

export const IconBadge: Story = {
  name: "Icon badge",
  parameters: {
    docs: {
      description: {
        story:
          "Pass any ReactNode via `icon` to render a small badge in the bottom-right corner of the image or avatar preview. Works on both the `image` and `avatar` variants. Not shown on empty-state dropzones or the `file` variant.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <FileUpload
        variant="avatar"
        size="lg"
        label="Avatar — camera badge"
        value={AVATAR_URL}
        icon={<Camera size={13} />}
        description="Bottom-right corner"
      />
      <FileUpload
        variant="image"
        label="Image — pencil badge"
        value={BANNER_URL}
        icon={<Pencil size={12} />}
        description="Hover to see Change / Remove overlay"
      />
      <FileUpload
        variant="image"
        label="Image — brand badge"
        value={BANNER_URL}
        icon={<Store size={12} />}
      />
    </div>
  ),
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 * Design Console â€” `File and Color Pickers.dc.html`
 *
 * Everything below mirrors the upload half of that page: the dropzone, the nine
 * (plus several edge-case) row states, the four upload shapes and the dark
 * surface. The colour picker on that page is deliberately out of scope here.
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/** Section heading used by the showcase stories â€” the design's rule + caps label. */
function StateLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center" style={{ gap: 7 }}>
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          lineHeight: 1.3,
          letterSpacing: ".09em",
          textTransform: "uppercase",
          color: "#787878",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
      <span style={{ height: 1, flex: 1, background: "#EEEEEE" }} />
    </span>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 400, lineHeight: 1.5, color: "#787878" }}>
      {children}
    </span>
  );
}

/* â”€â”€ Dropzone â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const DropzoneAnatomy: Story = {
  name: "Design Â· Dropzone",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "1.5px dashed `#C4DCB6` on a mint fill, radius 12. Every dropzone states its accepted formats and size cap **before** anything is selected â€” rejecting a 12 MB TIFF after a 40-second upload is a design failure, not a validation success. Hover tints the fill and darkens the rule; drag-over turns the rule solid forest and adds the lime halo.",
      },
    },
  },
  render: () => (
    <div className="grid gap-5 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
      <div className="flex flex-col gap-2">
        <StateLabel>Idle â€” hover me</StateLabel>
        <FileUpload
          variant="file"
          placeholder="Drop menu files here"
          allowedFiles={["csv", "xlsx"]}
          maxSize={5 * 1024 * 1024}
        />
        <Caption>Hover lifts the fill one step and darkens the rule; the dash stays.</Caption>
      </div>

      <div className="flex flex-col gap-2">
        <StateLabel>Error</StateLabel>
        <FileUpload
          variant="file"
          placeholder="Drop menu files here"
          allowedFiles={["csv", "xlsx"]}
          maxSize={5 * 1024 * 1024}
          error="Only CSV and XLSX are accepted."
        />
        <Caption>The dropzone tints red, but a per-file reason always attaches to the row.</Caption>
      </div>

      <div className="flex flex-col gap-2">
        <StateLabel>Disabled</StateLabel>
        <FileUpload
          variant="file"
          placeholder="Drop menu files here"
          allowedFiles={["csv", "xlsx"]}
          maxSize={5 * 1024 * 1024}
          disabled
        />
        <Caption>Fill drops to the subtle neutral; the rule loses its mint.</Caption>
      </div>

      <div className="flex flex-col gap-2">
        <StateLabel>No constraint chips</StateLabel>
        <FileUpload variant="file" placeholder="Drop files here" formats={[]} />
        <Caption>Hide the chips only when the field truly accepts anything.</Caption>
      </div>
    </div>
  ),
};

export const DropzoneSizes: Story = {
  name: "Design Â· Dropzone sizes",
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid gap-5 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} className="flex flex-col gap-2">
          <StateLabel>{s}</StateLabel>
          <FileUpload
            size={s}
            variant="file"
            placeholder="Drop menu files here"
            allowedFiles={["csv", "xlsx"]}
            maxSize={5 * 1024 * 1024}
          />
        </div>
      ))}
    </div>
  ),
};

export const DarkSurface: Story = {
  name: "Design Â· Dark surface",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "On a dark panel the dashed rule goes `#2C4A38`, the fill `#141C17`, and the icon tile takes the lime accent.",
      },
    },
  },
  render: () => (
    <div style={{ background: "#0C1712", borderRadius: 12, padding: 14, maxWidth: 360 }}>
      <FileUpload
        tone="dark"
        variant="file"
        placeholder="Drop files here"
        allowedFiles={["csv"]}
        maxSize={5 * 1024 * 1024}
      />
    </div>
  ),
};

/* â”€â”€ The nine upload states â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const STATE_ROWS: { label: string; item: FileUploadItem; caption: string }[] = [
  {
    label: "Idle",
    caption: "Picked, nothing has happened to it yet.",
    item: { id: "s1", name: "menu-march.csv", size: "1.2 MB", status: "idle", note: "Ready to upload Â· 1.2 MB" },
  },
  {
    label: "Queued",
    caption: "Accepted, but waiting behind other files.",
    item: { id: "s2", name: "menu-april.csv", size: "1.1 MB", status: "queued", note: "Waiting â€” 2 files ahead" },
  },
  {
    label: "Uploading",
    caption: "Determinate bar, always paired with a percentage.",
    item: { id: "s3", name: "menu-march.csv", size: "1.2 MB", status: "uploading", progress: 68, note: "820 KB of 1.2 MB" },
  },
  {
    label: "Processing",
    caption: "Bytes have landed; the server is still validating.",
    item: { id: "s4", name: "menu-march.csv", size: "1.2 MB", status: "processing", progress: 100, note: "Validating 412 rowsâ€¦" },
  },
  {
    label: "Success",
    caption: "Say what landed, not just that it worked.",
    item: { id: "s5", name: "menu-march.csv", size: "1.2 MB", status: "done", note: "412 items imported" },
  },
  {
    label: "Too large",
    caption: "Names the file, the actual size and the limit.",
    item: { id: "s6", name: "fssai-licence.pdf", size: "7.2 MB", status: "rejected", note: "7.2 MB â€” the cap is 5 MB" },
  },
  {
    label: "Wrong type",
    caption: "Lists what would have been accepted.",
    item: { id: "s7", name: "storefront.tiff", ext: "TIF", status: "rejected", note: "Only CSV, XLSX, JPG and PNG are accepted" },
  },
  {
    label: "Upload failed",
    caption: "Retryable, and the retry is per file.",
    item: { id: "s8", name: "menu-april.csv", size: "1.1 MB", status: "failed", progress: 46, note: "Connection dropped at 46%" },
  },
  {
    label: "Partial import",
    caption: "Landed, but only some of it was usable.",
    item: { id: "s9", name: "menu-march.csv", size: "1.2 MB", status: "partial", note: "398 imported Â· 14 rows skipped" },
  },
];

export const UploadStates: Story = {
  name: "Design Â· Upload states (9)",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "The nine states covering the file row. Each error names the rule that was broken â€” which file, why, and whether it can be retried. Errors attach to the row, never to the dropzone.",
      },
    },
  },
  render: () => (
    <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
      {STATE_ROWS.map(({ label, item, caption }) => (
        <div key={label} className="flex flex-col gap-2">
          <StateLabel>{label}</StateLabel>
          <FileUpload variant="file" showDropzone={false} clearable={false} items={[item]} />
          <Caption>{caption}</Caption>
        </div>
      ))}
    </div>
  ),
};

export const EdgeCaseStates: Story = {
  name: "Design Â· Edge-case states",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Where uploads go wrong in production. A wrong-dimension image is never rejected outright â€” the crop tool is offered instead. A duplicate is skipped or replaced, never silently renamed. Going offline pauses and resumes from where it stopped rather than restarting the file.",
      },
    },
  },
  render: () => (
    <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))" }}>
      <div className="flex flex-col gap-2">
        <StateLabel>Wrong dimensions â€” offer a crop</StateLabel>
        <FileUpload
          variant="file"
          showDropzone={false}
          clearable={false}
          onCrop={() => {}}
          items={[{ id: "e1", name: "storefront-hero.png", status: "dimension", note: "1200Ã—400 â€” needs 1200Ã—630" }]}
        />
        <Caption>Never reject an image outright for its aspect ratio.</Caption>
      </div>

      <div className="flex flex-col gap-2">
        <StateLabel>Duplicate file</StateLabel>
        <FileUpload
          variant="file"
          showDropzone={false}
          clearable={false}
          onSkip={() => {}}
          onReplace={() => {}}
          items={[{ id: "e2", name: "menu-march.csv", status: "duplicate", note: "Already uploaded 2 hours ago" }]}
        />
        <Caption>Skip or replace â€” never silently create a second copy.</Caption>
      </div>

      <div className="flex flex-col gap-2">
        <StateLabel>Offline mid-upload</StateLabel>
        <FileUpload
          variant="file"
          showDropzone={false}
          clearable={false}
          items={[{
            id: "e3",
            name: "menu-april.csv",
            status: "paused",
            progress: 46,
            note: "Paused â€” waiting for a connection. Resumes at 46%.",
          }]}
        />
        <Caption>Pause and resume from where it stopped â€” never restart the whole file.</Caption>
      </div>

      <div className="flex flex-col gap-2">
        <StateLabel>Long filename truncates in the middle</StateLabel>
        <div style={{ maxWidth: 266 }}>
          <FileUpload
            variant="file"
            showDropzone={false}
            clearable={false}
            items={[{
              id: "e4",
              name: "chandigarh-outlets-march-2026-final-v3.xlsx",
              size: "2.4 MB",
              status: "idle",
              note: "",
            }]}
          />
        </div>
        <Caption>Keep the extension visible â€” operators identify files by type as much as by name.</Caption>
      </div>

      <div className="flex flex-col gap-2">
        <StateLabel>Nothing uploaded yet</StateLabel>
        <FileUpload variant="file" showDropzone={false} showEmptyListHint items={[]} />
        <Caption>The list says what will land here rather than showing an empty box.</Caption>
      </div>
    </div>
  ),
};

export const RowSizes: Story = {
  name: "Design Â· Row sizes",
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-5" style={{ maxWidth: 430 }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} className="flex flex-col gap-2">
          <StateLabel>{s}</StateLabel>
          <FileUpload
            size={s}
            variant="file"
            showDropzone={false}
            items={[
              { id: `${s}-1`, name: "menu-march.csv", size: "1.2 MB", status: "uploading", progress: 68, note: "820 KB of 1.2 MB" },
              { id: `${s}-2`, name: "outlet-photos.zip", size: "4.8 MB", status: "done", note: "Uploaded" },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};

export const BadgeOff: Story = {
  name: "Design Â· showStatusBadge false",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "The design's live-upload list drops the pill: in-flight rows show a bare percentage and finished rows a green check disc. The per-row Retry pill and the Ã— stay â€” cancel is available for the whole upload and is never greyed out.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 430 }}>
      <FileUpload
        variant="file"
        showDropzone={false}
        showStatusBadge={false}
        onRetry={() => {}}
        items={[
          { id: "b1", name: "menu-march.csv", size: "1.2 MB", status: "done", note: "Uploaded" },
          { id: "b2", name: "outlet-photos.zip", size: "4.8 MB", status: "uploading", progress: 42, note: "2.0 MB of 4.8 MB" },
          { id: "b3", name: "outlet-hero.png", size: "3.4 MB", status: "failed", progress: 46 },
        ]}
      />
    </div>
  ),
};

/* â”€â”€ The four upload shapes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const ShapeCompact: Story = {
  name: "Design Â· Shape Â· Compact",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "For a single required document inside a long form â€” a full dropzone would dominate the page. The label lives inside the row, so no outer label is rendered.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-5" style={{ maxWidth: 340 }}>
      <div className="flex flex-col gap-2">
        <StateLabel>Empty</StateLabel>
        <FileUpload
          variant="compact"
          label="FSSAI certificate"
          allowedFiles={["pdf", "jpg"]}
          maxSize={2 * 1024 * 1024}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Filled</StateLabel>
        <FileUpload
          variant="compact"
          label="FSSAI certificate"
          description="PDF or JPG Â· max 2 MB"
          items={[{ id: "c1", name: "fssai-licence.pdf", size: "1.8 MB", status: "done", note: "Uploaded" }]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Rejected</StateLabel>
        <FileUpload
          variant="compact"
          label="FSSAI certificate"
          description="PDF or JPG Â· max 2 MB"
          items={[{ id: "c2", name: "fssai-licence.pdf", size: "7.2 MB", status: "rejected", note: "7.2 MB â€” the cap is 2 MB" }]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Disabled</StateLabel>
        <FileUpload variant="compact" label="FSSAI certificate" description="PDF or JPG Â· max 2 MB" disabled />
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Sizes</StateLabel>
        {(["sm", "md", "lg"] as const).map((s) => (
          <FileUpload key={s} size={s} variant="compact" label="FSSAI certificate" description={`size="${s}"`} />
        ))}
      </div>
    </div>
  ),
};

export const ShapeAvatar: Story = {
  name: "Design Â· Shape Â· Avatar",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Circular crop with a camera badge. Initials are the fallback â€” never a grey silhouette icon.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-5" style={{ maxWidth: 340 }}>
      <div className="flex flex-col gap-2">
        <StateLabel>Initials fallback</StateLabel>
        <FileUpload
          variant="avatar"
          label="Ritika Sharma"
          description="Square image, at least 200Ã—200. JPG or PNG."
        />
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>With a photo</StateLabel>
        <FileUpload
          variant="avatar"
          label="Ritika Sharma"
          description="Square image, at least 200Ã—200. JPG or PNG."
          value={AVATAR_URL}
        />
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Explicit initials + custom badge</StateLabel>
        <FileUpload
          variant="avatar"
          label="Chai Point"
          initials="CP"
          icon={<Store size={11} />}
          description="Outlet logo Â· min 200Ã—200"
        />
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Sizes</StateLabel>
        {(["sm", "md", "lg"] as const).map((s) => (
          <FileUpload key={s} size={s} variant="avatar" label="Ritika Sharma" description={`size="${s}"`} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Disabled</StateLabel>
        <FileUpload variant="avatar" label="Ritika Sharma" description="Locked by your admin" disabled />
      </div>
    </div>
  ),
};

export const ShapeGallery: Story = {
  name: "Design Â· Shape Â· Gallery",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "A reorderable image grid. The first tile is always the cover and says so â€” the merchant never has to guess which photo the storefront will use.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-5" style={{ maxWidth: 340 }}>
      <div className="flex flex-col gap-2">
        <StateLabel>Three images + add slot</StateLabel>
        <FileUpload variant="gallery" multiple maxFiles={8} value={THUMB_URLS} />
        <Caption>Drag to reorder; the first image is always the cover.</Caption>
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Empty</StateLabel>
        <FileUpload variant="gallery" multiple maxFiles={8} />
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Full â€” add slot hidden at maxFiles</StateLabel>
        <FileUpload variant="gallery" multiple maxFiles={3} value={THUMB_URLS} />
      </div>
      <div className="flex flex-col gap-2">
        <StateLabel>Six columns, no cover badge</StateLabel>
        <FileUpload variant="gallery" multiple galleryColumns={6} coverBadge={false} value={THUMB_URLS} />
      </div>
    </div>
  ),
};

export const ShapeBatch: Story = {
  name: "Design Â· Shape Â· Batch",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "A summary bar over the rows, with a **Retry all** shortcut once anything has failed. The bar never blocks the page â€” uploading continues while the operator works.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 440 }}>
      <FileUpload
        variant="file"
        showDropzone={false}
        batchSummary
        batchCaption="14.2 MB of 19.0 MB Â· about 40 seconds left"
        onRetryAll={() => {}}
        onRetry={() => {}}
        items={[
          { id: "n1", name: "outlet-01.jpg", size: "1.4 MB", status: "done", note: "Uploaded" },
          { id: "n2", name: "outlet-02.jpg", size: "1.6 MB", status: "done", note: "Uploaded" },
          { id: "n3", name: "outlet-03.jpg", size: "2.1 MB", status: "uploading", progress: 74, note: "1.5 MB of 2.1 MB" },
          { id: "n4", name: "outlet-04.jpg", size: "1.9 MB", status: "queued", note: "Waiting â€” 1 file ahead" },
          { id: "n5", name: "outlet-05.jpg", size: "2.4 MB", status: "failed", progress: 46 },
          { id: "n6", name: "outlet-06.tiff", ext: "TIF", status: "rejected", note: "Only JPG and PNG are accepted" },
        ]}
      />
    </div>
  ),
};

/* â”€â”€ Live simulation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const LiveUpload: Story = {
  name: "Design Â· Live upload",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "The full loop: queued â†’ uploading â†’ done, with a failure you can retry. Retry is per file, so one failure never restarts the batch, and the Ã— stays available for the whole upload.",
      },
    },
  },
  render: function LiveUploadStory() {
    const [files, setFiles] = React.useState<FileUploadItem[]>([
      { id: "l1", name: "menu-march.csv", size: "1.2 MB", status: "done", note: "412 items imported" },
      { id: "l2", name: "outlet-photos.zip", size: "4.8 MB", status: "uploading", progress: 42 },
    ]);
    const nextId = React.useRef(3);

    // Tick every in-flight row forward; flip to done at 100%.
    React.useEffect(() => {
      const timer = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) => {
            if (f.status !== "uploading") return f;
            const progress = Math.min(100, (f.progress ?? 0) + 7);
            return progress >= 100
              ? { ...f, progress: 100, status: "done" as const, note: "Uploaded" }
              : { ...f, progress, note: `${progress}% of ${f.size}` };
          }),
        );
      }, 420);
      return () => clearInterval(timer);
    }, []);

    const addFile = () =>
      setFiles((prev) => [
        ...prev,
        {
          id: `l${nextId.current++}`,
          name: `menu-${10 + prev.length}.csv`,
          size: "1.1 MB",
          status: "uploading" as const,
          progress: 0,
        },
      ]);

    const addFailure = () =>
      setFiles((prev) => [
        ...prev,
        {
          id: `l${nextId.current++}`,
          name: "outlet-hero.png",
          size: "3.4 MB",
          status: "failed" as const,
          progress: 46,
          note: "Connection dropped â€” nothing was saved",
        },
      ]);

    const done = files.filter((f) => f.status === "done").length;
    const uploading = files.filter((f) => f.status === "uploading").length;
    const failed = files.filter((f) => f.status === "failed").length;

    const pill: React.CSSProperties = {
      height: 34,
      padding: "0 13px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
    };

    return (
      <div className="flex flex-col gap-4" style={{ maxWidth: 460 }}>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          <button type="button" onClick={addFile} style={{ ...pill, border: 0, background: "#003C1B", color: "#FFFFFF" }}>
            Add file
          </button>
          <button
            type="button"
            onClick={addFailure}
            style={{ ...pill, border: "1px solid #F2C8CC", background: "#FBE9EA", color: "#7A0009" }}
          >
            Add a failure
          </button>
          <button
            type="button"
            onClick={() => setFiles([])}
            style={{ ...pill, border: "1px solid #E2E2E2", background: "#FFFFFF", color: "#595959" }}
          >
            Clear
          </button>
        </div>

        <FileUpload
          variant="file"
          placeholder="Drop menu files here"
          allowedFiles={["csv", "xlsx"]}
          maxSize={5 * 1024 * 1024}
          showStatusBadge={false}
          showEmptyListHint
          items={files}
          onChange={addFile}
          onRemoveFile={(index) => setFiles((prev) => prev.filter((_, i) => i !== index))}
          onRetry={(item) =>
            setFiles((prev) =>
              prev.map((f) =>
                f.id === item.id
                  ? { ...f, status: "uploading" as const, progress: 0, note: undefined }
                  : f,
              ),
            )
          }
        />

        <code style={{ fontSize: 11, color: "#787878" }}>
          {files.length === 0
            ? "No files in the queue."
            : `${done} done Â· ${uploading} uploading Â· ${failed} failed`}
        </code>
      </div>
    );
  },
};

/* â”€â”€ Do / Don't â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const ErrorMessageQuality: Story = {
  name: "Design Â· Do & Don't",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "An upload error has to answer three questions: which file, why, and can it be retried. A bare â€œUpload failedâ€ answers none of them and forces the operator to re-attempt blindly to find out.",
      },
    },
  },
  render: () => (
    <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
      <div
        className="flex flex-col gap-3"
        style={{ border: "1px solid #E2E2E2", borderTop: "3px solid #00A86B", borderRadius: 12, padding: 20 }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "#00A86B" }}>
          Do
        </span>
        <FileUpload
          variant="file"
          showDropzone={false}
          clearable={false}
          items={[{ id: "d1", name: "fssai-licence.pdf", size: "7.2 MB", status: "rejected", note: "7.2 MB â€” the cap is 5 MB" }]}
        />
        <Caption>
          The error names the file, the actual size and the limit â€” everything needed to fix it
          without guessing.
        </Caption>
      </div>

      <div
        className="flex flex-col gap-3"
        style={{ border: "1px solid #E2E2E2", borderTop: "3px solid #A8000F", borderRadius: 12, padding: 20 }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "#A8000F" }}>
          Don&apos;t
        </span>
        <FileUpload
          variant="file"
          showDropzone={false}
          clearable={false}
          showStatusBadge={false}
          items={[{ id: "d2", name: "Upload failed", ext: "?", status: "rejected", note: "" }]}
        />
        <Caption>Which file? Why? Can it be retried? The operator has to re-attempt blindly.</Caption>
      </div>
    </div>
  ),
};

/* â”€â”€ Full showcase â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const DesignOverview: Story = {
  name: "Design Â· Everything",
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-8" style={{ maxWidth: 960 }}>
      <div className="flex flex-col gap-3">
        <StateLabel>Dropzone â€” the constraints come first</StateLabel>
        <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          <FileUpload variant="file" placeholder="Drop menu files here" allowedFiles={["csv", "xlsx"]} maxSize={5 * 1024 * 1024} />
          <FileUpload variant="image" placeholder="Drop images here" allowedFiles={["jpg", "png"]} maxSize={2 * 1024 * 1024} />
          <FileUpload variant="video" placeholder="Drop videos here" allowedFiles={["mp4", "webm"]} maxSize={50 * 1024 * 1024} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <StateLabel>All nine row states</StateLabel>
        <div className="grid gap-3 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
          {STATE_ROWS.map(({ label, item }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <StateLabel>{label}</StateLabel>
              <FileUpload variant="file" showDropzone={false} clearable={false} items={[item]} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <StateLabel>Four shapes</StateLabel>
        <div className="grid gap-5 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))" }}>
          <FileUpload variant="compact" label="FSSAI certificate" allowedFiles={["pdf", "jpg"]} maxSize={2 * 1024 * 1024} />
          <FileUpload variant="avatar" label="Ritika Sharma" description="Square image, at least 200Ã—200." />
          <FileUpload variant="gallery" multiple maxFiles={8} value={THUMB_URLS} />
          <FileUpload
            variant="file"
            showDropzone={false}
            batchSummary
            batchCaption="14.2 MB of 19.0 MB Â· about 40 seconds left"
            onRetryAll={() => {}}
            items={[
              { id: "o1", name: "outlet-01.jpg", size: "1.4 MB", status: "done", note: "Uploaded" },
              { id: "o2", name: "outlet-05.jpg", size: "2.4 MB", status: "failed", progress: 46 },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};
