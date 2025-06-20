import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics as DubAnalytics } from "@dub/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cal.com + Dub Conversion Tracking Demo",
  description:
    "With Dub Conversions, you can now track how your link clicks convert to meeting bookings on Cal.com.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DubAnalytics
          domainsConfig={{
            outbound: ["app.cal.com", "cal.com"],
          }}
        />
        {children}
      </body>
    </html>
  );
}
