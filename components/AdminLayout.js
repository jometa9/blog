import Link from "next/link";
import { useRouter } from "next/router";
import "src/app/globals.css";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (response.ok) {
      router.push("/admin/login");
    }
  };

  const isLoginPage = router.pathname === "/admin/login";

  return (
    <>
      <Link href="/admin/posts">
        <h1>admin</h1>
      </Link>
      {!isLoginPage && (
        <>
          <Link href="/admin/posts/create" style={{ marginRight: "10px" }}>
            <button>N</button>
          </Link>
          <button onClick={handleLogout}>L</button>
        </>
      )}
      <main>{children}</main>
    </>
  );
}
