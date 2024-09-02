import "./globals.css";
import type { Metadata } from "next";
import Hero from "./components/Hero";
import 'highlight.js/styles/github.css';

export const metadata: Metadata = {
  title: "Joaquin Metayer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="es">
      <body>
        <Hero/>
        {children}
      </body>
    </html>
  );
}
