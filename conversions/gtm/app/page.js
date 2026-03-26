export default function HomePage() {
  return (
    <main>
      <h1>Dub + GTM Example</h1>
      <p>
        This app loads Google Tag Manager. Add the Dub Custom HTML tag in GTM
        to install Dub conversion tracking.
      </p>
      <p>
        Set <code>NEXT_PUBLIC_GTM_ID</code> (for example <code>GTM-XXXXXXX</code>)
        before starting the app.
      </p>
      <p>How to test:</p>
      <p>
        1. Visit the short link{" "}
        <a href="https://getacme.link/gtm">https://getacme.link/gtm</a>.
      </p>
      <p>2. Then try out any of the items below.</p>
      <h2>Test variants</h2>
      <p>
        <a href="/signup">Signup</a> - Lead tracking via form submission flow.
      </p>
      <p>
        <a href="/checkout">Checkout</a> - Sale tracking via checkout form flow.
      </p>
      <p>
        <a href="/thank-you?name=Test%20User&email=test@example.com">Thank You</a>{" "}
        - Lead tracking via thank-you page query parameters.
      </p>
    </main>
  );
}
