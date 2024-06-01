import { v4 as UUID } from "uuid";

import { gVars } from "./utils/global-variables.js";

import { getBusyMessage } from "./utils/busy-message.js";
import { initializeAssistant } from "./utils/initialize-assistants.js";
import { initializeImageAssistant } from "./utils/initialize-image-assistant.js";
import { callNarrator } from "./utils/call-narrator.js";
import { callImageGenerator } from "./utils/call-image-generator.js";

async function reporterAPIHandler(body) {
  if (gVars.busy) {
    return { message: getBusyMessage() };
  } else {
    gVars.busy = true;
  }
  if (body.requestType === "grant gameID") {
    // check whether there is currently an active game
    if (gVars.lastActionTimestamp > Date.now() - 10 * 60 * 1000) {
      gVars.busy = false;
      return {
        message: "gameID not granted; there is currently an active game",
      };
    } else {
      gVars.gameID = UUID();
      console.log("gameID granted: " + gVars.gameID);
      gVars.busy = false;
      return { message: "gameID granted", gameID: gVars.gameID };
    }
  } else {
    // check whether gameID is valid
    if (body.gameID !== gVars.gameID) {
      gVars.busy = false;
      return { message: "invalid gameID" };
    } else {
      switch (body.requestType) {
        case "initialize":
          await initializeAssistant();
          await initializeImageAssistant();
          gVars.busy = false;
          return { message: "assistants initialized" };
        case "respond to action":
          await callNarrator(body.message); // this updates gVars.message
          gVars.busy = false;
          return { message: gVars.message };
        case "provide image":
          await callImageGenerator();
          gVars.busy = false;
          return { message: gVars.image_url };
        default:
          gVars.busy = false;
          return { message: "invalid requestType" };
      }
    }
  }
}

export { reporterAPIHandler };
