import Link from "next/link";
import { useRouter } from "next/router";

const titleStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default function AdminPostPreview({
  post,
  onToggleVisibility,
  onDelete,
}) {
  const router = useRouter();

  const handleVisibilityToggle = async () => {
    try {
      const response = await fetch(`/api/posts/${post.slug}/toggleVisibility`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        await onToggleVisibility(post.slug, data.visible);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Shure?")) {
      try {
        const response = await fetch(`/api/posts/${post.slug}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          onDelete(post.slug);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        router.reload();
      }
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p style={{ flex: 1, ...titleStyle }}>
        <Link href={`/blog/posts/${post.slug}`}>{post.title}</Link>
      </p>
      <div style={{ marginLeft: "10px" }}>
        <button onClick={handleVisibilityToggle} style={{ marginLeft: "10px" }}>
          {post.visible ? "H" : "S"}
        </button>
        <Link
          href={`/admin/posts/create?slug=${post.slug}`}
          style={{ marginLeft: "10px" }}
        >
          <button>E</button>
        </Link>
        <button
          onClick={handleDelete}
          style={{ marginLeft: "10px", color: "red" }}
        >
          D
        </button>
      </div>
    </div>
  );
}
