"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <h1>Checkout</h1>
      <p>Use this page to test Dub sale tracking via GTM form submission.</p>

      <form
        id="checkout-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <label htmlFor="customer_id">Customer ID</label>
          <br />
          <input id="customer_id" name="customer_id" type="text" required />
        </div>

        <div style={{ marginTop: 12 }}>
          <label htmlFor="amount">Amount (in cents)</label>
          <br />
          <input id="amount" name="amount" type="number" min="1" required />
        </div>

        <div style={{ marginTop: 12 }}>
          <label htmlFor="invoice_id">Invoice ID</label>
          <br />
          <input id="invoice_id" name="invoice_id" type="text" />
        </div>

        <button type="submit" style={{ marginTop: 12 }}>
          Submit Checkout
        </button>
      </form>

      {submitted ? <p>Submitted. Check GTM Preview and Dub events.</p> : null}
    </main>
  );
}
