import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { getSession } from "@/lib/actions";
import { Background } from "@dub/ui";
import { Toaster } from "sonner";

const satoshi = localFont({
  src: "./Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
  style: "normal",
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dub OAuth Flow Demo",
  description:
    "Learn how to use Dub OAuth Flow to seamlessly integrate Dub's link infrastructure into your app.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${inter.className} ${satoshi.variable}`}>
        <Toaster
          closeButton
          toastOptions={{
            // @ts-ignore
            classNames: {
              closeButton: "bg-white",
            },
          }}
        />
        <Background />
        <div className="relative z-10">
          <NavBar user={session?.user} />
          <div className="mx-auto flex flex-col items-center w-full max-w-screen-md">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
