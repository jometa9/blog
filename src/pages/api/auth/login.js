import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({});
  }
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = process.env.TOKEN_SESSION;
    res.setHeader(
      "Set-Cookie",
      serialize("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
      })
    );
    return res.status(200).json({});
  } else {
    return res.status(401).json({});
  }
}
