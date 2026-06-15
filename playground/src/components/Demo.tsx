import * as React from "react";
import {
  Section,
  SectionHeader,
  SectionContent,
  SectionSubsection,
  SectionRow,
  SectionField,
  SectionDivider,
  SectionTableContent,
  Button,
  Table
} from "@uengage/ui";

import { Building2, Users, Settings } from "lucide-react";

export default function Demo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="p-6 space-y-8">
      {/* ============================
          SECTION
      ============================ */}
      <Section
        collapsible
        open={open}
        onOpenChange={setOpen}
        className="max-w-6xl"
      >
        {/* ============================
            SECTION HEADER
        ============================ */}
        <SectionHeader
          icon={<Building2 size={20} />}
          title="Business Details"
          description="Basic information about your business"
          action={<Button className="border px-3 py-1 rounded">Edit</Button>}
        />

        {/* ============================
            SECTION CONTENT
        ============================ */}
        <SectionContent>
          {/* ============================
              SECTION ROW
          ============================ */}
          <SectionRow columns={4}>
            <SectionField>
              <label>Name</label>
              <div>ABC Restaurant</div>
            </SectionField>

            <SectionField>
              <label>Email</label>
              <div>abc@example.com</div>
            </SectionField>

            <SectionField>
              <label>Phone</label>
              <div>9999999999</div>
            </SectionField>
            <SectionField>
              <label>Email</label>
              <div>abc@example.com</div>
            </SectionField>
          </SectionRow>

          {/* ============================
              SECTION DIVIDER
          ============================ */}
          <SectionDivider />

          {/* ============================
              SUBSECTION
          ============================ */}
          <SectionSubsection
            title="Address"
            description="Store location details"
            separator={false}
          >
            <SectionRow columns={2}>
              <SectionField>
                <label>City</label>
                <div>Noida</div>
              </SectionField>

              <SectionField>
                <label>State</label>
                <div>Uttar Pradesh</div>
              </SectionField>
            </SectionRow>
          </SectionSubsection>

          {/* ============================
              ROW WITH DIVIDERS
          ============================ */}
          <SectionSubsection title="Statistics" separator={false}>
            <SectionRow dividers>
              <SectionField>
                <p className="font-semibold">120</p>
                <p>Total Orders</p>
              </SectionField>

              <SectionField>
                <p className="font-semibold">80</p>
                <p>Customers</p>
              </SectionField>

              <SectionField>
                <p className="font-semibold">12</p>
                <p>Stores</p>
              </SectionField>
            </SectionRow>
          </SectionSubsection>

          {/* ============================
              CUSTOM GRID TEMPLATE
          ============================ */}
          <SectionDivider />

          <SectionRow columns="2fr 1fr 1fr">
            <SectionField span={2}>
              <label>Description</label>
              <div>This field spans 2 columns.</div>
            </SectionField>

            <SectionField>
              <label>Status</label>
              <div>Active</div>
            </SectionField>
          </SectionRow>
        </SectionContent>
      </Section>

      {/* ============================
          TABLE SECTION
      ============================ */}
      <Section  collapsible defaultOpen={true}>
        <SectionHeader
          icon={<Users size={20} />}
          title="Users"
          description="Team members"
        />

        <SectionTableContent>
    <Table
      columns={[
        {
          flex: 1.2,
          header: 'Cloud Brand',
          key: 'cloudBrand',
          render: () => {},
          sortable: true
        },
        {
          flex: 1,
          header: 'Outlet',
          key: 'outlet',
          sortable: true
        },
        {
          flex: 1,
          header: 'Category',
          key: 'category'
        },
        {
          flex: 1,
          header: 'Mapped On',
          key: 'mappedOn',
          sortable: true
        },
        {
          flex: 0.8,
          header: 'Status',
          key: 'status',
          render: () => {}
        }
      ]}
      data={[
        {
          category: 'Burgers',
          cloudBrand: 'Burger Bros',
          id: '1',
          mappedOn: '12 Jan 2025',
          outlet: 'Bandra West',
          status: 'Active'
        },
        {
          category: 'Pizza',
          cloudBrand: 'Pizza Palace',
          id: '2',
          mappedOn: '18 Jan 2025',
          outlet: 'Koramangala',
          status: 'Active'
        },
        {
          category: 'Japanese',
          cloudBrand: 'Sushi Spot',
          id: '3',
          mappedOn: '02 Feb 2025',
          outlet: 'Connaught Place',
          status: 'Inactive'
        },
        {
          category: 'Mexican',
          cloudBrand: 'Taco Tribe',
          id: '4',
          mappedOn: '15 Feb 2025',
          outlet: 'Bandra West',
          status: 'Active'
        },
        {
          category: 'Healthy',
          cloudBrand: 'The Salad Bar',
          id: '5',
          mappedOn: '20 Mar 2025',
          outlet: 'Koramangala',
          status: 'Inactive'
        }
      ]}
      hover
      keyField="id"
    />
  </SectionTableContent>
      </Section>

      {/* ============================
          BARE SECTION
      ============================ */}
      <Section bare>
        <SectionHeader
          icon={<Settings size={20} />}
          title="Bare Section"
          description="No card styling"
        />

        <SectionContent>
          <p>This section uses the `bare` prop.</p>
        </SectionContent>
      </Section>
    </div>
  );
}
