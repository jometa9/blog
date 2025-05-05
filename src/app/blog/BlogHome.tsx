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
  const [expandedYears, setExpandedYears] = useState<{[key: string]: boolean}>({});
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

  // Toggle para expandir/colapsar un año
  const toggleYear = (year: string) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  // Inicializar todos los años como expandidos si expandedYears está vacío
  if (Object.keys(expandedYears).length === 0 && years.length > 0) {
    const initialState: {[key: string]: boolean} = {};
    const currentYear = new Date().getFullYear().toString();
    
    years.forEach(year => {
      initialState[year] = year === currentYear; // Solo expandir el año actual
    });
    setExpandedYears(initialState);
  }

  return (
    <span id="blog">
      <hr />
      {years.map(year => (
        <div key={year} className="year-section">
          <div 
            className="year-header" 
            onClick={() => toggleYear(year)}
            style={{ cursor: 'pointer' }}
          >
            <p style={{textAlign: 'center'}}>{year} - {postsByYear[year].length} posts{" "}
              - {expandedYears[year] ? 'hide' : 'show'}
              </p>
          </div>
          {expandedYears[year] && (
            <div className="year-posts">
              <hr />
              {postsByYear[year].map(post => (
                <PostPreview key={post.slug} {...post} />
              ))}
            </div>
          )}
      <hr />

        </div>
      ))}
    </span>
  );
};

export default BlogHome;
