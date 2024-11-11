"use client";
import { useState } from "react";
import { PostMetadata } from "../../../components/PostMetadata";
import PostPreview from "../../../components/PostPreview";

interface SearchablePostsProps {
  posts: PostMetadata[];
}

const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const BlogHome: React.FC<SearchablePostsProps> = ({ posts = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const today = new Date();

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((post) => {
      const postDate = parseDate(post.date);
      return postDate <= today;
    })
    .filter((post) => post.visible);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const postPreviews = filteredPosts.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <>
      <p>Status: Working, no writing.</p>
      <p>
        This website is a raw document and archive about the journey since 2022
        with {postPreviews.length} posts.
      </p>
      <p>
        Find more on{" "}
        <a href="https://www.linkedin.com/in/joaquinmetayer/" target="_blank">
          LinkedIn
        </a>{" "}
        or{" "}
        <a href="https://www.instagram.com/joaquinmetayer/" target="_blank">
          Instagram
        </a>
        .
      </p>
      <hr />
      <input
        type="text"
        placeholder="Search post..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <hr />
      {postPreviews}
    </>
  );
};

export default BlogHome;
