import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Workbox } from "workbox-window";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");
  wb.register()
    .then(() => console.log("Service Worker registered."))
    .catch((err) => console.error("SW registration failed:", err));
}
