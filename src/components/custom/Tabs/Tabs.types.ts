export type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export interface CustomTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "primary" | "secondary" | "tertiary";
  visibleTabLimit?: number;
  overflowLabel?: string;
  className?: string;
}
