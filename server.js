import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { megaSearch } from "./mega-search/mega-search.js";

import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

// load the cardsets from the json file
let cardSetsData = "";
fs.readFile(
  "flashcards/cardSetsData.json",
  { encoding: "utf8" },
  (err, data) => {
    if (err) {
      console.error("An error occurred:", err);
      return;
    }
    cardSetsData = JSON.parse(data);
    console.log(cardSetsData);
  }
);

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
  const result = await megaSearch(req.body.message);
  res.json({ message: result.output });
});

app.post("/flashcards/v1", (req, res) => {
  const clientCode = req.body.code;
  console.log(clientCode);
  if (clientCode === "g") {
    const responseData = {
      message: "Access code accepted",
      cardSets: cardSetsData,
    };
    // console.log(responseData);
    res.json(responseData);
  } else {
    res.status(401).send("Unauthorized");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
