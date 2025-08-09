"use client";

import { sendGTMEvent } from "@next/third-parties/google";

export function PageClient() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <button
        className="google-btn"
        onClick={() => {
          sendGTMEvent({
            event: "Sign Up",
            customerExternalId: "1bc8c4f8a85096e5b040ae15d0a279e3",
          });
          window.alert("Lead tracked");
        }}
        aria-label="Track lead event"
      >
        Track Lead
      </button>
      <button
        className="google-btn"
        onClick={() => {
          sendGTMEvent({
            event: "Purchase",
            customerExternalId: "1bc8c4f8a85096e5b040ae15d0a279e3",
            amount: 1000, // in cents
          });
          window.alert("Sale tracked");
        }}
        aria-label="Track sale event"
      >
        Track Sale
      </button>
    </div>
  );
}
