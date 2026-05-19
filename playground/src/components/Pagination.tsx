import { useState } from "react";
import { Pagination } from "@uengage/ui";

function Section({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#111827", margin: 0 }}>
        {title}
      </h3>
      {children}
      <pre
        style={{
          background: "#f3f4f6",
          borderRadius: "0.375rem",
          padding: "0.75rem 1rem",
          fontSize: "0.75rem",
          color: "#374151",
          overflowX: "auto",
          margin: 0,
        }}
      >
        {code}
      </pre>
    </div>
  );
}

export default function PaginationPreview() {
  const [livePage, setLivePage] = useState(1);

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2.5rem", maxWidth: "800px" }}>
      <h2 style={{ fontWeight: 700, fontSize: "1.25rem", margin: 0 }}>Pagination</h2>

      {/* ── 1. Live controlled ── */}
      <Section
        title="Live Controlled"
        code={`<CustomPagination
  currentPage={${livePage}}
  totalPages={99}
  siblingCount={1}
  onPageChange={setPage}
/>`}
      >
        <Pagination
          currentPage={livePage}
          totalPages={999999}
          siblingCount={1}
          onPageChange={setLivePage}
        />
        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>
          Current page: <strong style={{ color: "#003C1B" }}>{livePage}</strong> / 99
        </p>
      </Section>

      {/* ── 2. Size variants ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#111827", margin: 0 }}>
          Size Variants
        </h3>

        <Section
          title="sm"
          code={`<Pagination currentPage={5} totalPages={10} size="sm" onPageChange={() => {}} />`}
        >
          <Pagination currentPage={5} totalPages={10} size="sm" onPageChange={() => {}} />
        </Section>

        <Section
          title="md (default)"
          code={`<Pagination currentPage={5} totalPages={10} size="md" onPageChange={() => {}} />`}
        >
          <Pagination currentPage={5} totalPages={10} size="md" onPageChange={() => {}} />
        </Section>

        <Section
          title="lg"
          code={`<Pagination currentPage={5} totalPages={10} size="lg" onPageChange={() => {}} />`}
        >
          <Pagination currentPage={5} totalPages={10} size="lg" onPageChange={() => {}} />
        </Section>
      </div>

      {/* ── 3. Sibling count variants ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#111827", margin: 0 }}>
          Sibling Count Variants (totalPages=20, currentPage=10)
        </h3>

        <Section
          title="siblingCount={1}"
          code={`<Pagination currentPage={10} totalPages={20} siblingCount={1} onPageChange={() => {}} />`}
        >
          <Pagination currentPage={10} totalPages={20} siblingCount={1} onPageChange={() => {}} />
        </Section>

        <Section
          title="siblingCount={2}"
          code={`<Pagination currentPage={10} totalPages={20} siblingCount={2} onPageChange={() => {}} />`}
        >
          <Pagination currentPage={10} totalPages={20} siblingCount={2} onPageChange={() => {}} />
        </Section>

        <Section
          title="siblingCount={3}"
          code={`<Pagination currentPage={10} totalPages={20} siblingCount={3} onPageChange={() => {}} />`}
        >
          <Pagination currentPage={10} totalPages={20} siblingCount={3} onPageChange={() => {}} />
        </Section>
      </div>

      {/* ── 4. Feature variants ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#111827", margin: 0 }}>
          Feature Variants
        </h3>

        <Section
          title="showFirstLast={true}"
          code={`<Pagination
  currentPage={5}
  totalPages={20}
  showFirstLast={true}
  onPageChange={() => {}}
/>`}
        >
          <Pagination currentPage={5} totalPages={20} showFirstLast={true} onPageChange={() => {}} />
        </Section>

        <Section
          title="disabled={true}"
          code={`<CustomPagination
  currentPage={5}
  totalPages={10}
  disabled={true}
  onPageChange={() => {}}
/>`}
        >
          <Pagination currentPage={5} totalPages={10} disabled={true} onPageChange={() => {}} />
        </Section>

        <Section
          title="Small totalPages — no ellipsis (totalPages={3})"
          code={`<CustomPagination
  currentPage={2}
  totalPages={3}
  onPageChange={() => {}}
/>`}
        >
          <Pagination currentPage={2} totalPages={3} onPageChange={() => {}} />
        </Section>
      </div>
    </div>
  );
}
