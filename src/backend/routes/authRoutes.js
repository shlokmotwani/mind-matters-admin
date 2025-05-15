import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import { verifyCredentials } from "../middleware/authMiddleware.js";

const authRouter = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

authRouter.post("/", verifyCredentials, (req, res) => {
  const user = {
    email: req.body.email,
  };
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
  return res.send({ token });
});

export default authRouter;
