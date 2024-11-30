import Link from "next/link";

export default function HomeDeveloper() {
  return (
    <>
      <h2>jometayer</h2>
      <ul>
        <li>
          <p>
            <a
              href="https://www.linkedin.com/in/joaquinmetayer"
              target="_blank"
            >
              LinkedIn
            </a>
          </p>
        </li>
        <li>
          <p>
            <a href="https://www.youtube.com/@jometayer" target="_blank">
              YouTube
            </a>
          </p>
        </li>
        <li>
          <p>
            <a href="https://www.instagram.com/jometayer" target="_blank">
              Instagram
            </a>
          </p>
        </li>
        <li>
          <p>
            <Link href="/blog" target="_blank">
              Blog
            </Link>
          </p>
        </li>
      </ul>
    </>
  );
}
