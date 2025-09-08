import React from "react";
import ReactDOM from "react-dom/client";
import "./vendor";
import App from "./App";
import { setupIonicReact } from "@ionic/react";

// Initialize Ionic
setupIonicReact();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
