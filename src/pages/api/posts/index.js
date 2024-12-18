import fs from "fs";
import path from "path";
import matter from "gray-matter";
import getPostMetadata from "components/getPostMetadata";
import corsMiddleware from "src/utils/cors";

const generateUniqueFileName = (dateStr, existingFiles) => {
  let fileName = `${dateStr}.md`;
  let counter = 1;

  while (existingFiles.includes(fileName)) {
    fileName = `${dateStr}${counter}.md`;
    counter++;
  }

  return fileName;
};

export default async function handler(req, res) {
  // Ejecuta el middleware de CORS
  await corsMiddleware(req, res);

  if (req.method === "GET") {
    const { posts, lastPostDate } = getPostMetadata();
    res.status(200).json({ posts, lastPostDate });
  } else if (req.method === "POST") {
    const { title, visible, quote, content } = req.body;
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const dateStr = `${day}${month}${year}`;
    const folderPath = path.join(process.cwd(), "posts");
    const existingFiles = fs.readdirSync(folderPath);
    const fileName = generateUniqueFileName(dateStr, existingFiles);
    const postData = {
      title,
      date: `${day}-${month}-${year}`,
      visible,
      quote,
      slug: fileName.replace(".md", ""),
    };
    const matterData = matter.stringify(content, postData);
    fs.writeFileSync(path.join(folderPath, fileName), matterData);
    res.status(201).json({ message: "Success", slug: postData.slug });
  } else {
    res.status(405).json({});
  }
}
