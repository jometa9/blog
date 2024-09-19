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
      <p>Hey there! 👋 I'm Joaquin Metayer,</p>
      <p>
        <b>React developer</b> sharing the journey.
      </p>
      <p>Now, focusing on AWS Cloud.</p>
      <p>
        Creating on{" "}
        <a target="_blank" href="https://github.com/joaquinmetayer/">
          GitHub
        </a>{" "}
        and working at{" "}
        <a target="_blank" href="https://www.instagram.com/bitlogic.io/">
          @bitlogic.io
        </a>
        .
      </p>
      <p>
        Find me on{" "}
        <a href="https://www.linkedin.com/in/joaquinmetayer/" target="_blank">
          LinkedIn
        </a>{" "}
        or{" "}
        <a target="_blank" href="mailto:joaquinmetayer@gmail.com">
          email
        </a>
        .
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
