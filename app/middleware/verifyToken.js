import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acces denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}
