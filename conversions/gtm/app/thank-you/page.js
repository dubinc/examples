export default async function ThankYouPage({ searchParams }) {
  const params = await searchParams;
  const name = params?.name || "John";
  const email = params?.email || "john@example.com";

  return (
    <main>
      <h1>Thank You</h1>
      <p>This page is for testing Dub lead tracking on page view.</p>
      <p>
        Name: <strong>{name}</strong>
      </p>
      <p>
        Email: <strong>{email}</strong>
      </p>
      <p>
        If your GTM tag is configured for thank-you page tracking, this page
        visit should trigger <code>dubAnalytics.trackLead</code>.
      </p>
    </main>
  );
}
