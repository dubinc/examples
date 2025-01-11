import { DubAnalytics } from "@/components/dub-analytics";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dub Clerk Demo",
  description: "Dub Conversions <-> Clerk Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-default`}
        >
          <div className="mx-auto w-full max-w-screen-md px-2.5 py-16">
            <div className="flex items-center justify-between py-4">
              <Link href="/">
                <Image
                  src="https://assets.dub.co/wordmark.svg"
                  alt="Dub Logo"
                  width={46}
                  height={24}
                  className="h-7 w-auto"
                />
              </Link>
              <div className="flex items-center gap-2">
                <SignedOut>
                  <SignInButton>
                    <button className="h-7 rounded-lg border border-black/10 bg-white px-2 text-sm font-medium text-black">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="h-7 rounded-lg border border-black bg-black px-2 text-sm font-medium text-white">
                      Sign up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
            <div className="mt-8">{children}</div>
          </div>
        </body>
        <DubAnalytics />
      </html>
    </ClerkProvider>
  );
}
