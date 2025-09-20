import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Workbox } from "workbox-window";
import { registerSW } from "./registerServiceWorker.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {registerSW()};
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");
  wb.register()
    .then(() => {
      console.log("Service Worker registered successfully.");
    })
    .catch((err) => {
      console.error("Service Worker registration failed:", err);
    });
}
