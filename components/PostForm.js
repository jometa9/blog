import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PostForm({ post = null, isEditMode = false }) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [visible, setVisible] = useState(post ? post.visible : true);
  const [content, setContent] = useState(post ? post.content : "");
  const [date, setDate] = useState(post ? post.date : "");
  const [youtubeId, setYoutubeId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isEditMode && post) {
      setTitle(post.title);
      setVisible(post.visible);
      setContent(post.content);
      setDate(post.date);
    }
  }, [post, isEditMode]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalContent = content;
    if (youtubeId) {
      finalContent = `<iframe src="https://www.youtube.com/embed/${youtubeId}" allowfullscreen></iframe>\n\n${content}`;
    }

    const postDate = formatDate(new Date());
    const endpoint = isEditMode ? `/api/posts/${post.slug}` : "/api/posts";
    const method = isEditMode ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        visible,
        content: finalContent,
        date: postDate,
      }),
    });

    if (response.ok) {
      router.push("/admin/posts");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title..."
        />
      </p>

      <p>
        <input
          type="text"
          value={youtubeId}
          onChange={(e) => setYoutubeId(e.target.value)}
          placeholder="YouTube video ID"
        />
      </p>

      <p>
        Is visible:
        <select
          value={visible}
          onChange={(e) => setVisible(e.target.value === "true")}
          style={{ marginLeft: "10px" }}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </p>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
        placeholder="Content..."
      />
      <p>
        <button type="submit">{isEditMode ? "Update" : "Create"}</button>
      </p>
    </form>
  );
}
