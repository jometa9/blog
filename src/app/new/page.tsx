"use client";
import React, { useEffect } from "react";

export default function YT() {
  useEffect(() => {
    window.location.href = "https://github.com/jometa9/blog/issues/new/choose";
  }, []);
  return (
    <div className="centerLoading">
      <h3>Cargando...</h3>
    </div>
  );
}
