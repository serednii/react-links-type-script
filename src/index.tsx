import React from "react";
import ReactDOM from "react-dom/client";
import "reset-css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom"; // Додайте цей імпорт
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      {" "}
      {/* Обгорніть ваш додаток в Router */}
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
