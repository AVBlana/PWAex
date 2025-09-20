// very minimal; for production use Workbox for caching strategies
export function registerSW() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        await navigator.serviceWorker.register("/sw.js");
        console.log("SW registered");
      } catch (err) {
        console.error("SW reg failed", err);
      }
    });
  }
}
