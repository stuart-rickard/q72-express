import { gVars } from "./global-variables.js";

async function initializeAssistant() {
  gVars.narratorAssistant = await gVars.openai.beta.assistants.create({
    instructions:
      "You assist with a role-playing game. When the player indicates their action, you respond with an entertaining description of the result of the action.",
    name: "Scene Narrator",
    // model: "gpt-4",
    // model: "gpt-4-turbo",
    model: "gpt-3.5-turbo-0125",
  });

  gVars.thread = await gVars.openai.beta.threads.create();

  gVars.message = await gVars.openai.beta.threads.messages.create(
    gVars.thread.id,
    {
      role: "user",
      content: gVars.prompt_create_narrative_response,
    }
  );

  gVars.run = await gVars.openai.beta.threads.runs.createAndPoll(
    gVars.thread.id,
    {
      assistant_id: gVars.narratorAssistant.id,
    }
  );

  if (gVars.run.status === "completed") {
    gVars.messages = await gVars.openai.beta.threads.messages.list(
      gVars.run.thread_id
    );
    gVars.message = gVars.messages.data[0];
  } else {
    console.log("b2");
    console.log(gVars.run.status);
  }

  gVars.assistantInitialized = true;
  console.log("assistant initialization complete");
}
export { initializeAssistant };
