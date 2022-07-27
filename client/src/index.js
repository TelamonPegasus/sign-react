import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";

import { AuthProvider } from "context/AuthProvider";
import { PopupProvider } from "context/PopupProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <PopupProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </PopupProvider>
    </Router>
  </React.StrictMode>
);
