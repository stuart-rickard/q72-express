import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { megaSearch } from "./mega-search/mega-search.js";
import { getFlashcards } from "./flashcards/flashcards.js";
import { reporterAPIHandler } from "./reporter-input-response/reporter-API-handler.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/express", (req, res) => {
  console.log("get call to /express");
  res.send("q72 express server is running");
});

app.post("/test", async (req, res) => {
  console.log("post call to /test");
  console.log(req.body);
  res.json({ message: "hello from /test" });
});

app.post("/mega-search", async (req, res) => {
  console.log(req.body);
  const output = await megaSearch(req.body.message);
  res.json({ message: output });
});

app.post("/flashcards/v2", async (req, res) => {
  const responseData = {
    message: "v2 flashcards",
    cardSets: await getFlashcards("v2"),
  };
  res.json(responseData);
});

app.post("/flashcards/v1", async (req, res) => {
  const clientCode = req.body.code;
  console.log(clientCode);
  if (clientCode === "g") {
    const responseData = {
      message: "Access code accepted",
      cardSets: await getFlashcards("v1"),
    };
    // console.log(responseData);
    res.json(responseData);
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/reporter", async (req, res) => {
  console.log("post call to /reporter");
  console.log(req.body);
  var response = await reporterAPIHandler(req.body);
  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
