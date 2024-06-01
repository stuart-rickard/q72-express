import { gVars } from "./global-variables.js";

async function callImageGenerator() {
  await gVars.openai.beta.threads.messages.create(gVars.imageThread.id, {
    role: "user",
    content: gVars.messages.data[0].content[0].text.value,
  });

  gVars.imageRun = await gVars.openai.beta.threads.runs.createAndPoll(
    gVars.imageThread.id,
    {
      assistant_id: gVars.imageAssistant.id,
    }
  );
  console.log("imageRun usage: ", gVars.imageRun.usage);

  if (gVars.imageRun.status === "completed") {
    gVars.imageMessages = await gVars.openai.beta.threads.messages.list(
      gVars.imageRun.thread_id
    );
    gVars.imageMessage = gVars.imageMessages.data[0];
  } else {
    console.log(gVars.imageRun.status);
  }

  console.log(gVars.imageMessage.content[0].text.value);
  //   console.log(image_url);

  const response = await gVars.openai.images.generate({
    model: "dall-e-3",
    prompt: gVars.imageMessage.content[0].text.value,
    n: 1,
    size: "1024x1024",
  });
  gVars.image_url = response.data[0].url;
  console.log(gVars.image_url);
}

export { callImageGenerator };
