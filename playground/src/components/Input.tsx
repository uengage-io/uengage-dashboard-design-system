import { Button, Input } from "@uengage/ui";
import { Building2, Mail, MapPin, Percent, Phone, User } from "lucide-react";
import { useState } from "react";

const SIZES = [
  { size: "xs", name: "XSmall", spec: "28 · r6 · 12px" },
  { size: "sm", name: "Small", spec: "32 · r8 · 12px" },
  { size: "md", name: "Medium", spec: "40 · r8 · 13px" },
  { size: "lg", name: "Large", spec: "48 · r8 · 14px" },
] as const;

const CITIES = [
  { label: "Chandigarh", value: "chandigarh" },
  { label: "Chandannagar", value: "chandannagar" },
  { label: "Chandrapur", value: "chandrapur" },
  { label: "Chennai", value: "chennai" },
  { label: "Coimbatore", value: "coimbatore" },
];

function Section({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 44 }}>
      <h2
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#6b7280",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: caption ? 4 : 16,
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: 8,
        }}
      >
        {title}
      </h2>
      {caption && (
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 16px" }}>{caption}</p>
      )}
      {children}
    </section>
  );
}

/** Responsive card grid — the layout the design uses for state/type galleries. */
function Grid({ min = 258, children }: { min?: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
        gap: 18,
        alignItems: "start",
      }}
    >
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 11, lineHeight: 1.5, color: "#9C9C9C" }}>{children}</span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        color: "#9C9C9C",
      }}
    >
      {children}
    </span>
  );
}

function Case({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Eyebrow>{title}</Eyebrow>
      {children}
      {note && <Caption>{note}</Caption>}
    </div>
  );
}

export default function InputPreview() {
  const [liveSize, setLiveSize] = useState<(typeof SIZES)[number]["size"]>("md");
  const [city, setCity] = useState("Chandi");
  const [note, setNote] = useState(
    "Kitchen closes 30 minutes before the storefront so late orders do not breach TAT.",
  );
  const [outlet, setOutlet] = useState("Sector 17 Flagship");
  const [gstin, setGstin] = useState("22AAAAA0000A1Z5");
  const [gstStatus, setGstStatus] = useState<"validating" | "success" | undefined>(
    undefined,
  );

  function verifyGstin() {
    setGstStatus("validating");
    setTimeout(() => setGstStatus("success"), 1600);
  }

  return (
    <div
      style={{
        fontFamily: "Figtree, sans-serif",
        maxWidth: 1120,
        margin: "0 auto",
        padding: "40px 32px 80px",
        background: "#fff",
        minHeight: "100vh",
        color: "#202020",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#161616", marginBottom: 8 }}>
        Input
      </h1>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 40 }}>
        4 sizes · 12 states · every field type and edge case
      </p>

      {/* ── Anatomy ────────────────────────────────────────────── */}
      <Section
        title="Anatomy"
        caption="Label above, control, message below. The message row is reserved on any field that can validate, so a late error never shifts the form."
      >
        <div style={{ display: "flex", gap: 36, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ width: 300 }}>
            <Input
              label="Outlet Name"
              required
              leftIcon={<Building2 />}
              maxLength={40}
              value={outlet}
              onChange={(e) => setOutlet(e.target.value)}
              helperText="Shown to customers on the storefront."
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
            {[
              ["Label", "Figtree 600 / 12px, Title Case, red asterisk when required"],
              ["Control", "height 40, radius 8, 1px #E2E2E2 hairline, 13px value"],
              ["Affixes", "16px glyphs at 2px stroke, 9px gap, #1F5E2C"],
              ["Message", "11px, one line, colour matches the status"],
              ["Focus", "border #1F5E2C + 3px lime halo, 120ms linear"],
            ].map(([term, def]) => (
              <span key={term} style={{ fontSize: 12, lineHeight: 1.5, color: "#595959" }}>
                <b>{term}</b> — {def}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Live field ─────────────────────────────────────────── */}
      <Section
        title="Live field"
        caption="Type in it, tab into it. Switch the size to see the whole scale respond."
      >
        <div
          style={{
            display: "inline-flex",
            padding: 3,
            gap: 2,
            background: "#F3F5F9",
            borderRadius: 8,
            marginBottom: 18,
          }}
        >
          {SIZES.map(({ size }) => (
            <button
              key={size}
              onClick={() => setLiveSize(size)}
              style={{
                border: 0,
                cursor: "pointer",
                padding: "6px 11px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "inherit",
                transition: "all 120ms linear",
                background: liveSize === size ? "#FFFFFF" : "transparent",
                color: liveSize === size ? "#003C1B" : "#595959",
                boxShadow: liveSize === size ? "2px 2px 4px rgba(0,0,0,.06)" : "none",
              }}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
        <Grid min={260}>
          <Input size={liveSize} label="Plain" placeholder="Type here…" helperText="Radius 8." />
          <Input
            size={liveSize}
            label="With leading icon"
            leftIcon={<Building2 />}
            placeholder="Outlet name"
            helperText="9px gap between glyph and value."
          />
          <Input
            size={liveSize}
            label="With prefix & suffix"
            prefix="₹"
            suffix="INR"
            align="right"
            allowPattern="decimal"
            defaultValue="4,500"
            helperText="Affixes sit inside the same 1px box."
          />
        </Grid>
      </Section>

      {/* ── Size scale ─────────────────────────────────────────── */}
      <Section
        title="Size scale"
        caption="28 / 32 / 40 / 48. XS is for inline table editing, LG for standalone forms and mobile."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {SIZES.map(({ size, name, spec }) => (
            <div
              key={size}
              style={{
                display: "grid",
                gridTemplateColumns: "118px 1fr 1fr 150px",
                gap: 14,
                alignItems: "center",
                paddingTop: 12,
                borderTop: "1px solid #EEEEEE",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600 }}>{name}</span>
              <Input size={size} defaultValue="Sector 17 Flagship" />
              <Input size={size} leftIcon={<Building2 />} defaultValue="Sector 17 Flagship" />
              <span style={{ fontSize: 11, fontWeight: 500, color: "#9C9C9C" }}>{spec}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── All states ─────────────────────────────────────────── */}
      <Section
        title="All states"
        caption="Rendered at Medium so the full set compares at once. Validation always pairs a colour with a message and an icon."
      >
        <Grid min={252}>
          <Case title="Default">
            <Input label="Outlet Email" leftIcon={<Mail />} defaultValue="ops@chaipoint.in" helperText="Used for order receipts." />
          </Case>
          <Case title="Placeholder">
            <Input label="Outlet Email" leftIcon={<Mail />} placeholder="name@business.com" helperText="Empty and untouched." />
          </Case>
          <Case title="Hover" note="Border deepens to #C6C6C6 — hover the field.">
            <Input label="Outlet Email" leftIcon={<Mail />} defaultValue="ops@chaipoint.in" helperText="Border deepens on hover." />
          </Case>
          <Case title="Focused" note="Border #1F5E2C + 3px lime halo — tab into the field.">
            <Input label="Outlet Email" leftIcon={<Mail />} defaultValue="ops@chaipoint.in" helperText="Focus ring appears on keyboard focus." />
          </Case>
          <Case title="Filled">
            <Input label="Outlet Email" leftIcon={<Mail />} defaultValue="ops@chaipoint.in" helperText="Resting state with a value." />
          </Case>
          <Case title="Validating">
            <Input label="GSTIN" defaultValue="22AAAAA0000A1Z5" status="validating" statusMessage="Checking with the GST portal…" />
          </Case>
          <Case title="Success">
            <Input label="GSTIN" defaultValue="22AAAAA0000A1Z5" status="success" statusMessage="Verified with the GST portal." />
          </Case>
          <Case title="Warning">
            <Input label="Delivery Radius" defaultValue="14 km" status="warning" statusMessage="Beyond 12 km, TAT breaches rise." />
          </Case>
          <Case title="Error">
            <Input label="Contact Number" defaultValue="9501174" error="Must be a 10-digit mobile number." />
          </Case>
          <Case title="Read only">
            <Input label="Business ID" defaultValue="UE-4471-DEL" readOnly helperText="Set at onboarding, cannot change." />
          </Case>
          <Case title="Disabled">
            <Input label="Parent Wallet" defaultValue="₹1,24,500" disabled helperText="Ask an admin to unlock." />
          </Case>
          <Case title="Loading">
            <Input label="Account Manager" loading helperText="Fetching from the CRM…" />
          </Case>
        </Grid>
      </Section>

      {/* ── Variants ───────────────────────────────────────────── */}
      <Section
        title="Variants"
        caption="`default` is the bordered box. `underline` drops the box for borderless, title-style fields."
      >
        <Grid min={258}>
          <Case title="Default">
            <Input label="Ticket title" placeholder="Summarise the issue" helperText="The standard bordered box." />
          </Case>
          <Case title="Underline">
            <Input variant="underline" label="Ticket title" placeholder="Summarise the issue" helperText="No box — just a bottom rule." />
          </Case>
          <Case title="Underline — error">
            <Input variant="underline" label="Ticket title" defaultValue="?" error="Give the ticket a real title." />
          </Case>
        </Grid>
      </Section>

      {/* ── Field types ────────────────────────────────────────── */}
      <Section
        title="Field types"
        caption="Every variant shares the same box, hairline and focus ring — only the contents change."
      >
        <Grid min={258}>
          <Input
            label="Password"
            inputType="password"
            defaultValue="chaipoint@2025"
            helperText="Eye toggle is automatic for inputType='password'."
          />
          <Input
            label="Phone with country code"
            prefix="+91"
            inputType="tel"
            allowPattern="phone"
            defaultValue="9501174711"
            helperText="Digits only, capped at 10."
          />
          <Input
            label="Amount"
            prefix="₹"
            align="right"
            allowPattern="decimal"
            defaultValue="1,24,500"
            helperText="Right-aligned, lakh grouping."
          />
          <Input
            label="Clearable"
            leftIcon={<Building2 />}
            clearable
            value={outlet}
            onChange={(e) => setOutlet(e.target.value)}
            onClear={() => setOutlet("")}
            placeholder="Outlet name"
            helperText="The clear button appears only when there is a value."
          />
          <Input
            label="Autocomplete"
            leftIcon={<MapPin />}
            suggestions={CITIES}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onSuggestionSelect={(value) => setCity(value)}
            placeholder="Start typing a city…"
            helperText="Fuzzy-filtered; focus the field to open."
          />
          <Input
            label="Email"
            inputType="email"
            leftIcon={<Mail />}
            placeholder="you@example.com"
            validationRegex="^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
            validationMessage="That is not a valid email address."
            helperText="Validates on blur."
          />
          <Input
            label="Percentage"
            suffix="%"
            align="right"
            allowPattern="decimal"
            defaultValue="18.5"
            rightIcon={<Percent />}
            helperText="Suffix and a trailing glyph together."
          />
          <Input
            label="Contact name"
            leftIcon={<User />}
            rightIcon={<Phone />}
            defaultValue="Harpreet Singh"
            helperText="Both glyph slots in use."
          />
        </Grid>

        <div style={{ marginTop: 18 }}>
          <Grid min={280}>
            <Input
              label="Internal Note"
              multiline
              rows={3}
              maxLength={240}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              helperText="Resizes vertically only; the counter turns amber near the limit."
            />
            <Input
              label="Internal Note — no resize"
              multiline
              rows={3}
              resize="none"
              defaultValue="Fixed height, no drag handle."
              helperText="resize='none'."
            />
            <Input
              label="Internal Note — error"
              multiline
              rows={3}
              defaultValue="?"
              error="Give the ops team something to work with."
            />
          </Grid>
        </div>
      </Section>

      {/* ── Interactive validation ─────────────────────────────── */}
      <Section
        title="Async validation"
        caption="status='validating' while the check is in flight, then status='success'. Press Verify."
      >
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 300 }}>
            <Input
              label="GSTIN"
              value={gstin}
              onChange={(e) => {
                setGstin(e.target.value);
                setGstStatus(undefined);
              }}
              status={gstStatus}
              statusMessage={
                gstStatus === "validating"
                  ? "Checking with the GST portal…"
                  : gstStatus === "success"
                    ? "Verified with the GST portal."
                    : undefined
              }
              helperText="15 characters, issued by the GST portal."
            />
          </div>
          <div style={{ paddingTop: 22 }}>
            <Button variant="secondary" size="md" title="Verify" onClick={verifyGstin} />
          </div>
        </div>
      </Section>

      {/* ── Edge cases ─────────────────────────────────────────── */}
      <Section title="Edge cases" caption="The situations that break most field systems.">
        <Grid min={262}>
          <Case
            title="Overflowing value"
            note="Truncates at rest; scrolls horizontally on focus. Never wraps."
          >
            <Input defaultValue="chaipoint.hospitality.northindia@corporate-billing.uengage.in" />
          </Case>

          <Case
            title="Long label, two lines"
            note="The label wraps; the control never moves off the grid line."
          >
            <Input
              label="Aggregator Commission Override Percentage"
              required
              align="right"
              suffix="%"
              defaultValue="18.5"
            />
          </Case>

          <Case title="Error outranks status" note="A field that is both success and in error renders as an error.">
            <Input
              label="Contact Number"
              status="success"
              statusMessage="Verified."
              error="This number is already used by another outlet."
              defaultValue="9501174711"
            />
          </Case>

          <Case title="Empty required field" note="Blur it — native validity drives the message.">
            <Input
              label="Outlet Name"
              required
              placeholder="Sector 17 Flagship"
              validationMessage="Outlet name is required."
            />
          </Case>

          <Case title="Inline table edit — XS" note="28px cells sit inside the row without stretching it.">
            <div style={{ border: "1px solid #E2E2E2", borderRadius: 8, overflow: "hidden" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 92px",
                  padding: "8px 11px",
                  background: "#F3F5F9",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#595959",
                }}
              >
                <span>Item</span>
                <span style={{ textAlign: "right" }}>Price</span>
              </div>
              {[
                ["Masala Chai", "60"],
                ["Veg Sandwich", "180"],
              ].map(([item, price]) => (
                <div
                  key={item}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 92px",
                    gap: 8,
                    alignItems: "center",
                    padding: "7px 11px",
                    borderTop: "1px solid #EEEEEE",
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{item}</span>
                  <Input size="xs" align="right" allowPattern="numeric" defaultValue={price} />
                </div>
              ))}
            </div>
          </Case>

          <Case title="Attached action" note="Zero gap, shared 40px height — composed from Input + Button.">
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Input
                defaultValue="uengage.in/chaipoint"
                boxStyle={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              />
              <Button
                variant="primary"
                size="md"
                title="Copy"
                style={{ borderRadius: "0 8px 8px 0", marginLeft: -1 }}
              />
            </div>
          </Case>

          <Case title="Full width in a form row" note="width defaults to w-full; pass any Tailwind width utility.">
            <div style={{ display: "flex", gap: 12 }}>
              <Input label="First name" defaultValue="Harpreet" />
              <Input label="Last name" defaultValue="Singh" />
            </div>
          </Case>
        </Grid>
      </Section>

      {/* ── Do / Don't ─────────────────────────────────────────── */}
      <Section title="Do / Don't">
        <Grid min={280}>
          <div
            style={{
              border: "1px solid #E2E2E2",
              borderTop: "3px solid #00A86B",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "#00A86B", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Do
            </span>
            <Input label="GSTIN" defaultValue="22AAAAA0000A1Z" error="GSTIN must be 15 characters — one missing." />
            <Caption>Colour, icon and a message that says exactly what to fix.</Caption>
          </div>
          <div
            style={{
              border: "1px solid #E2E2E2",
              borderTop: "3px solid #A8000F",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "#A8000F", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Don't
            </span>
            <Input label="GSTIN" defaultValue="22AAAAA0000A1Z" error="Invalid input." />
            <Caption>
              A red line and "invalid" tells the operator nothing, and colour alone fails
              colour-blind users.
            </Caption>
          </div>
        </Grid>
      </Section>

      {/* ── Not yet supported ──────────────────────────────────── */}
      <Section
        title="In the design, not in the component"
        caption="These appear on the design page but are compositions or themes the Input component does not implement yet."
      >
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.9, color: "#595959" }}>
          <li>
            <b>Search field</b> and <b>date &amp; time field</b> — deliberately not built into
            Input. Use the dedicated <code>SearchBar</code> and <code>DatePicker</code> components.
          </li>
          <li>
            <b>Dark surface</b> — the control has no dark theme; it renders light on a dark panel.
          </li>
          <li>
            <b>OTP cells</b> — six 48px single-character boxes, a separate component.
          </li>
          <li>
            <b>Tag input</b> — chips that grow the box, a separate component.
          </li>
          <li>
            <b>Stacked errors</b> — <code>error</code> takes one string, so only the first message shows.
          </li>
          <li>
            <b>Password strength meter</b> — the four-segment bar under the password field.
          </li>
          <li>
            <b>Number stepper</b> — the up/down chevrons attached to the Amount field.
          </li>
        </ul>
      </Section>
    </div>
  );
}
