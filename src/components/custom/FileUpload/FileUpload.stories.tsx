import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Camera, Pencil, Store } from "lucide-react";
import { FileUpload } from "./FileUpload";

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
          "A flexible file/image upload field built on top of the native `<input type=\"file\">` primitive. Supports three visual variants (`image`, `file`, `avatar`), drag-and-drop, local preview before upload, controlled value URLs, per-file size limits, and full callback coverage. All validation errors surface via `InputHelper`.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["image", "file", "avatar", "video"],
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
    onChange:          { action: "onChange" },
    onFilesChange:     { action: "onFilesChange" },
    onRemove:          { action: "onRemove" },
    onRemoveFile:      { action: "onRemoveFile" },
    onValidationError: { action: "onValidationError" },
  },
  args: {
    variant:          "file",
    size:             "md",
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
