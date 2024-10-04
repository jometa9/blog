import "./globals.css";
import type { Metadata } from "next";
import Hero from "./components/Hero";
import 'highlight.js/styles/github.css';

export const metadata: Metadata = {
  title: "JOAQUIN METAYER",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="es">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <Hero/>
        {children}
      </body>
    </html>
  );
}
