import { Table } from "@uengage/ui";
const users = [
  { id: 1, name: "Aman", age: 22, role: "Developer" },
  { id: 2, name: "Rahul", age: 25, role: "Designer" },
];
const columns = [
  {
    key: "name",
    header: "Name",
    sortable: true,
  },
  {
    key: "age",
    header: "Age",
    render: (value: number) => {
      return <span>{value} years</span>;
    },
    sortable: true,
  },
  {
    key: "role",
    header: "Role",
  },
];
export default function TablePreview() {
  return (
    <Table
      columns={columns}
      data={users}
      keyField="id"
      loading={false}
      emptyMessage="No data found"
      onRowClick={(row) => console.log(row)}
      stickyHeader={true}
      bordered={true}
      size="md"
      mobileLayout="scroll"
    />
  );
}
