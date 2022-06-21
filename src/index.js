import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WordleContextProvider from "./store/WordleContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WordleContextProvider>
      <App />
    </WordleContextProvider>
  </React.StrictMode>
);
