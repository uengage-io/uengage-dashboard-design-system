import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

import ButtonPreview from "./Button";
import SidebarPreview from "./SidebarPreview";
import Preview from "./Badge";
// import TablePreview from "./table";
import AlertPreview from "./AlertDialogPreview";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <SidebarPreview/> */}
    <Preview/>
    {/* <ButtonPreview /> */}

    {/* <AlertPreview /> */}
  </React.StrictMode>,
);
