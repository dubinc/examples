type SearchParams = Record<string, string | string[] | undefined>;

type ThankYouPageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const name = typeof params?.name === "string" ? params.name : "John";
  const email = typeof params?.email === "string" ? params.email : "john@example.com";

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
