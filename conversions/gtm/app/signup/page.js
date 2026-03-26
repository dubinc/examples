"use client";

export default function SignupPage() {
  return (
    <main>
      <h1>Signup</h1>
      <p>Use this page to test Dub lead tracking via GTM form submission.</p>

      <form
        id="signup-form"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const name = (formData.get("name") || "").toString().trim();
          const email = (formData.get("email") || "").toString().trim();
          const params = new URLSearchParams({ name, email });

          // Force a full page load so GTM Page View tags fire reliably.
          window.location.assign(`/thank-you?${params.toString()}`);
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input id="name" name="name" type="text" value="" required />
        </div>

        <div style={{ marginTop: 12 }}>
          <label htmlFor="email">Email</label>
          <br />
          <input id="email" name="email" type="email" value="" required />
        </div>

        <button type="submit" style={{ marginTop: 12 }}>
          Submit Signup
        </button>
      </form>
    </main>
  );
}
