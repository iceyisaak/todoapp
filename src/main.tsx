import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import { TodoContextProvider } from "./contexts/todo-context";

import "./styles/global-style.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>,
);
