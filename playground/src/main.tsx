import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import ButtonPreview from "./components/Button";
import SearchPreview from "./components/Search";
import SelectPreview from "./components/Select";
import CheckboxPreview from "./components/Checkbox";
import RadioPreview from "./components/Radio";
import TabsPreview from "./components/Tabs";
import BadgePreview from "./components/Badge";
import DatePickerPreview from "./components/DatePicker";
import TogglePreview from "./Toggle";
import AlertDialogPreview from "./components/AlertDialog";
import PageContainerDemo from "./components/PageContainer";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ButtonPreview />

    <SearchPreview />
    <SelectPreview />
    <CheckboxPreview />
    <RadioPreview />
    <TabsPreview />
    <BadgePreview />
    <DatePickerPreview />
    <br />
    <TogglePreview />
    <AlertDialogPreview />
    <PageContainerDemo />
  </React.StrictMode>,
);
