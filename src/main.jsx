import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

if (
  window.location.pathname === "/reich" ||
  window.location.pathname === "/reich/" ||
  window.location.pathname === "/stadler" ||
  window.location.pathname === "/stadler/"
) {
  window.location.replace(
    window.location.pathname + (window.location.pathname.endsWith("/") ? "" : "/") + "index.html"
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
