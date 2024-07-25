import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { getSession } from "@/lib/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dub OAuth App",
  description: "Example OAuth app for Dub",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar user={session?.user} />
        <div className="w-full">
          <div className="mx-auto min-h-screen w-full max-w-screen-md">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
