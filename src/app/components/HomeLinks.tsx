interface HomeLinksProps {
  totalPosts?: number;
}

export default function HomeLinks({ totalPosts = 0 }: HomeLinksProps) {
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
      </div>
      <p className="homeQuote">{totalPosts} posts</p>
    </div>
  );
}
