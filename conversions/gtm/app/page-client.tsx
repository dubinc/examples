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
      }}
    >
      <button
        className="google-btn"
        onClick={() =>
          sendGTMEvent({
            event: "dub_conversion",
            customerExternalId: "3SDNAC0C1",
            eventName: "Sign Up",
            customerName: "John Doe",
            customerEmail: "john@example.com",
            customerAvatar: "https://example.com/avatar.jpg",
            eventQuantity: 1,
          })
        }
        aria-label="Send Google Tag Manager event"
      >
        Send Event
      </button>
    </div>
  );
}
