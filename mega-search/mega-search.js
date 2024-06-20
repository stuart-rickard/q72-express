import { OpenAI } from "langchain/llms/openai";
import { SerpAPI } from "langchain/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import dotenv from "dotenv";

dotenv.config();

const apiCallTimestamps = [];
const MAX_API_CALLS = 10;
const TIME_WINDOW_HOURS = 48;

const updateApiCallTimestamps = () => {
  const currentTime = Date.now();
  while (
    apiCallTimestamps.length > 0 &&
    apiCallTimestamps[0] < currentTime - TIME_WINDOW_HOURS * 60 * 60 * 1000
  ) {
    apiCallTimestamps.shift();
  }
  apiCallTimestamps.push(currentTime);
  console.log(apiCallTimestamps.length);
};

const model = new OpenAI({
  openAIApiKey: process.env.MEGA_SEARCH_OPENAI_API_KEY,
  temperature: 0,
});

const tools = [
  new SerpAPI(process.env.SERP_API_KEY, {
    hl: "en",
    gl: "us",
  }),
];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
  //   verbose: true,
});

console.log("Loaded OpenAI agent for mega-search");

async function megaSearch(chatInput) {
  updateApiCallTimestamps();
  if (apiCallTimestamps.length > MAX_API_CALLS) {
    return "Too many calls to API";
  }

  // Continue with the rest of the code
  const res = await executor.call({
    input: chatInput,
  });
  return res.output;
}

export { megaSearch };
