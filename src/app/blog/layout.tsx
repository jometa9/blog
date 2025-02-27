import Hero from "../components/Hero";
import '../jometa.css'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Hero />
      <main>{children}</main>
    </div>
  );
}