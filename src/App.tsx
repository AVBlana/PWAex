import { useEffect, useState } from "react";
import { fetchPage } from "./api/cms";
import ContentMapper from "./components/ContentMapper";
import CookieConsent from "./components/CookieConsent";
import { SearchUsers } from "./components/SearchUsers";
import { PaginatedUsers } from "./components/PaginatedUsers";

function App() {
  const [page, setPage] = useState<any>(null);
  useEffect(() => {
    fetchPage("home").then(setPage).catch(console.error);
  }, []);

  return (
    <div>
      <SearchUsers />
      <PaginatedUsers />
      {page ? <ContentMapper regions={page.regions} /> : <p>Loading...</p>}
      <CookieConsent />
    </div>
  );
}

export default App;
