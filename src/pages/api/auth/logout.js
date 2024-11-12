import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({});
  }

  res.setHeader(
    "Set-Cookie",
    serialize("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
      path: "/",
    })
  );

  res.status(200).json({});
}
