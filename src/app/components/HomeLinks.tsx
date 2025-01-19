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
          href="https://www.cf3funded.com"
          target="_blank"
          className="homeLinksLink"
        >
          CF3
        </a>
        <a
          href="https://www.instagram.com/jometa_"
          target="_blank"
          className="homeLinksLink"
        >
          Instagram
        </a>
        {/*
        <a
          href="https://x.com/_jometa"
          target="_blank"
          className="homeLinksLink"
        >
          Twitter
        </a>
        */}
      </div>
    </div>
  );
}
