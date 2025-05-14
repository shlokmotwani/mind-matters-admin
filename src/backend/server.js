import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { addQuery, fetchQueries } from "./db/queryDB.js";

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.BACKEND_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/login", (req, res) => {
  if (userIsAdmin) {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const token = jwt.sign(user, SECRET_KEY);
    return res.send({ token });
  } else {
    res.status(401).end();
  }
});

app.get("/queries", verifyUser, async (req, res) => {
  const queries = await fetchQueries();
  res.send(queries);
});

app.post("/query", async (req, res) => {
  const query = {
    fullName: req.body.fullName,
    email: req.body.email,
    contact: req.body.contact,
    message: req.body.message,
  };
  const response = await addQuery(query);
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server started. Listening to port ${PORT}`);
});

function verifyUser(req, res, next) {
  const bearer = req.headers["authorization"];
  const token = bearer.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    next();
  });
}

function userIsAdmin(req) {
  //TODO: User authentication
  return req.body.email === "admin@gmail.com" && req.body.password === "admin";
}
