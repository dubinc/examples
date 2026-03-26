import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dub GTM Example",
  description: "Minimal Next.js example for Dub GTM integration",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
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
