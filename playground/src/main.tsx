import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import LayoutPreview from "./Layout";
import SearchPreview from "./Search";
import ButtonPreview from "./Button";
import Demo from "./Demo";
import SelectDemo from "./SelectDemo";
import ComponentsPreview from "./ComponentsPreview";
import DatePickerDemo from "./DatePickerDemo";
import TabsDemo from "./TabsDemo";
import InputDemo from "./InputDemo";
import RadioPage from "./Radio";
import Preview from "./Preview";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Demo/> */}
    {/* <InputDemo /> */}
    {/* <TabsDemo /> */}
    <DatePickerDemo />
    {/* <ComponentsPreview /> */}
    <SelectDemo />
    {/* <LayoutPreview /> */}
    <RadioPage />
    {/* <Preview /> */}
    {/* <SearchPreview /> */}
    {/* <ButtonPreview /> */}
    
  </React.StrictMode>
);
