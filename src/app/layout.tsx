import "./globals.css";
import type { Metadata } from "next";
import Hero from "./components/Hero";
import 'highlight.js/styles/github.css';

export const metadata: Metadata = {
  title: "jometayer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <Hero/>
        {children}
      </body>
    </html>
  );
}
