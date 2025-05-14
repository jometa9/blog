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

const getYearFromDate = (dateString: string) => {
  return dateString.split("-")[2];
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

  // Agrupar posts por año
  const postsByYear: {[key: string]: PostMetadata[]} = {};
  filteredPosts.forEach(post => {
    const year = getYearFromDate(post.date);
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  // Ordenar años en orden descendente
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <span id="blog">
      <hr />
      {years.map(year => (
        <div key={year} className="year-section">
          <div className="year-header">
            <p style={{textAlign: 'center'}}>{year} - {postsByYear[year].length} posts</p>
          </div>
          <div className="year-posts">
            <hr />
            {postsByYear[year].map(post => (
              <PostPreview key={post.slug} {...post} />
            ))}
          </div>
          <hr />
        </div>
      ))}
    </span>
  );
};

export default BlogHome;
