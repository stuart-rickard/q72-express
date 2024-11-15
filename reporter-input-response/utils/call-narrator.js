import { gVars } from "../reporter-global-variables.js";

async function callNarrator(chatInput) {
  await gVars.openai.beta.threads.messages.create(gVars.thread.id, {
    role: "user",
    content: chatInput,
  });

  gVars.run = await gVars.openai.beta.threads.runs.createAndPoll(
    gVars.thread.id,
    {
      assistant_id: gVars.narratorAssistant.id,
    }
  );
  console.log("run usage: ", gVars.run.usage);

  if (gVars.run.status === "completed") {
    gVars.messages = await gVars.openai.beta.threads.messages.list(
      gVars.run.thread_id
    );
    gVars.message = gVars.messages.data[0].content[0].text.value;
    if (gVars.message.startsWith("Response: ")) {
      gVars.message = gVars.message.substring(10);
    }
  } else {
    console.log(gVars.run.status);
  }

  console.log(gVars.message);
}

export { callNarrator };
