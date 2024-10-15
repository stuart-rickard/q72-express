import { promises as fs } from "fs";

async function getFlashcards(version) {
  let fileNameString = "";
  switch (version) {
    case "v1":
      fileNameString = "flashcards/cardSetsDataV1.json";
      break;
    case "v2":
      fileNameString = "flashcards/cardSetsDataV2.json";
      break;
    default:
      console.log("Invalid version");
      break;
  }
  // load the cardsets from the json file
  try {
    const cardSetsData = await fs.readFile(fileNameString, {
      encoding: "utf8",
    });
    console.log(cardSetsData);
    return JSON.parse(cardSetsData);
  } catch (err) {
    console.error(err);
  }
}

export { getFlashcards };
