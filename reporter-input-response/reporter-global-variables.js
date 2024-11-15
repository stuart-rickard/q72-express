import OpenAI from "openai";
import {
  prompt_create_narrative_response,
  prompt_create_image_generation_prompt,
} from "./utils/prompts.js";
import dotenv from "dotenv";

dotenv.config();

let busy = false;
let lastActionTimestamp = new Date(2000, 0, 1); // intentionally set to a date in the past
const openai = new OpenAI({
  apiKey: process.env.REPORTER_OPENAI_API_KEY,
});

let thread;
let messages, message;
let run;
let stream;
let narratorAssistant;
var assistantInitialized = false;

let imageThread;
let imageMessages, imageMessage;
let imageRun;
let imageAssistant;
let image_url;

let gVars = {
  busy: busy,
  lastActionTimestamp: lastActionTimestamp,
  openai: openai,
  // for narrator assistant
  thread: thread,
  messages: messages,
  message: message,
  run: run,
  stream: stream,
  assistantInitialized: assistantInitialized,
  narratorAssistant: narratorAssistant,
  prompt_create_narrative_response: prompt_create_narrative_response,
  // for image assistant
  imageThread: imageThread,
  imageMessages: imageMessages,
  imageMessage: imageMessage,
  imageAssistant: imageAssistant,
  imageRun: imageRun,
  prompt_create_image_generation_prompt: prompt_create_image_generation_prompt,
  image_url: image_url,
};

export { gVars };
