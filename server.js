import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { megaSearch } from "./mega-search/mega-search.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/express", (req, res) => {
  res.send("q72 express server is running");
});

app.post("/mega-search/api", async (req, res) => {
  console.log(req.body);
  const result = await megaSearch(req.body.message);
  res.json({ message: result.output });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});