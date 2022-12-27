import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store/store";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
