import { Sidebar, Button } from "@uengage/ui";
export default function SidebarPreview() {
  return (
    <Sidebar
      closeOnOutsideClick
      overlay
      side="right"
      heading="This is the heading"
      closeIcon={true}
      divider={true}
      size="md"
      trigger={<Button>Open Sidebar</Button>}
    />
  );
}
