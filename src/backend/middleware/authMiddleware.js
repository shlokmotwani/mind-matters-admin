import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export function verifyToken(req, res, next) {
  const bearer = req.headers["authorization"];
  if (!bearer || !bearer.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ error: "Unauthorized access: No token provided" });
  }

  const token = bearer.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ error: `Invalid or expired token. ${err}`});
    }
    req.user = data;
    next();
  });
}

export function verifyCredentials(req, res, next) {
  //TODO: User authentication
  if (req.body.email !== "admin@gmail.com" || req.body.password !== "admin") {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  next();
}
