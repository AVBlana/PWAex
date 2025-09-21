import Hero from "./Hero";
import Cards from "./Cards";

type Region = { type: string; data: any };

export default function ContentMapper({ regions }: { regions: Region[] }) {
  return (
    <>
      {regions.map((r, i) => {
        switch (r.type) {
          case "hero":
            return <Hero key={i} {...r.data} />;
          case "cards":
            return <Cards key={i} items={r.data} />;
          default:
            return null;
        }
      })}
    </>
  );
}
