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
        onClick={() =>
          sendGTMEvent({
            event: "Sign Up",
            customerExternalId: "3SDNAC0C2",
            customerName: "John Doe",
            customerEmail: "john@example.com",
            customerAvatar: "https://example.com/avatar.jpg",
          })
        }
        aria-label="Track lead event"
      >
        Track Leads
      </button>
      <button
        className="google-btn"
        onClick={() =>
          sendGTMEvent({
            event: "Purchase",
            customerExternalId: "3SDNAC0C2",
            amount: 1000, // in cents
          })
        }
        aria-label="Track sale event"
      >
        Track Sale
      </button>
    </div>
  );
}
