import getPostMetadata from "../../components/getPostMetadata";
import BlogHome from "./blog/BlogHome";
import HomeLinks from "./components/HomeLinks";

export default function Home() {
  const { posts } = getPostMetadata();

  return (
    <>
      <HomeLinks />
      <BlogHome posts={posts} />
    </>
  );
}
