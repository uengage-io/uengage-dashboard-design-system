import { useState } from "react";
import { Camera, Pencil, Store } from "lucide-react";
import { FileUpload } from "@uengage/ui";

// ─── Sample assets ────────────────────────────────────────────────────────────

// Local files downloaded to playground/public/assets/
// sample-small.jpg ~21 KB (400×300), sample-large.jpg ~57 KB (1200×800)
const SMALL_FILE_URL = "/assets/sample-small.jpg";
const LARGE_FILE_URL = "/assets/sample-large.jpg";

const BANNER_URL = "https://picsum.photos/seed/uengage-banner/800/300";
const AVATAR_URL = "https://picsum.photos/seed/uengage-avatar/200/200";
const THUMB_URLS = [
  "https://picsum.photos/seed/thumb-a/200/200",
  "https://picsum.photos/seed/thumb-b/200/200",
  "https://picsum.photos/seed/thumb-c/200/200",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold text-[#111827]">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-[#6B7280]">{description}</p>}
      </div>
      {children}
    </section>
  );
}

// ─── State chip ───────────────────────────────────────────────────────────────

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 font-mono text-xs text-[#374151] leading-relaxed">
      {children}
    </div>
  );
}

// ─── Column grid ──────────────────────────────────────────────────────────────

function ColGrid({ cols = 3, children }: { cols?: number; children: React.ReactNode }) {
  const gridCols: Record<number, string> = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
  return (
    <div className={`grid ${gridCols[cols] ?? "grid-cols-3"} gap-5`}>
      {children}
    </div>
  );
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
      {children}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FileUploadPreview() {
  // ── Image single (controlled) ──────────────────────────────────────────────
  const [singleUrl, setSingleUrl] = useState<string>(BANNER_URL);
  const [singleLog, setSingleLog] = useState<string>("(initial) pre-loaded URL");

  const handleSingleChange = (files: File[]) => {
    const url = URL.createObjectURL(files[0]);
    if (singleUrl.startsWith("blob:")) URL.revokeObjectURL(singleUrl);
    setSingleUrl(url);
    setSingleLog(`onChange → ${files[0].name} · ${formatBytes(files[0].size)}`);
  };
  const handleSingleRemove = () => {
    if (singleUrl.startsWith("blob:")) URL.revokeObjectURL(singleUrl);
    setSingleUrl("");
    setSingleLog("onRemove → cleared");
  };

  // ── Image multi (controlled) ───────────────────────────────────────────────
  const [multiUrls, setMultiUrls] = useState<string[]>([...THUMB_URLS]);

  const handleMultiChange = (files: File[]) => {
    const newUrls = files.map((f) => URL.createObjectURL(f));
    setMultiUrls((prev) => [...prev, ...newUrls].slice(0, 6));
  };
  const handleMultiRemove = (index: number) => {
    setMultiUrls((prev) => {
      const removed = prev[index];
      if (removed?.startsWith("blob:")) URL.revokeObjectURL(removed);
      return prev.filter((_, i) => i !== index);
    });
  };

  // ── File list ──────────────────────────────────────────────────────────────
  const [fileLog, setFileLog] = useState<{ name: string; size: number }[]>([]);

  // ── Avatar (controlled) ────────────────────────────────────────────────────
  const [avatarUrl, setAvatarUrl] = useState<string>(AVATAR_URL);

  const handleAvatarChange = (files: File[]) => {
    const url = URL.createObjectURL(files[0]);
    if (avatarUrl.startsWith("blob:")) URL.revokeObjectURL(avatarUrl);
    setAvatarUrl(url);
  };

  // ── Validation demo ────────────────────────────────────────────────────────
  const [validationError, setValidationError] = useState<string>("");

  // ── allowedFiles demo ──────────────────────────────────────────────────────
  const [allowedError, setAllowedError] = useState<string>("");
  const [allowedDocError, setAllowedDocError] = useState<string>("");

  return (
    <div className="min-h-screen bg-[#F6F8FB] p-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
              Component Playground
            </p>
            <h1 className="mt-1.5 text-2xl font-semibold text-[#111827]">FileUpload</h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              Three variants · drag-and-drop · local preview · validation · full controlled API
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3.5 py-1.5 text-xs font-semibold text-green-700 border border-green-200 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </div>
        </div>

        {/* ── Local file previews ──────────────────────────────────────────────── */}
        <Section
          title="Local file previews"
          description="Two files downloaded to playground/public/assets — sample-small.jpg (~21 KB, 400×300) and sample-large.jpg (~57 KB, 1200×800). Passed via the value prop so the component renders them immediately without any upload step."
        >
          <ColGrid cols={2}>
            <div>
              <ColLabel>sample-small.jpg · ~21 KB</ColLabel>
              <FileUpload
                variant="image"
                label="Small image (400×300)"
                value={SMALL_FILE_URL}
                helperText="400 × 300 px · ~21 KB"
              />
            </div>
            <div>
              <ColLabel>sample-large.jpg · ~57 KB</ColLabel>
              <FileUpload
                variant="image"
                label="Large image (1200×800)"
                value={LARGE_FILE_URL}
                helperText="1200 × 800 px · ~57 KB"
              />
            </div>
          </ColGrid>
        </Section>

        {/* ── Variants at a glance ─────────────────────────────────────────────── */}
        <Section
          title="Variants"
          description="Three visual layouts — image, file, avatar. Each variant picks sensible accept defaults."
        >
          <ColGrid cols={3}>
            <div>
              <ColLabel>image</ColLabel>
              <FileUpload
                variant="image"
                label="Widget Banner"
                description="PNG, JPG, WebP"
              />
            </div>
            <div>
              <ColLabel>file</ColLabel>
              <FileUpload
                variant="file"
                label="Attachment"
                accept=".pdf,.xlsx"
                description="PDF, XLSX"
              />
            </div>
            <div>
              <ColLabel>avatar</ColLabel>
              <FileUpload
                variant="avatar"
                label="Profile Photo"
                description="Square image"
              />
            </div>
          </ColGrid>
        </Section>

        {/* ── Image single — controlled ─────────────────────────────────────────── */}
        <Section
          title="Image — single (controlled)"
          description="value prop drives the preview. onChange provides the raw File. onRemove clears the URL."
        >
          <div className="grid grid-cols-[1fr_auto] gap-6 items-start">
            <FileUpload
              variant="image"
              label="Widget Banner"
              description="PNG, JPG, WebP — any size"
              required
              value={singleUrl}
              onChange={handleSingleChange}
              onRemove={handleSingleRemove}
              showLocalPreview={false}
              helperText="Pick a file to replace the preview. Click × to clear."
            />
            <div className="flex flex-col gap-2 min-w-[240px]">
              <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">State</p>
              <Chip>
                <span className="text-[#9CA3AF]">value: </span>
                {singleUrl ? `"${singleUrl.slice(0, 30)}…"` : '""'}
              </Chip>
              <Chip>
                <span className="text-[#9CA3AF]">last event: </span>
                {singleLog}
              </Chip>
            </div>
          </div>
        </Section>

        {/* ── Image multi ───────────────────────────────────────────────────────── */}
        <Section
          title="Image — multiple (max 6)"
          description="Thumbnail grid grows as files are added. The + Add slot hides at the maxFiles limit. Each thumbnail has a hover × button."
        >
          <FileUpload
            variant="image"
            label="Banner Gallery"
            multiple
            maxFiles={6}
            value={multiUrls}
            onChange={handleMultiChange}
            onRemoveFile={handleMultiRemove}
            showLocalPreview={false}
            description="Up to 6 images"
          />
          <Chip>
            <span className="text-[#9CA3AF]">count: </span>{multiUrls.length} / 6
            {multiUrls.length > 0 && (
              <span className="text-[#9CA3AF]"> · urls: [{multiUrls.map((u, i) => (
                <span key={i}>{i > 0 ? ", " : ""}"…{u.slice(-12)}"</span>
              ))}]</span>
            )}
          </Chip>
        </Section>

        {/* ── File upload ───────────────────────────────────────────────────────── */}
        <Section
          title="File — multiple"
          description="Selecting files appends chips to the list. The Add more row appears until maxFiles is reached."
        >
          <FileUpload
            variant="file"
            label="Documents"
            multiple
            maxFiles={5}
            accept=".pdf,.xlsx,.csv,.json"
            description="PDF, XLSX, CSV, JSON — up to 5 files"
            onChange={(files) =>
              setFileLog((prev) => [
                ...prev,
                ...files.map((f) => ({ name: f.name, size: f.size })),
              ])
            }
          />
          <Chip>
            <span className="text-[#9CA3AF]">onChange log: </span>
            {fileLog.length === 0
              ? "—"
              : fileLog.map((f, i) => (
                  <span key={i}>
                    {i > 0 && " · "}
                    {f.name} ({formatBytes(f.size)})
                  </span>
                ))}
          </Chip>
        </Section>

        {/* ── Avatar ────────────────────────────────────────────────────────────── */}
        <Section
          title="Avatar — sizes"
          description="Circular variant in all three sizes. Click the link or hover the image to change the photo."
        >
          <div className="flex items-end gap-12">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <div key={sz} className="flex flex-col gap-2">
                <ColLabel>{sz}</ColLabel>
                <FileUpload
                  variant="avatar"
                  size={sz}
                  value={sz === "lg" ? avatarUrl : undefined}
                  onChange={sz === "lg" ? handleAvatarChange : undefined}
                  onRemove={sz === "lg" ? () => setAvatarUrl("") : undefined}
                  showLocalPreview={false}
                  description={sz === "lg" ? "Click to change" : undefined}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* ── Sizes ─────────────────────────────────────────────────────────────── */}
        <Section
          title="Sizes"
          description="sm · md · lg — applies to dropzone height, icon scale, and typography."
        >
          <div className="flex flex-col gap-4">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <div key={sz} className="grid grid-cols-[60px_1fr] items-center gap-4">
                <ColLabel>{sz}</ColLabel>
                <FileUpload
                  variant="image"
                  size={sz}
                  description="PNG, JPG, WebP"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* ── States ────────────────────────────────────────────────────────────── */}
        <Section title="States">
          <ColGrid cols={2}>
            <div>
              <ColLabel>disabled (empty)</ColLabel>
              <FileUpload
                variant="image"
                label="Banner"
                disabled
                description="PNG, JPG up to 5 MB"
              />
            </div>
            <div>
              <ColLabel>disabled + value</ColLabel>
              <FileUpload
                variant="image"
                label="Banner"
                disabled
                value={BANNER_URL}
              />
            </div>
            <div>
              <ColLabel>readOnly</ColLabel>
              <FileUpload
                variant="image"
                label="Banner"
                readOnly
                value={BANNER_URL}
                helperText="Viewing — cannot edit."
              />
            </div>
            <div>
              <ColLabel>clearable={`{false}`}</ColLabel>
              <FileUpload
                variant="image"
                label="Permanent Banner"
                clearable={false}
                value={BANNER_URL}
                helperText="× button is hidden."
              />
            </div>
            <div>
              <ColLabel>error</ColLabel>
              <FileUpload
                variant="image"
                label="Banner"
                required
                error="A banner image is required."
              />
            </div>
            <div>
              <ColLabel>dragAndDrop={`{false}`}</ColLabel>
              <FileUpload
                variant="file"
                label="Attachment"
                dragAndDrop={false}
                helperText="Drop events ignored. Hint hidden."
              />
            </div>
          </ColGrid>
        </Section>

        {/* ── Validation ────────────────────────────────────────────────────────── */}
        <Section
          title="Validation"
          description="maxSize rejects oversized files before onChange fires. onValidationError receives the reason strings."
        >
          <ColGrid cols={2}>
            <div>
              <ColLabel>maxSize 100 KB</ColLabel>
              <FileUpload
                variant="file"
                label="Small files only"
                maxSize={100 * 1024}
                description="Anything over 100 KB is rejected"
                error={validationError || undefined}
                onChange={() => setValidationError("")}
                onValidationError={(errs) => setValidationError(errs[0])}
              />
              <Chip>
                <span className="text-[#9CA3AF]">onValidationError: </span>
                {validationError || "—"}
              </Chip>
            </div>
            <div>
              <ColLabel>maxFiles 3 (already full)</ColLabel>
              <FileUpload
                variant="image"
                label="Gallery"
                multiple
                maxFiles={3}
                value={THUMB_URLS}
                onRemoveFile={(i) =>
                  setMultiUrls((prev) => prev.filter((_, idx) => idx !== i))
                }
                description="3 / 3 — Add button hidden"
              />
            </div>
          </ColGrid>
        </Section>

        {/* ── allowedFiles ──────────────────────────────────────────────────────── */}
        <Section
          title="allowedFiles"
          description="Pass an array of extensions to whitelist. Files with any other extension are rejected with an inline error. The native file picker is also filtered automatically."
        >
          <ColGrid cols={2}>
            <div>
              <ColLabel>images only ['jpg','jpeg','png','webp']</ColLabel>
              <FileUpload
                variant="image"
                label="Product Image"
                allowedFiles={["jpg", "jpeg", "png", "webp"]}
                description="Try dropping a .gif or .pdf"
                error={allowedError || undefined}
                onValidationError={(errs) => setAllowedError(errs[0])}
                onChange={() => setAllowedError("")}
              />
              <Chip>
                <span className="text-[#9CA3AF]">error: </span>
                {allowedError || "—"}
              </Chip>
            </div>
            <div>
              <ColLabel>documents ['.pdf','.xlsx','.csv']</ColLabel>
              <FileUpload
                variant="file"
                label="Import Document"
                allowedFiles={[".pdf", ".xlsx", ".csv"]}
                description="Try uploading a .txt or .docx"
                error={allowedDocError || undefined}
                onValidationError={(errs) => setAllowedDocError(errs[0])}
                onChange={() => setAllowedDocError("")}
              />
              <Chip>
                <span className="text-[#9CA3AF]">error: </span>
                {allowedDocError || "—"}
              </Chip>
            </div>
            <div>
              <ColLabel>single ext ['json'] + multiple</ColLabel>
              <FileUpload
                variant="file"
                label="Lottie Animations"
                allowedFiles={["json"]}
                multiple
                maxFiles={3}
                placeholder="Drop .json Lottie files"
                description=".json only — up to 3 files"
              />
            </div>
            <div>
              <ColLabel>no restriction (default)</ColLabel>
              <FileUpload
                variant="file"
                label="Any File"
                description="No allowedFiles set — everything accepted"
              />
            </div>
          </ColGrid>
        </Section>

        {/* ── Accept types ──────────────────────────────────────────────────────── */}
        <Section
          title="Accept types"
          description="Pass any valid accept string. The dropzone description tells users what's expected."
        >
          <ColGrid cols={3}>
            <div>
              <ColLabel>image/*</ColLabel>
              <FileUpload
                variant="image"
                label="Photo"
                accept="image/*"
                description="Any image format"
              />
            </div>
            <div>
              <ColLabel>.json (Lottie)</ColLabel>
              <FileUpload
                variant="file"
                label="Lottie Animation"
                accept=".json"
                placeholder="Choose a .json file"
                description=".json Lottie files only"
                helperText="Used for animated widget banners."
              />
            </div>
            <div>
              <ColLabel>.csv</ColLabel>
              <FileUpload
                variant="file"
                label="Import CSV"
                accept=".csv"
                placeholder="Drop your CSV here"
                description="Must have columns: name, email"
              />
            </div>
          </ColGrid>
        </Section>

        {/* ── Icon badge ────────────────────────────────────────────────────────── */}
        <Section
          title="Icon badge"
          description="Pass any ReactNode via icon — rendered as a small badge in the bottom-right corner of the image or avatar preview."
        >
          <ColGrid cols={3}>
            <div>
              <ColLabel>avatar + camera</ColLabel>
              <FileUpload
                variant="avatar"
                size="lg"
                value={AVATAR_URL}
                icon={<Camera size={13} />}
                description="Bottom-right badge"
              />
            </div>
            <div>
              <ColLabel>image + pencil</ColLabel>
              <FileUpload
                variant="image"
                value={BANNER_URL}
                icon={<Pencil size={12} />}
                description="PNG, JPG"
              />
            </div>
            <div>
              <ColLabel>image + brand icon</ColLabel>
              <FileUpload
                variant="image"
                value={BANNER_URL}
                icon={<Store size={12} />}
                description="Custom brand indicator"
              />
            </div>
          </ColGrid>
        </Section>

        {/* ── Field decoration ──────────────────────────────────────────────────── */}
        <Section
          title="Field decoration"
          description="label, required, helperText, error, placeholder, and description all work independently."
        >
          <ColGrid cols={2}>
            <div>
              <ColLabel>required</ColLabel>
              <FileUpload
                variant="image"
                label="Widget Banner"
                required
                description="Required to make the widget visible"
              />
            </div>
            <div>
              <ColLabel>helperText</ColLabel>
              <FileUpload
                variant="file"
                label="Attachment"
                helperText="Max one file. Replaces any existing attachment."
              />
            </div>
            <div>
              <ColLabel>custom placeholder</ColLabel>
              <FileUpload
                variant="image"
                label="Hero Image"
                placeholder="Drop your hero image here"
                description="1920 × 600 px recommended"
              />
            </div>
            <div>
              <ColLabel>no label</ColLabel>
              <FileUpload
                variant="file"
                description="PDF or XLSX"
                accept=".pdf,.xlsx"
              />
            </div>
          </ColGrid>
        </Section>

      </div>
    </div>
  );
}
