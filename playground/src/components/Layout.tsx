import {
  PageContainer,
  TopHeader,
  SubHeader,
  Grid,
  Card,
  Button,
  CardHeader,
  CardTitle,
  SearchBar,
} from "@uengage/ui";
import type { GridColumns } from "@uengage/ui";

type Variant = {
  label: string;
  columns: GridColumns;
  count: number;
  description: string;
};

const EQUAL_VARIANTS: Variant[] = [
  { label: "1 Column", columns: "1", count: 2, description: 'columns="1" · full-width stack' },
  { label: "2 Equal Columns", columns: "2", count: 2, description: 'columns="2" · 20px gap' },
  { label: "3 Equal Columns", columns: "3", count: 3, description: 'columns="3" · 20px gap' },
  { label: "4 Equal Columns", columns: "4", count: 4, description: 'columns="4" · 12px gap' },
  { label: "5 Equal Columns", columns: "5", count: 5, description: 'columns="5" · 12px gap' },
  { label: "6 Equal Columns", columns: "6", count: 6, description: 'columns="6" · 0px gap' },
  { label: "7 Equal Columns", columns: "7", count: 7, description: 'columns="7" · 0px gap' },
  { label: "8 Equal Columns", columns: "8", count: 8, description: 'columns="8" · 0px gap' },
];

const RATIO_VARIANTS: Variant[] = [
  { label: "2 : 1 Ratio", columns: "2:1", count: 2, description: 'columns="2:1" · primary + sidebar' },
  { label: "1 : 2 Ratio", columns: "1:2", count: 2, description: 'columns="1:2" · sidebar + primary' },
  { label: "3 : 1 Ratio", columns: "3:1", count: 2, description: 'columns="3:1" · wide + narrow' },
  { label: "1 : 3 Ratio", columns: "1:3", count: 2, description: 'columns="1:3" · narrow + wide' },
  { label: "1 : 1 : 2 Ratio", columns: "1:1:2", count: 3, description: 'columns="1:1:2" · two narrow + wide' },
  { label: "2 : 1 : 1 Ratio", columns: "2:1:1", count: 3, description: 'columns="2:1:1" · wide + two narrow' },
];

function DemoCard({ index, columns }: { index: number; columns: GridColumns }) {
  return (
    <Card className="min-h-22 flex flex-col justify-center">
      <CardHeader className="text-[11px] uppercase tracking-wide text-[#9CA3AF]">
        {columns} · item {index + 1}
      </CardHeader>
      <CardTitle className="text-sm text-[#111827]">Card {index + 1}</CardTitle>
    </Card>
  );
}

function VariantSection({ variant }: { variant: Variant }) {
  return (
    <>
      <SubHeader title={variant.label} subtitle={variant.description} divider />
      <Grid columns={variant.columns}>
        {Array.from({ length: variant.count }).map((_, i) => (
          <DemoCard key={i} index={i} columns={variant.columns} />
        ))}
      </Grid>
    </>
  );
}

export default function LayoutPreview() {
  return (
    <div style={{ display: "flex", margin: "0 auto", background: "#F3F4F6" }}>
      <PageContainer>
        <TopHeader
          title="Hello"
          helper={
            <a
              href="#"
              style={{ color: "#006F42", textDecoration: "underline", fontWeight: 500 }}
            >
              (How it Works?)
            </a>
          }
          action={<Button variant="secondary">Quick Actions</Button>}
          divider
        />

        <SubHeader
          title="Equal-Width Grids"
          subtitle="1 – 8 columns. Gap is auto-picked per preset."
          divider
        />
        {EQUAL_VARIANTS.map((v) => (
          <VariantSection key={v.columns} variant={v} />
        ))}

        <SubHeader
          title="Ratio Grids"
          subtitle="Asymmetric column layouts for dashboards and split views."
          divider
        />
        {RATIO_VARIANTS.map((v) => (
          <VariantSection key={v.columns} variant={v} />
        ))}

        <SubHeader
          title="Overflow Check"
          subtitle="Long content should stay inside its column."
          divider
        />
        <Grid columns="8">
          <Card>
            <h1 style={{ fontSize: 13, margin: 0, color: "#111827" }}>
              Long heading to verify that content remains inside the column
            </h1>
          </Card>
          {Array.from({ length: 7 }).map((_, i) => (
            <Card key={i} className="min-h-16" />
            
          ))}
        </Grid>

        <SubHeader
          title="SearchBar · height prop"
          subtitle="Override the size-driven height with any CSS size."
          divider
        />
        <Grid columns="3">
          <SearchBar placeholder="size='sm' (default h-8)" size="sm" />
          <SearchBar placeholder="size='md' (default h-10)" size="md" />
          <SearchBar placeholder="size='lg' (default h-12)" size="lg" />
          <SearchBar placeholder="height={36}" />
          <SearchBar placeholder="height={48}" />
          <SearchBar placeholder='height="3.5rem"'/>
        </Grid>

        <div style={{ height: 40 }} />
      </PageContainer>
    </div>
  );
}
