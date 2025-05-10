import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const SECRET_KEY = "mind-matters";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.BACKEND_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/login", (req, res) => {
  //TODO: User authentication
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  if (req.body.email === "admin@gmail.com" && req.body.password === "admin") {
    const token = jwt.sign(user, SECRET_KEY);
    res.send({ token });
  } else {
    res.status(401).end();
  }
});

app.get("/queries", verifyUser, (req, res) => {
  res.send("Reached GET /queries");
});

function verifyUser(req, res, next) {
  const token = localStorage.getItem(
    import.meta.env.VITE_LOCAL_STORAGE_TOKEN_VARIABLE
  );
  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server started. Listening to port ${PORT}`);
});
