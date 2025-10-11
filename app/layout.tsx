import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ReactQueryProvider from "./ReactQueryProvider";
config.autoAddCss = false;

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
    <html
      suppressHydrationWarning
      lang="en"
      className={`${flandersArtSans.variable} antialiased`}
    >
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
