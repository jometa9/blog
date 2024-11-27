import getPostMetadata from "../../../components/getPostMetadata";
import BlogHome from "./BlogHome";

export default function Home() {
  const { posts } = getPostMetadata();

  return <BlogHome posts={posts} />;
}
