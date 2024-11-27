import Link from "next/link";

export default function HomeDeveloper() {
  return (
    <>
      <img
        src="/images/IMG_4718.png"
        alt="laptop"
        style={{ marginTop: "10px", maxWidth: "300px" }}
      />
      <h2>Joaquin Metayer</h2>
      <p>ReactJS Developer building for the internet.</p>
      <p>Minimalism as a philosophy, simplicity as a style.</p>
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
            <Link href="/blog" target="_blank">
              Blog
            </Link>
          </p>
        </li>
      </ul>
    </>
  );
}
