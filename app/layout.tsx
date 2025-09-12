import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Countrys challenge",
  description: "By Dantas",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nunitoSans.className}>
      <body className={`${nunitoSans.variable} antialiased`}>
        <main className="bg-gray-100 text-black min-h-screen flex flex-col items-center">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}