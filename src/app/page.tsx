import Link from "next/link";
import getPostMetadata from "../../components/getPostMetadata";
import SearchablePosts from "./components/SearchablePosts";

export default function Home() {
  const { posts, lastPostDate } = getPostMetadata();

  return <SearchablePosts posts={posts} />;
}
