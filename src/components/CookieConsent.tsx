import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getConsent, saveConsent } from "../utils/consent";
import { loadAnalyticsIfAllowed } from "../utils/analytics";

const Banner = styled.div`
  position: fixed;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background: white;
  color: black;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

export default function CookieConsent() {
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const c = getConsent();
    setAccepted(c);
    if (c) loadAnalyticsIfAllowed();
  }, []);

  if (accepted) return null;

  const accept = () => {
    saveConsent(true);
    setAccepted(true);
    loadAnalyticsIfAllowed();
  };

  const decline = () => {
    saveConsent(false);
    setAccepted(false);
  };

  if (accepted === null) return null; // still deciding

  return (
    <Banner>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "black",
        }}
      >
        <div>We use analytics to improve the site. Accept tracking?</div>
        <div>
          <button onClick={decline}>Decline</button>
          <button onClick={accept} style={{ marginLeft: 8 }}>
            Accept
          </button>
        </div>
      </div>
    </Banner>
  );
}
