import React from "react";
import ReactDOM from "react-dom/client";
import "reset-css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./components/App";
import { MyProvider } from "./MyContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </React.StrictMode>
);
