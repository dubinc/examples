import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics as DubAnalytics } from "@dub/analytics/react";

const inter = Inter({ subsets: ["latin"] });

const title = "Acme, Inc. | Dub Partners Referral Embed Demo";
const description =
  "Acme, Inc. is a demo application for Dub Partners' Whitelabeled Referrals Embed feature.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: "https://assets.dub.co/misc/acme-referrals-embed-og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://assets.dub.co/misc/acme-referrals-embed-og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DubAnalytics
          domainsConfig={{
            refer: "getacme.link",
          }}
        />
        {children}
      </body>
    </html>
  );
}
