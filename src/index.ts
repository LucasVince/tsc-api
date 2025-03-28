import express from "express";
import { config } from "dotenv";

const app = express();

config();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(8080, () => console.log("Server running on port 8080"));
