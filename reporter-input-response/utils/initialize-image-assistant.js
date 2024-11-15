import { gVars } from "../reporter-global-variables.js";

async function initializeImageAssistant() {
  gVars.imageAssistant = await gVars.openai.beta.assistants.create({
    instructions:
      "You assist with creating a prompt for an image generator. You will receive a imageThread that shows the progress of a role-playing game. You will provide a prompt that is relevant to the most-recent status of the game.",
    name: "Image Prompter",
    // model: "gpt-4",
    // model: "gpt-4-turbo",
    model: "gpt-3.5-turbo-0125", // todo make global variable
  });

  gVars.imageThread = await gVars.openai.beta.threads.create();

  gVars.imageMessage = await gVars.openai.beta.threads.messages.create(
    gVars.imageThread.id,
    {
      role: "user",
      content: gVars.prompt_create_image_generation_prompt,
    }
  );

  gVars.imageRun = await gVars.openai.beta.threads.runs.createAndPoll(
    gVars.imageThread.id,
    {
      assistant_id: gVars.imageAssistant.id,
    }
  );

  if (gVars.imageRun.status === "completed") {
    gVars.imageMessages = await gVars.openai.beta.threads.messages.list(
      gVars.imageRun.thread_id
    );
    gVars.imageMessage = gVars.imageMessages.data[0];
  } else {
    console.log("image assistant initialization failed");
    console.log(gVars.imageRun.status);
  }
  console.log("image assistant initialization complete");
  console.log(gVars.imageMessage.content[0].text.value);
}

export { initializeImageAssistant };
