import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
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

app.post("/test/chat", async (req, res) => {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REPORTER_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      stream: true,
    }),
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  // Initialize variables to handle streaming data
  let buffer = "";

  response.body.on("data", (chunk) => {
    buffer += chunk.toString();

    // Split the buffer by newlines
    const lines = buffer.split("\n");

    // Keep the last partial line in the buffer
    buffer = lines.pop();

    for (const line of lines) {
      const message = line.trim();

      // Ignore empty lines
      if (!message) continue;

      // Stream finished
      if (message === "data: [DONE]") {
        return res.end();
      }

      if (message.startsWith("data: ")) {
        const jsonString = message.replace("data: ", "");
        try {
          const parsed = JSON.parse(jsonString);
          const content = parsed.choices[0].delta.content;
          if (content) {
            console.log(content);
            if (content == " ") console.log("space");
            res.write(`data: ${content}\n\n`);
          }
        } catch (error) {
          // Handle JSON parsing errors
          console.error("Error parsing JSON:", error);
        }
      }
    }
  });

  response.body.on("end", () => {
    res.end();
  });

  response.body.on("error", (error) => {
    console.error("Error with OpenAI API stream:", error);
    res.end();
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
