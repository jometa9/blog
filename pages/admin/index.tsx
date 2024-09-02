import React, { useState, useEffect } from "react";
import "./admin.css";
import AdminLayout from "./components/Layout";
import CreatePost from "./components/CreatePost";
import DeletePost from "./components/DeletePost";

const Admin: React.FC = () => {
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setIsLocal(
      typeof window !== "undefined" &&
        window.location.href.startsWith("http://localhost")
    );
  }, []);

  return (
    <>
      <AdminLayout>
        {isLocal ? (
          <>
            <CreatePost />
            <DeletePost />
          </>
        ) : (
          <p>administrator panel only in localhost</p>
        )}
      </AdminLayout>
    </>
  );
};

export default Admin;
