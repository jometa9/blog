import Link from "next/link";

export default function HomeLinks() {
  return (
    <div className="homeLinksContainer">
      <h1 className="homeLinksTitle">jometa</h1>
      <div className="homeLinksLinkContainer">
        <a
          href="https://www.cf3funded.com"
          target="_blank"
          className="homeLinksLink"
        >
          CF3
        </a>
        <a
          href="https://www.instagram.com/cf3dev"
          target="_blank"
          className="homeLinksLink"
        >
          @CF3Dev
        </a>
        <a
          href="https://www.instagram.com/jometa_"
          target="_blank"
          className="homeLinksLink"
        >
          @jometa_
        </a>
        <a
          href="https://github.com/jometa9"
          target="_blank"
          className="homeLinksLink"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/joaquinmetayer"
          target="_blank"
          className="homeLinksLink"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
