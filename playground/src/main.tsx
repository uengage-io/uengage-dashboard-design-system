import React from "react";
import PaginationPrev from "./components/PaginationDemo";
import ReactDOM from "react-dom/client";
import "./styles.css";
import ButtonPreview from "./components/Button";
import SearchPreview from "./components/Search";
import SelectPreview from "./components/Select";
import CheckboxPreview from "./components/Checkbox";
import RadioPreview from "./components/Radio";
import TabsPreview from "./components/Tabs";
import BadgePreview from "./components/Badge";
import TogglePreview from "./Toggle";
import AlertDialogPreview from "./components/AlertDialog";
import PageContainerDemo from "./components/PageContainer";
import TablePreview from "./components/Table";
import ModalPreview from "./components/Modal";
import Dialog from "./components/Dialog";
import SidebarPreview from "./components/Sidebar";
import PaginationPreview from "./components/Pagination";
import FuzzySearchPreview from "./components/FuzzySearch";
import Loader from "./components/Loader";
import LayoutPreview from "./components/Layout";
import AccordionPreview from "./components/Accordion";
import InputPreview from "./components/Input";
import DatePickerPreview from "./components/DatePicker";
import PrevDemo from "./components/Prev";
import AppLayoutPreview from "./components/AppLayout";
import Demo from "./components/Demo";
import FilterGroupPreview from "./components/FilterGroup"
import BannerPreview from "./components/Banner"
import DemoPage from "./components/DemoPage"
import LayoutDemo from "./components/LayoutDemo";
import FileUploadPreview from "./components/FileUpload";
import SectionPreview from "./components/Section";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <BannerPreview /> */}
    {/* <FilterGroupPreview/> */}
    {/* <SelectPreview/> */}
    {/* <InputPreview/> */}
    {/* <TabsPreview /> */}
    <AccordionPreview/>
    <Demo/>
    <FileUploadPreview />
    <SectionPreview />
  </React.StrictMode>,
);
