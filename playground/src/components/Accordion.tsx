import { Accordion } from "@uengage/ui";
import type { AccordionItem } from "@uengage/ui";
import { useState } from "react";
import {
  Settings,
  Bell,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  Info,
} from "lucide-react";

const FAQ_ITEMS: AccordionItem[] = [
  {
    value: "what-is-uengage",
    title: "What is uEngage?",
    content:
      "uEngage is a full-stack customer engagement platform for brands — covering loyalty programs, push notifications, in-app messaging, and analytics, all in one dashboard.",
  },
  {
    value: "pricing",
    title: "How is pricing structured?",
    content:
      "Pricing is based on monthly active users and the modules you enable. You can start on the free tier and scale up as your user base grows.",
  },
  {
    value: "integrations",
    title: "What integrations are supported?",
    content:
      "We support integrations with Shopify, WooCommerce, Magento, custom REST APIs, and most popular CRMs. Webhooks are available for real-time event streaming.",
  },
  {
    value: "support",
    title: "How do I reach support?",
    content:
      "Our support team is available 24/7 via in-app chat, email at support@uengage.in, or your dedicated account manager on enterprise plans.",
  },
  {
    value: "security",
    title: "Is my data secure?",
    content:
      "Yes. All data is encrypted at rest and in transit. We are SOC 2 Type II certified and comply with GDPR and India's PDPB requirements.",
    disabled: true,
  },
];

const SETTINGS_ITEMS: AccordionItem[] = [
  {
    value: "account",
    title: "Account Settings",
    icon: <Settings />,
    content:
      "Manage your profile details, change your password, and configure two-factor authentication to keep your account secure.",
  },
  {
    value: "notifications",
    title: "Notification Preferences",
    icon: <Bell />,
    content:
      "Choose which events trigger email, SMS, or push notifications. Set quiet hours and manage digest schedules.",
  },
  {
    value: "billing",
    title: "Billing & Payments",
    icon: <CreditCard />,
    content:
      "View your current plan, update payment methods, and download past invoices in one place.",
  },
  {
    value: "security-settings",
    title: "Security",
    icon: <ShieldCheck />,
    content:
      "Review active sessions, revoke access tokens, and audit recent login activity from any device.",
  },
  {
    value: "help",
    title: "Help & Resources",
    icon: <HelpCircle />,
    content:
      "Browse documentation, watch onboarding videos, or reach out to our support team for guided assistance.",
  },
];

export default function AccordionPreview() {
  const [controlledValue, setControlledValue] = useState("what-is-uengage");
  const [multipleValues, setMultipleValues] = useState<string[]>([
    "account",
    "notifications",
  ]);

  return (
    <div className="min-h-screen bg-[#F6F8FB] p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
            Accordion Playground
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-[#111827]">
            Custom Accordion component
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Three variants, three sizes, single and multiple modes, icon
            support, and disabled items.
          </p>
        </div>

        {/* Default variant */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">Default</h2>
            <p className="text-sm text-[#6B7280]">
              Divider-separated items. Single open at a time (collapsible).
            </p>
          </div>
          <Accordion
            items={FAQ_ITEMS}
            variant="default"
            defaultValue="what-is-uengage"
          />
        </section>

        {/* Ghost variant */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">Ghost</h2>
            <p className="text-sm text-[#6B7280]">
              Borderless, minimal style — great for inline content sections.
            </p>
          </div>
          <Accordion
            items={FAQ_ITEMS}
            variant="ghost"
            defaultValue="pricing"
          />
        </section>

        {/* Bordered variant with icons */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">
              Bordered with icons
            </h2>
            <p className="text-sm text-[#6B7280]">
              Card-per-item layout with optional leading icons on triggers.
            </p>
          </div>
          <Accordion
            items={SETTINGS_ITEMS}
            variant="bordered"
            defaultValue="account"
          />
        </section>

        {/* Multiple open */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">
              Multiple open — controlled
            </h2>
            <p className="text-sm text-[#6B7280]">
              Any number of items can be open simultaneously.
            </p>
          </div>
          <Accordion
            items={SETTINGS_ITEMS}
            type="multiple"
            variant="bordered"
            value={multipleValues}
            onChange={setMultipleValues}
          />
          <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#374151]">
            Open panels:{" "}
            <strong>
              {multipleValues.length ? multipleValues.join(", ") : "none"}
            </strong>
          </div>
        </section>

        {/* Controlled single */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">
              Controlled — single
            </h2>
            <p className="text-sm text-[#6B7280]">
              Fully controlled by parent state. Click an item to expand it.
            </p>
          </div>
          <Accordion
            items={FAQ_ITEMS}
            variant="default"
            value={controlledValue}
            onChange={setControlledValue}
          />
          <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#374151]">
            Active panel: <strong>{controlledValue || "none"}</strong>
          </div>
        </section>

        {/* Size comparison */}
        <section className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">
              Size comparison
            </h2>
            <p className="text-sm text-[#6B7280]">
              sm / md / lg applied to the same bordered variant.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
                  {size}
                </span>
                <Accordion
                  items={FAQ_ITEMS.slice(0, 3)}
                  variant="bordered"
                  size={size}
                  defaultValue="what-is-uengage"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Info footer */}
        <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm text-[#4B5563]">
          <Info className="size-4 shrink-0 text-[#006F42]" />
          <span>
            Items with <code className="rounded bg-[#E5E7EB] px-1 text-xs">disabled: true</code> are
            visible but non-interactive — see the last item in Default and Controlled sections.
          </span>
        </div>
      </div>
    </div>
  );
}
