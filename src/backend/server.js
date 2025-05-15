import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";
import queryRouter from "./routes/queryRoutes.js";

const PORT = process.env.BACKEND_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRouter);
app.use("/queries", queryRouter);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server started. Listening to port ${PORT}`);
});
