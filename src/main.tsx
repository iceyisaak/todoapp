import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";

import "./styles/global-style.scss";

import { TodoContextProvider } from "./reducers/stores/todoStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>,
);
