import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addQuery, fetchQueries } from "../db/queryDB.js";

const queryRouter = express.Router();

queryRouter.get("/", verifyToken, async (req, res) => {
  try {
    const queries = await fetchQueries();
    res.send(queries);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch queries : ${error}` });
  }
});

queryRouter.post("/", async (req, res) => {
  try {
    const query = {
      fullName: req.body.fullName,
      email: req.body.email,
      contact: req.body.contact,
      message: req.body.message,
    };
    const response = await addQuery(query);
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: `Failed to save query. ${error}` });
  }
});

export default queryRouter;
