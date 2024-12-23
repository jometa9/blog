import Link from "next/link";

export default function HomeLinks() {
  return (
    <div className="homeLinksContainer">
      <h1 className="homeLinksTitle">jometa</h1>
      <div className="homeLinksLinkContainer">
        <a
          href="https://www.linkedin.com/in/joaquinmetayer"
          target="_blank"
          className="homeLinksLink"
        >
          LinkedIn
        </a>
        <a
          href="https://www.youtube.com/@jometayer"
          target="_blank"
          className="homeLinksLink"
        >
          YouTube
        </a>
        <a
          href="https://www.instagram.com/jometa_"
          target="_blank"
          className="homeLinksLink"
        >
          Instagram
        </a>
      </div>
      <div className="homeLinksLinkContainer">
        <Link href="#blog" className="homeLinksLink">
          Blog
        </Link>
        <a
          href="mailto:joaquinmetayer@gmail.com"
          target="_blank"
          className="homeLinksLink"
        >
          Email
        </a>
      </div>
      <div className="homeQuote">Living the journey.</div>
    </div>
  );
}
