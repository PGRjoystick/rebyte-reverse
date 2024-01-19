module.exports = (originalResponse) => {
  const result = originalResponse.run.results[0][0].value;
  const usage = originalResponse.run.traces[1][1][0][0].meta.usage;
  console.log(result);

const formattedResponse = {
  id: "chatcmpl-8fTcLvSUk0vuDsuHav6VmfLqkxrak",
  object: "chat.completion",
  created: Math.floor(Date.now() / 1000),
  model: originalResponse.run.config.blocks.OUTPUT_STREAM.model_id,
  choices: [
    {
      index: 0,
      messages: result,
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  usage: usage,
  system_fingerprint: "fp_168383a679",
};

  // Pretty print the response with 2 spaces indentation
  const prettyPrintedResponse = JSON.stringify(formattedResponse, null, 2);

  return prettyPrintedResponse;
};
