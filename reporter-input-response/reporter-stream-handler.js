import { gVars } from "./reporter-global-variables.js";

async function reporterStreamHandler(req, res) {
  const { chatInput } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.flushHeaders(); // flush the headers to establish SSE with client

  try {
    let count = 0;
    let messageStart = "Response: ";
    await gVars.openai.beta.threads.messages.create(gVars.thread.id, {
      role: "user",
      content: chatInput,
    });

    gVars.openai.beta.threads.runs
      .stream(gVars.thread.id, {
        assistant_id: gVars.narratorAssistant.id,
      })
      //   .on("textCreated", (text) => {
      //   })
      .on("textDelta", (textDelta, snapshot) => {
        if (count < 3) {
          count++;
          // trim messageStart from the stream
          let i = 0;
          while (
            i < textDelta.value.length &&
            i < messageStart.length &&
            textDelta.value[i] === messageStart[i]
          ) {
            i++;
          }
          messageStart = messageStart.slice(i);
          const slicedValue = textDelta.value.slice(i);
          if (slicedValue) {
            res.write(`data: ${slicedValue}\n\n`);
          }
        } else {
          res.write(`data: ${textDelta.value}\n\n`);
        }
      })
      //   .on("toolCallCreated", (toolCall) => {
      //     res.write(`data: assistant > ${toolCall.type}\n\n`);
      //   })
      //   .on("toolCallDelta", (toolCallDelta, snapshot) => {
      //     if (toolCallDelta.type === "code_interpreter") {
      //       if (toolCallDelta.code_interpreter.input) {
      //         res.write(`data: ${toolCallDelta.code_interpreter.input}\n\n`);
      //       }
      //       if (toolCallDelta.code_interpreter.outputs) {
      //         res.write(`data: output >\n\n`);
      //         toolCallDelta.code_interpreter.outputs.forEach((output) => {
      //           if (output.type === "logs") {
      //             res.write(`data: ${output.logs}\n\n`);
      //           }
      //         });
      //       }
      //     }
      //   })
      .on("end", () => {
        res.write("data: [DONE]\n\n");
        res.end();
      })
      .on("error", (err) => {
        console.error("Error in stream:", err);
        res.end();
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
}

export { reporterStreamHandler };
