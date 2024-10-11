import Link from "next/link";

export default function Hero() {
  return (
    <>
      <h1>
        <Link href="/">JOAQUIN METAYER</Link>
      </h1>
      <div className="hero">
        <div className="links">
          <a href="https://www.linkedin.com/in/joaquinmetayer/" target="_blank">
            LinkedIn
          </a>
          <a target="_blank" href="https://www.youtube.com/@joaquinmetayer">
            YouTube
          </a>
          <a target="_blank" href="https://github.com/joaquinmetayer/">
            GitHub
          </a>
          <a target="_blank" href="mailto:joaquinmetayer@gmail.com">
            Email
          </a>
        </div>
        <hr />
      </div>
    </>
  );
}
