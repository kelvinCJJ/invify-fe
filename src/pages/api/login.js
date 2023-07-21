import { serialize } from "cookie";

export default async function handler(req, res) {
  const { username, password } = req.body;
  res.setHeader("Set-Cookie", serialised);

  res.status(200).json({ message: "Success!" });
  return res;
}
