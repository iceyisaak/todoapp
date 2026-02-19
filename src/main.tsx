import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/global-style.scss";

// const queryClient = new QueryClient();
import { TodoContextProvider } from "./reducers/store/todoStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoContextProvider>
      <Provider>
        <App />
      </Provider>
    </TodoContextProvider>
  </React.StrictMode>,
);
