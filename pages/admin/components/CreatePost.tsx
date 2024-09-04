"use client";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";

interface ImageFile {
  name: string;
  file: File;
}

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [publishDate, setPublishDate] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileList = Array.from(e.target.files);
    const selectedImages: ImageFile[] = fileList
      .filter((file) => /\.(png|jpe?g)$/i.test(file.name))
      .filter((file) => {
        if (/\s/.test(file.name)) {
          setMessage(`There are images with spaces in their name`);
          return false;
        }
        return true;
      })
      .map((file) => ({
        name: file.name,
        file: file,
      }));

    setImages(selectedImages);
  };

  const handleClearImages = () => {
    setImages([]);
  };

  const handleCopyToClipboard = (imageName: string) => {
    navigator.clipboard.writeText(imageName);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (images.length > 0) {
        const imageFormData = new FormData();
        images.forEach((image) => {
          imageFormData.append("images", image.file, image.name);
        });

        const uploadResponse = await axios.post("/api/upload", imageFormData);
        if (uploadResponse.status !== 200) {
          throw new Error("Error uploading images");
        }
      }

      let modifiedContent = content;
      const regex = /(\b[\w-]+\.(png|jpe?g)\b)/g;
      const matches = modifiedContent.match(regex);

      if (matches) {
        matches.forEach((match) => {
          const imageExists = images.find((image) => image.name === match);
          if (imageExists) {
            modifiedContent = modifiedContent.replace(
              new RegExp(`\\b${match}\\b`, "g"),
              `<a href="/blog/images/${match}" target="_blank"><img src="/blog/images/${match}" alt="${match}" /></a>`
            );
          }
        });
      }

      if (videoId) {
        modifiedContent = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>\n${modifiedContent}`;
      }

      const currentDate = new Date();
      const formattedDate = publishDate
        ? publishDate.split("-").reverse().join("-")
        : `${String(currentDate.getDate()).padStart(2, "0")}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}-${currentDate.getFullYear()}`;

      const baseFilename = formattedDate.replace(/-/g, "");
      const checkFilenameResponse = await axios.post("/api/check-filename", {
        filename: baseFilename,
      });
      const { newFilename } = checkFilenameResponse.data;
      const formData = new FormData();

      formData.append("filename", newFilename);
      formData.append("title", title);
      formData.append("date", formattedDate);
      formData.append("content", modifiedContent);

      await axios.post("/api/markdown", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage("Post created successfully");
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Error creating post");
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <>
      <p>
        <input
          type="text"
          placeholder="New post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
      </p>
      <p>
        <button>
          <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
            Select images
          </label>
        </button>
        <input
          type="file"
          id="imageUpload"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
          disabled={isLoading}
        />
      </p>
      {images.length > 0 && (
        <div>
          {images.map((image, index) => (
            <p key={index}>
              <span
                onClick={() => handleCopyToClipboard(image.name)}
                style={{ cursor: "pointer" }}
              >
                {image.name}
              </span>
            </p>
          ))}
          <button onClick={handleClearImages} disabled={isLoading}>
            Clear images
          </button>
        </div>
      )}
      <p></p>
      <textarea
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
      />
      <p>
        <input
          type="text"
          placeholder="YouTube video ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          disabled={isLoading}
        />
      </p>
      <p>
        <input
          type="date"
          placeholder="Publish date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          disabled={isLoading}
        />
      </p>
      <p>
        <button onClick={handleSave} disabled={isLoading}>
          Publish
        </button>
      </p>
      {message.length > 0 && <p> {message}</p>}
    </>
  );
}
