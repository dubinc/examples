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
      <p>
        Try the test forms:
        {" "}
        <a href="/signup">Signup</a>
        {" | "}
        <a href="/checkout">Checkout</a>
        {" | "}
        <a href="/thank-you?name=Test%20User&email=test@example.com">Thank You</a>
      </p>
    </main>
  );
}
