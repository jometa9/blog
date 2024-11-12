import fs from "fs";
import path from "path";
import matter from "gray-matter";
import corsMiddleware from "src/utils/cors";

export default async function handler(req, res) {
  // Ejecuta el middleware de CORS
  await corsMiddleware(req, res);

  const { slug } = req.query;
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({});
  }

  if (req.method === "DELETE") {
    try {
      fs.unlinkSync(filePath);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  } else if (req.method === "GET") {
    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      res.status(200).json({ post: { ...data, content } });
    } catch (error) {
      res.status(500).json({});
    }
  } else if (req.method === "PUT") {
    const { title, visible, content, date } = req.body;

    try {
      const { data } = matter.read(filePath);
      const updatedData = { ...data, title, visible, date };
      const updatedContent = matter.stringify(content, updatedData);

      fs.writeFileSync(filePath, updatedContent, "utf8");
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({});
    }
  } else {
    res.status(405).json({});
  }
}
