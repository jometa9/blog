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
      <p>Documenting the journey</p>
      <p>Find me on <a href="https://www.linkedin.com/in/joaquinmetayer/" target="_blank">LinkedIn</a> and  <a href="https://github.com/joaquinmetayer" target="_blank">GitHub</a></p>
      <p>Total posts: {posts.length}</p>
      <hr />
      <input
        placeholder="Search posts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p></p>
      <hr />
      {postPreviews}
    </>
  );
};

export default BlogHome;
