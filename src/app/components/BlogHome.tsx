"use client";
import { useState } from "react";
import { PostMetadata } from "../../../components/PostMetadata";
import PostPreview from "../../../components/PostPreview";

interface SearchablePostsProps {
  posts: PostMetadata[];
}

const BlogHome: React.FC<SearchablePostsProps> = ({ posts = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const postPreviews = filteredPosts.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <>
      <p>
        <a href="https://www.linkedin.com/in/joaquinmetayer/" target="_blank">
          LinkedIn
        </a>{" "}
        <a target="_blank" href="https://github.com/joaquinmetayer/">
          GitHub
        </a>{" "}
        <a target="_blank" href="mailto:joaquinmetayer@gmail.com">
          Email
        </a>
      </p>
      <p>Total posts: {posts.length}</p>
      <input
        placeholder="Search posts here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {postPreviews}
    </>
  );
};

export default BlogHome;
