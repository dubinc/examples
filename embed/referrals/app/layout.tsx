import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics as DubAnalytics } from "@dub/analytics/react";
import { DubWordmark } from "./dashboard/dub-wordmark";
import { GithubLogo } from "./dashboard/github-logo";

const inter = Inter({ subsets: ["latin"] });
const satoshi = localFont({
  src: "./Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

const title = "Acme, Inc. | Dub Embedded Referral Dashboard Demo";
const description =
  "Acme, Inc. is a demo application for Dub's Embedded Referral Dashboard feature.";
const image = "https://assets.dub.co/misc/acme-referrals-embed-og.png";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${satoshi.variable}`}>
        <DubAnalytics
          domainsConfig={{
            refer: "getacme.link",
          }}
        />
        <div className="flex flex-col min-h-screen">
          <div className="h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <DubWordmark className="h-6" />
              <div
                role="presentation"
                className="h-3 w-0.5 bg-foreground/10 hidden sm:block"
              />
              <span className="text-foreground/60 font-bold font-display hidden sm:block">
                Embedded Referral Dashboard Demo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://git.new/referrals"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 h-8 font-medium border text-foreground/80 border-foreground/20 rounded-lg text-sm hover:bg-foreground/[0.02] transition-colors duration-150"
              >
                <GithubLogo className="w-4 h-4" /> Source code
              </a>
              <a
                href="https://dub.co/docs/partners/embedded-referrals"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 h-8 font-medium border text-background border-background/20 bg-foreground rounded-lg text-sm hover:bg-foreground/90 transition-colors duration-150"
              >
                Read the docs
              </a>
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
