import getPostMetadata from "../../components/getPostMetadata";
import BlogHome from "./blog/BlogHome";
import HomeLinks from "./components/HomeLinks";
import './jometa.css'

export default function Home() {
  const { posts } = getPostMetadata();
  const totalPosts = posts.filter(post => post.visible).length;

  return (
    <>
      <HomeLinks totalPosts={totalPosts} />
      <BlogHome posts={posts} />
    </>
  );
}
