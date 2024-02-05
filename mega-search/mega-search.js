import { OpenAI } from "langchain/llms/openai";
import { SerpAPI } from "langchain/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import dotenv from "dotenv";

dotenv.config();

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

console.log("Loaded OpenAI agent");

async function megaSearch(chatInput) {
  const res = await executor.call({
    input: chatInput,
  });
  return res;
}

export { megaSearch };
