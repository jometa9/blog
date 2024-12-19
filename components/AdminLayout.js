import Link from "next/link";
import { useRouter } from "next/router";
import "src/app/globals.css";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      router.push("/admin/login");
    }
  };

  const isLoginPage = router.pathname === "/admin/login";

  return (
    <>
      <Link href="/admin/posts">
        <h2>admin</h2>
      </Link>
      {!isLoginPage && (
        <div className="adminButtonContainer">
          <Link href="/admin/posts/create">
            <button className={"adminButton"}>New post</button>
          </Link>
          <button className={"adminButton"} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <hr className="hrAdminHero"/>
      <main>{children}</main>
    </>
  );
}
