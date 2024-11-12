// In src/app/pages/admin/posts/create.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostForm from "components/PostForm";
import AdminLayout from "../../../../components/AdminLayout";

export default function CreatePost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hostname !== "localhost"
    ) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (slug) {
      const fetchPostData = async () => {
        const response = await fetch(`/api/posts/${slug}`);
        const data = await response.json();
        if (response.ok) {
          setPost(data.post);
        } else {
          console.error(data.message);
        }
        setLoading(false);
      };
      fetchPostData();
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;

  if (typeof window !== "undefined" && window.location.hostname !== "localhost")
    return null;
  
  return (
    <AdminLayout>
      <PostForm post={post} isEditMode={!!slug} />
    </AdminLayout>
  );
}
