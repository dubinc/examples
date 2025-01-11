import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics as DubAnalytics } from "@dub/analytics/react";

import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dub Conversions Demo",
  description:
    "Learn how to use Dub Conversions to track how your link clicks convert to signups and sales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
      </body>
      <DubAnalytics />
    </html>
  );
}
