import "./globals.css";
import type { Metadata } from "next";
import 'highlight.js/styles/github.css';
import Home from "./page";

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
        {children}
      </body>
    </html>
  );
}
