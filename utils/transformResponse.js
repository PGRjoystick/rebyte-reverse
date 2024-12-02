module.exports = (originalResponse) => {
  console.log(originalResponse);

  // Check if the run status is "errored"
  if (originalResponse.run.status.run === "errored") {
    const errorMessage = originalResponse.run.traces[1][1][0][0].error || "Unknown error occurred";
    return JSON.stringify({
      status: 500,
      error: errorMessage
    });
  }

  let result = null;
  let usage = null;

  try {
    result = originalResponse.run.results[0][0].value;
    usage = originalResponse.run.traces[1][1][0][0].meta.usage;
  } catch (error) {
    console.error('Error extracting result or usage:', error);
    return JSON.stringify({
      status: 500,
      error: 'Error extracting result or usage'
    });
  }

  console.log(result);

  const formattedResponse = {
    id: "chatcmpl-8fTcLvSUk0vuDsuHav6VmfLqkxrak",
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: originalResponse.run.config.blocks.OUTPUT_STREAM.model_id,
    choices: [
      {
        index: 0,
        message: result,
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