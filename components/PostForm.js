import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PostForm({ post = null, isEditMode = false }) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [visible, setVisible] = useState(post ? post.visible : true);
  const [quote, setQuote] = useState(post ? post.quote : false);
  const [content, setContent] = useState(post ? post.content : "");
  const [date, setDate] = useState(post ? post.date : "");
  const [useCustomDate, setUseCustomDate] = useState(false); // Boolean state for custom date
  const [youtubeId, setYoutubeId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isEditMode && post) {
      setTitle(post.title);
      setVisible(post.visible);
      setQuote(post.quote);
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

    const postDate =
      useCustomDate && date ? formatDate(date) : formatDate(new Date());
    const endpoint = isEditMode ? `/api/posts/${post.slug}` : "/api/posts";
    const method = isEditMode ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        visible,
        quote,
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
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </p>

      <p>
        Is quote:
        <select
          value={quote}
          onChange={(e) => setQuote(e.target.value === "true")}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </p>

      <p>
        Custom date:
        <select
          value={useCustomDate}
          onChange={(e) => setUseCustomDate(e.target.value === "true")}
        >
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
      </p>

      {useCustomDate && (
        <p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Select custom date"
          />
        </p>
      )}

      {!quote ? (
        <>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            placeholder="Content..."
          />
        </>
      ) : null}

      <hr />
      <p>
        <button className="adminButton" type="submit">
          {isEditMode ? "Update" : "Create"}
        </button>
      </p>
    </form>
  );
}
