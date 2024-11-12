import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import AdminPostPreview from "../../../components/AdminPostPreview";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const handleToggleVisibility = (slug, newVisibility) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.slug === slug ? { ...post, visible: newVisibility } : post
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <p>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "100%" }}
        />
      </p>
      <hr />
      <div>
        {filteredPosts.map((post) => (
          <AdminPostPreview
            key={post.id}
            post={post}
            onToggleVisibility={handleToggleVisibility}
          />
        ))}
      </div>
    </AdminLayout>
  );
}
