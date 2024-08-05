module.exports = (originalRequest) => {
  let model_id = originalRequest.model;
  let provider_id = "openai";

  if (model_id.includes('|')) {
    [model_id, provider_id] = model_id.split('|');
  }

  return {
    version: originalRequest.version || Number(process.env.DEFAULT_VERSION),
    config: {
      "OUTPUT_STREAM": {
        "provider_id": provider_id,
        "temperature": originalRequest.temperature,
        "max_tokens": originalRequest.max_tokens,
        "model_id": model_id,
        "use_cache": false,
        "use_stream": false,
        "seed": null,
        "response_format": null
      }
    },
    blocking: true,
    inputs: {
      "messages": originalRequest.messages.map(message => {
        if (message.role === 'user' && Array.isArray(message.content)) {
          message.parts = message.content;
          delete message.content;
        }
        return message;
      })
    }
  };
};