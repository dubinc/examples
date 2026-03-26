import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

export const metadata = {
  title: "Dub GTM Example",
  description: "Minimal Next.js example for Dub GTM integration",
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <body>
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        {children}
      </body>
    </html>
  );
}
