import { PageContainer, TopHeader, SubHeader, Button } from "@uengage/ui";

export default function LayoutDemo() {
  return (
    <PageContainer>
      <TopHeader
        title="Layout Demo"
        action={
          <>
            <Button variant="ghost">Cancel</Button>
            <Button variant="secondary">Save Draft</Button>
            <Button variant="primary">Publish</Button>
          </>
        }
        divider
      />

      <SubHeader
        title="Section Overview"
        subtitle="Manage and review your content below."
        divider
        right={
          <>
            <Button variant="ghost">Reset</Button>
            <Button variant="secondary">Export</Button>
            <Button variant="primary">Add New</Button>
          </>
        }
      />
    </PageContainer>
  );
}
