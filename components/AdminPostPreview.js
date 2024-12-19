import Link from "next/link";
import { useRouter } from "next/router";

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
          "Content-Type": "application/json",
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
            "Content-Type": "application/json",
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
    <div className="adminPostPreviewContainer">
      <p>
        <Link href={`/blog/posts/${post.slug}`}>{post.title}</Link>
      </p>
      <div className="adminButtonContainer">
        <button className="adminButton" onClick={handleVisibilityToggle}>
          {post.visible ? "Hide" : "Show"}
        </button>
        <Link href={`/admin/posts/create?slug=${post.slug}`}>
          <button className="adminButton">Edit</button>
        </Link>
        <button className="adminButton" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
