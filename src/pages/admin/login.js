import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "src/app/globals.css";
import AdminLayout from "../../../components/AdminLayout";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hostname !== "localhost"
    ) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/admin/posts");
    }
  };

  if (typeof window !== "undefined" && window.location.hostname !== "localhost")
    return null;

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          <button type="submit" className="adminButton">
            Login
          </button>
        </p>
      </form>
    </AdminLayout>
  );
}
