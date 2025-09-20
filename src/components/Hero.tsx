import styled from "@emotion/styled";

const HeroWrap = styled.section`
  padding: 48px 24px;
  text-align: center;
`;

export default function Hero({
  headline,
  image,
}: {
  headline: string;
  image?: string;
}) {
  return (
    <HeroWrap>
      <h1>{headline}</h1>
      {image && (
        <img src={image} alt="" style={{ maxWidth: "100%", height: "auto" }} />
      )}
    </HeroWrap>
  );
}
