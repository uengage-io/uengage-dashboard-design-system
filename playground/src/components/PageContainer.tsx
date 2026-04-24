import { PageContainer, Button, SearchBar, Grid, TopHeader, SubHeader, Card } from "@uengage/ui";

export default function PageContainerDemo() {
  return (
    <PageContainer>
      <TopHeader
        title="PageContainer · margin-right 22px"
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
        <SearchBar placeholder='height="3.5rem"' />
      </Grid>

      <div style={{ height: 40 }} />
    </PageContainer>
  );
}
