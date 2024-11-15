import { v4 as UUID } from "uuid";

import { gVars } from "./reporter-global-variables.js";

import { getBusyMessage } from "./utils/busy-message.js";
import { initializeAssistant } from "./utils/initialize-assistants.js";
import { initializeImageAssistant } from "./utils/initialize-image-assistant.js";
import { callNarrator } from "./utils/call-narrator.js";
// import { streamNarrator } from "./utils/stream.js";
import { callImageGenerator } from "./utils/call-image-generator.js";

async function reporterAPIHandler(body) {
  // return testAPIHandler(body); // for testing -- see function below
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
        message:
          "gameID not granted; there is currently a different active game in progress; please wait a few minutes and try again",
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
          // await streamNarrator(body.message);
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

function testAPIHandler(body) {
  if (body.requestType === "grant gameID") {
    return { message: "gameID granted", gameID: "Test1234" };
  } else {
    switch (body.requestType) {
      case "initialize":
        return { message: "assistants initialized" };
      case "respond to action":
        return {
          message: `You pack your trusty typewriter, notebook, and a few extra pencils into your worn leather satchel, ready for the journey ahead. Stepping out into the brisk New York winter air, you make your way to the bustling train station in Lower Manhattan. The streets are alive with the hustle and bustle of the city, horse-drawn carriages clattering past as vendors peddle their wares.

As you board the train bound for the distant lands of New Mexico, the cityscape gradually gives way to rolling countryside, dotted with quaint towns and sprawling fields. The train rattles and hums along the tracks, its rhythmic motion lulling you into a contemplative state.

Days pass as you traverse the vast expanse of the country, witnessing the changing landscapes from East to West. The snowy plains of the Midwest give way to the rugged terrain of the Southwest, the arid desert stretching endlessly under the vast cerulean sky.

Upon reaching New Mexico, you step off the train onto the dusty platform of a small desert town. The sun beats down mercilessly, casting long shadows across the adobe buildings lining the streets. The local townsfolk eye you with a mix of curiosity and suspicion, the tension palpable in the air.

As you set out to uncover the latest developments regarding Pancho Villa, the echoes of unrest and uncertainty reverberate through the town. Rumors swirl like dust devils in the hot desert winds, and finding reliable sources becomes a challenge amid the wary gazes of the locals.

Undeterred by the obstacles, you steel yourself for the task at hand, determined to uncover the truth behind the enigmatic figure of Pancho Villa amidst the rugged beauty and simmering tensions of New Mexico. The adventure has only just begun.`,
        };
      case "provide image":
        return { message: "https://via.placeholder.com/1024x1024" };
      default:
        return { message: "invalid requestType" };
    }
  }
}
