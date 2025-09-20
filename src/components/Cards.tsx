import styled from "@emotion/styled";
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  padding: 24px;
`;
const Card = styled.a`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
`;

export default function Cards({
  items,
}: {
  items: { title: string; path: string }[];
}) {
  return (
    <Grid>
      {items.map((it) => (
        <Card key={it.path} href={it.path}>
          <h3>{it.title}</h3>
        </Card>
      ))}
    </Grid>
  );
}
