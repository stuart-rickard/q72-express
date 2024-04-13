import { promises as fs } from "fs";

async function getFlashcards() {
  // load the cardsets from the json file
  try {
    const cardSetsData = await fs.readFile("flashcards/cardSetsData.json", {
      encoding: "utf8",
    });
    console.log(cardSetsData);
    return JSON.parse(cardSetsData);
  } catch (err) {
    console.error(err);
  }
}

export { getFlashcards };
