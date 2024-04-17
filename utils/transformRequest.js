module.exports = (originalRequest) => {
  return {
    version: originalRequest.version || 10,
    config: {
      "OUTPUT_STREAM": {
        "provider_id": "openai",
        "temperature": originalRequest.temperature,
        "max_tokens": originalRequest.max_tokens,
        "model_id": originalRequest.model,
        "use_cache": false,
        "use_stream": false,
        "seed": null,
        "response_format": null
      }
    },
    blocking: true,
    inputs: {
      "messages": originalRequest.messages
    }
  };
};