import { Button } from "@uengage/ui";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Search,
  Trash2,
  AlertTriangle,
} from "lucide-react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section
      style={{
        borderTop: "1px solid #e5e7eb",
        padding: "24px 0",
      }}
    >
      <h2
        style={{
          fontSize: 14,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: "#6b7280",
          marginBottom: 16,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        alignItems: "center",
        gap: 16,
        padding: "8px 0",
      }}
    >
      <div style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>
        {label}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ButtonPreview() {
  return (
    <div
      style={{
        fontFamily: "Figtree, sans-serif",
        fontWeight: 500,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 24px",
      }}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
          Button Preview
        </h1>
        <p style={{ color: "#6b7280", marginTop: 4 }}>
          All variants, sizes, icon combinations, and disabled states.
        </p>
      </header>

      {/* -------------------------------------------------- PRIMARY */}
      <Section title="Primary">
        <Row label="Text only">
          <Button variant="primary" size="lg">
            Next Step
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="xs">
            Xsmall
          </Button>
        </Row>
        <Row label="Left icon">
          <Button variant="primary" size="lg" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
          <Button variant="primary" size="md" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
          <Button variant="primary" size="xs" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
        </Row>
        <Row label="Right icon">
          <Button variant="primary" size="lg" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
          <Button variant="primary" size="md" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
          <Button variant="primary" size="sm" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
          <Button variant="primary" size="xs" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
        </Row>
        <Row label="Icon only">
          <Button variant="primary" size="lg" leftIcon={<Plus />} />
          <Button variant="primary" size="md" leftIcon={<Plus />} />
          <Button variant="primary" size="sm" leftIcon={<Plus />} />
          <Button variant="primary" size="xs" leftIcon={<Plus />} />
        </Row>
        <Row label="Disabled">
          <Button variant="primary" size="lg" disabled={true}>
            Large
          </Button>
          <Button
            variant="primary"
            size="md"
            disabled={true}
            rightIcon={<ArrowRight />}
          >
            Medium
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={true}
            leftIcon={<ArrowLeft />}
          >
            Small
          </Button>
          <Button
            variant="primary"
            size="xs"
            disabled={true}
            leftIcon={<Plus />}
          />
        </Row>
      </Section>

      {/* -------------------------------------------------- SECONDARY */}
      <Section title="Secondary">
        <Row label="Text only">
          <Button variant="secondary" size="lg">
            Next Step
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="xs">
            Xsmall
          </Button>
        </Row>
        <Row label="Left icon">
          <Button variant="secondary" size="lg" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
          <Button variant="secondary" size="md" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
          <Button variant="secondary" size="xs" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
        </Row>
        <Row label="Right icon">
          <Button variant="secondary" size="lg" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
          <Button variant="secondary" size="md" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
          <Button variant="secondary" size="sm" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
          <Button variant="secondary" size="xs" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
        </Row>
        <Row label="Icon only">
          <Button variant="secondary" size="lg" leftIcon={<Search />} />
          <Button variant="secondary" size="md" leftIcon={<Search />} />
          <Button variant="secondary" size="sm" leftIcon={<Search />} />
          <Button variant="secondary" size="xs" leftIcon={<Search />} />
        </Row>
        <Row label="Disabled">
          <Button variant="secondary" size="lg" disabled={true}>
            Large
          </Button>
          <Button
            variant="secondary"
            size="md"
            disabled={true}
            rightIcon={<ArrowRight />}
          >
            Medium
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={true}
            leftIcon={<ArrowLeft />}
          >
            Small
          </Button>
          <Button
            variant="secondary"
            size="xs"
            disabled={true}
            leftIcon={<Search />}
          />
        </Row>
      </Section>

      {/* -------------------------------------------------- TERTIARY */}
      <Section title="Tertiary">
        <Row label="Text only">
          <Button variant="tertiary" size="lg">
            Large
          </Button>
          <Button variant="tertiary" size="md">
            Medium
          </Button>
          <Button variant="tertiary" size="sm">
            Small
          </Button>
          <Button variant="tertiary" size="xs">
            Xsmall
          </Button>
        </Row>
        <Row label="Left icon">
          <Button variant="tertiary" size="lg" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
          <Button variant="tertiary" size="md" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
          <Button variant="tertiary" size="sm" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
          <Button variant="tertiary" size="xs" leftIcon={<ArrowLeft />}>
            Go Back
          </Button>
        </Row>
        <Row label="Right icon">
          <Button variant="tertiary" size="lg" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
          <Button variant="tertiary" size="md" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
          <Button variant="tertiary" size="sm" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
          <Button variant="tertiary" size="xs" rightIcon={<ArrowRight />}>
            Next Step
          </Button>
        </Row>
        <Row label="Icon only">
          <Button variant="tertiary" size="lg" leftIcon={<Check />} />
          <Button variant="tertiary" size="md" leftIcon={<Check />} />
          <Button variant="tertiary" size="sm" leftIcon={<Check />} />
          <Button variant="tertiary" size="xs" leftIcon={<Check />} />
        </Row>
        <Row label="Disabled">
          <Button variant="tertiary" size="lg" disabled={true}>
            Large
          </Button>
          <Button
            variant="tertiary"
            size="md"
            disabled={true}
            rightIcon={<ArrowRight />}
          >
            Medium
          </Button>
          <Button
            variant="tertiary"
            size="sm"
            disabled={true}
            leftIcon={<ArrowLeft />}
          >
            Small
          </Button>
          <Button
            variant="tertiary"
            size="xs"
            disabled={true}
            leftIcon={<Check />}
          />
        </Row>
      </Section>

      {/* -------------------------------------------------- ALERT PRIMARY */}
      <Section title="Alert Primary">
        <Row label="Default">
          <Button variant="alertPrimary">Junk</Button>
          <Button variant="alertPrimary" leftIcon={<Trash2 />}>
            Junk
          </Button>
          <Button variant="alertPrimary" rightIcon={<ArrowRight />}>
            Junk
          </Button>
          <Button variant="alertPrimary" leftIcon={<Trash2 />} />
        </Row>
        <Row label="Default">
          <Button variant="alertPrimary" size="lg">
            Long Term
          </Button>
          <Button variant="alertPrimary" size="md" leftIcon={<AlertTriangle />}>
            Long Term
          </Button>
          <Button variant="alertPrimary" size="sm" rightIcon={<ArrowRight />}>
            Proceed
          </Button>
          <Button
            variant="alertPrimary"
            size="xs"
            leftIcon={<AlertTriangle />}
          />
        </Row>
      </Section>

      {/* -------------------------------------------------- ALERT SECONDARY */}
      <Section title="Alert Secondary">
        <Row label="Default">
          <Button variant="alertSecondary">Cancel</Button>
          <Button variant="alertSecondary" leftIcon={<Trash2 />}>
            Junk
          </Button>
          <Button variant="alertSecondary" rightIcon={<ArrowRight />}>
            Junk
          </Button>
          <Button variant="alertSecondary" leftIcon={<Trash2 />} />
        </Row>
        <Row label="Default">
          <Button variant="alertSecondary" size="lg">
            Long Term
          </Button>
          <Button
            variant="alertSecondary"
            size="md"
            leftIcon={<AlertTriangle />}
          >
            Long Term
          </Button>
          <Button variant="alertSecondary" size="sm" rightIcon={<ArrowRight />}>
            Proceed
          </Button>
          <Button
            variant="alertSecondary"
            size="xs"
            leftIcon={<AlertTriangle />}
          />
        </Row>
      </Section>

      {/* -------------------------------------------------- WARNING PRIMARY */}
      <Section title="Warning Primary">
        <Row label="Default">
          <Button variant="warningPrimary">Long Term</Button>
          <Button variant="warningPrimary" leftIcon={<AlertTriangle />}>
            Long Term
          </Button>
          <Button variant="warningPrimary" rightIcon={<ArrowRight />}>
            Proceed
          </Button>
          {/* <Button variant="warningPrimary" leftIcon={<AlertTriangle />} /> */}
        </Row>
        <Row label="Default">
          <Button variant="warningPrimary" size="lg">
            Long Term
          </Button>
          <Button
            variant="warningPrimary"
            size="md"
            leftIcon={<AlertTriangle />}
          >
            Long Term
          </Button>
          <Button variant="warningPrimary" size="sm" rightIcon={<ArrowRight />}>
            Proceed
          </Button>
          {/* <Button variant="warningPrimary" size="xs" leftIcon={<AlertTriangle />} /> */}
        </Row>
      </Section>
    </div>
  );
}
