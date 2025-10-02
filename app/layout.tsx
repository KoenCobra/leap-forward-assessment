import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const flandersArtSans = localFont({
  src: "./fonts/FlandersArtSans-Regular.woff",
  variable: "--font-flanders-art-sans",
});

export const metadata: Metadata = {
  title: "Leap Forward Assessment",
  description: "Leap Forward Assessment by Koen De Groot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${flandersArtSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
