// Base (shadcn) components
export * from "./components/ui/button";
export * from "./components/ui/alert-dialog";
export * from "./components/ui/separator";
export * from "./components/ui/drawer";

// Customized components

export {
  Button,
  buttonVariants as customButtonVariants,
  type ButtonProps as CustomButtonProps,
  type ColorVariant,
  type ButtonState,
} from "./components/custom/Button/button";

// Layout primitives
export {
  PageContainer,
  TopHeader,
  SubHeader,
  Grid,
  type PageContainerProps,
  type TopHeaderProps,
  type SubHeaderProps,
  type SubHeaderAlign,
  type GridProps,
  type GridColumns,
  type GridLimit,
} from "./components/custom/Layout";

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  type CardProps,
} from "./components/custom/Card/Card";

// SearchBar
export {
  SearchBar,
  type SearchBarProps,
  type SearchBarSize,
  type SearchValueType,
} from "./components/custom/SearchBar";

// Select
export { Select } from "./components/custom/Select/Select";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./components/ui/popover";
export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./components/ui/command";
export {
  triggerVariants,
  type TriggerState,
  type TriggerSize,
  type TriggerVariants,
  type SelectOption,
  type SelectMode,
  type SelectProps,
} from "./components/custom/Select";

// Tabs (custom)
export {
  Tabs,
  CustomTabsTrigger,
  type CustomTabsTriggerProps,
  type CustomTabsProps,
  type TabItem,
  tabTriggerVariants,
  // tabPillVariants,
  // tabIndicatorVariants,
  type TabTriggerVariants,
  // type TabPillVariants,
  // type TabIndicatorVariants,
} from "./components/custom/Tabs";

// Input (base)
export { Input as input } from "./components/ui/input";

// CustomInput
export { Input } from "./components/custom/Input/Input";
export {
  InputLabel,
  type InputLabelProps,
  type InputLabelSize,
} from "./components/custom/Input/InputLabel";
export {
  InputHelper,
  type InputHelperProps,
  type InputHelperSize,
} from "./components/custom/Input/InputHelper";
export type { CustomInputProps, InputType, AllowPattern } from "./types/input";
export {
  inputWrapperVariants,
  inputFieldVariants,
  inputIconSlotVariants,
  PATTERN_REGEX,
  type InputWrapperVariants,
  type InputFieldVariants,
  type InputIconSlotVariants,
} from "./components/custom/Input/inputVariants";

// Label (base)
export { Label } from "./components/ui/label";

// Radio
export {
  Radio,
  RadioGroup,
  type CustomRadioItemProps,
} from "./components/custom/Radio";
export type { RadioOption, CustomRadioGroupProps } from "./types/radio";
export {
  radioCircleVariants,
  radioDotVariants,
  radioLabelVariants,
  type RadioCircleVariants,
  type RadioDotVariants,
  type RadioLabelVariants,
} from "./utils/radio";

// Checkbox
export { Checkbox, CheckboxGroup } from "./components/custom/Checkbox";
export type {
  CheckboxOption,
  CustomCheckboxProps,
  CustomCheckboxGroupProps,
} from "./types/checkbox";
export {
  checkboxBoxVariants,
  checkboxLabelVariants,
  type CheckboxBoxVariants,
  type CheckboxLabelVariants,
} from "./utils/checkbox";

// DatePicker
export {
  DatePicker,
  DatePickerCalendar,
  MonthPickerCalendar,
  type DatePickerProps,
  type DateRange,
  type DatePickerMode,
} from "./components/custom/DatePicker";
export {
  triggerVariants as datePickerTriggerVariants,
  dayCellVariants,
  type DatePickerTriggerState,
  type DayCellVariant,
} from "./components/custom/DatePicker/datepickerVariants";
export {
  formatDate,
  formatMonthYear,
  formatRange,
  isSameDay,
} from "./components/custom/DatePicker/dateHelpers";

// Table
export {
  Table,
  TableCell as CustomTableCell,
  TableHeaderCell as CustomTableHeaderCell,
  TableSkeleton as CustomTableSkeleton,
  type TableCellProps,
  type TableHeaderCellProps,
  type TableSkeletonProps,
  type SortDirection,
} from "./components/custom/Table";
export {
  StatusBadge,
  type StatusBadgeProps,
} from "./components/custom/StatusBadge";
export type { ColumnDef, CustomTableProps } from "./types/table";
export {
  tableWrapperVariants,
  tableHeaderRowVariants,
  tableBodyRowVariants,
  statusBadgeVariants,
  type TableWrapperVariants,
  type TableHeaderRowVariants,
  type TableBodyRowVariants,
  type StatusBadgeVariants,
} from "./utils/table";

export { Toggle } from "./components/custom/Toggle/Toggle";
export type { ToggleProps } from "./components/custom/Toggle/Toggle";
export {
  trackVariants,
  thumbVariants,
} from "./components/custom/Toggle/toggleVariants";
export type {
  ToggleVariantSize,
  TrackVariants,
  ThumbVariants,
} from "./components/custom/Toggle/toggleVariants";
export {
  Sidebar,
  type SidebarProps,
  type SidebarSide,
  type SidebarSize,
  sidebarContentVariants,
  sidebarPersistentVariants,
  type SidebarContentVariants,
} from "./components/custom/sidebar";

// Alert Dialog (custom)
export {
  AlertDialog,
  SweetAlertProvider,
  useSweetAlert,
  type AlertDialogProps,
  type AlertDialogOptions,
  type AlertDialogVariant,
  type AlertDialogSize,
  type AlertDialogInput,
  type AlertDialogIconProp,
  type SweetAlertResult,
  alertDialogIconBadgeVariants,
} from "./components/custom/Alert-Dialog";

// Tokens
export {
  LAYOUT,
  toCssSize,
  type CssSize,
  type LayoutTokens,
} from "./utils/layoutTokens";
export { brand, type BrandGreen } from "./utils/colors";

export { cn } from "./lib/utils";

// Modal
export { Modal, type ModalProps } from "./components/custom/Modal";

// Pagination
export { Pagination } from "./components/custom/Pagination";
export type { CustomPaginationProps } from "./types/pagination";
export {
  pageButtonVariants,
  chevronButtonVariants,
  usePagination,
  type PageButtonVariants,
  type ChevronButtonVariants,
} from "./utils/pagination";

// Provider
export { UengageProvider } from "./components/custom/Provider";

// Loader
export { Loader } from "./components/custom/Loader";

// AppHeader
export { AppHeader, type AppHeaderProps } from "./components/custom/AppHeader";

// AppSidebar
export {
  AppSidebar,
  type AppSidebarProps,
  type AppSidebarProduct,
  type AppSidebarModule,
} from "./components/custom/AppSidebar";

// Accordion
export {
  Accordion,
  type AccordionItem,
  type CustomAccordionProps,
  type AccordionVariant,
  type AccordionSize,
  accordionRootVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
  type AccordionRootVariants,
  type AccordionItemVariants,
  type AccordionTriggerVariants,
  type AccordionContentVariants,
} from "./components/custom/Accordion";

// FilterGroup
export {
  FilterGroup,
  type FilterGroupProps,
} from "./components/custom/FilterGroup";
export { FilterGroupMobileContext } from "./lib/filterGroupContext";

// Banner
export {
  Banner,
  type BannerProps,
  type BannerVariant,
} from "./components/custom/Banner";

// Section
export {
  Section,
  SectionHeader,
  SectionContent,
  SectionSubsection,
  SectionRow,
  SectionField,
  SectionDivider,
  SectionTableContent,
  type SectionProps,
  type SectionHeaderProps,
  type SectionContentProps,
  type SectionSubsectionProps,
  type SectionRowProps,
  type SectionFieldProps,
  type SectionDividerProps,
  type SectionTableContentProps,
} from "./components/custom/Section";

// FileUpload
export {
  FileUpload,
  type FileUploadProps,
  type FileUploadVariant,
  type FileUploadSize,
  type FileUploadLocalFile,
  dropzoneVariants,
  iconWrapperVariants,
  avatarContainerVariants,
} from "./components/custom/FileUpload";
