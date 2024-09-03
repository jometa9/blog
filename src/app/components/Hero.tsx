import Link from "next/link";
import getPostMetadata from "../../../components/getPostMetadata";

export default function Hero() {
  const { posts } = getPostMetadata();

  return (
    <>
      <h2>
        <Link href="/">Joaquin Metayer</Link>
      </h2>
    </>
  );
}
