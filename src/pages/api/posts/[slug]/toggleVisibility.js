import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { slug } = req.query;
    try {
      const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      data.visible = !data.visible;
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, updatedContent, "utf8");
      res.status(200).json({ success: true, visible: data.visible });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({});
  }
}
