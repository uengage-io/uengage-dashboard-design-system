import { Sidebar } from "@uengage/ui";
export default function SidebarDemo() {
  return (
    <Sidebar
      trigger={<button>Open Sidebar</button>}
      size="md"
      side="right-bottom"
      sizePercent={80}
    >
      <div style={{ padding: 20 }}>
        <h2 className="text-lg font-semibold mb-4">Sidebar Content</h2>
        <p>This is an example of the Sidebar component.</p>
      </div>
    </Sidebar>
  );
}
