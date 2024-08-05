const { response } = require('../server');
const transformRequest = require('../utils/transformRequest');
const transformResponse = require('../utils/transformResponse');
const axios = require('axios');
const { brotliCompressSync } = require('zlib');

const apiKey = process.env.REAL_API_KEY;
const url = process.env.REAL_API_URL;

exports.handleProxyRequest = async (req, res) => {
  try {
    const apiKey = req.headers.authorization.replace('Bearer ', '');

    if (!apiKey) {
      throw new Error('API key not provided');
    }

    const transformedRequestBody = transformRequest(req.body);
    const response = await axios.post(url, transformedRequestBody, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const transformedResponse = transformResponse(response.data);

    // Compress the response using Brotli
    const compressedResponse = brotliCompressSync(transformedResponse);

    res.set({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Encoding': 'br'
    });

    // Set response headers
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');

    // Send the compressed response in chunks
    const chunkSize = 1024;
    for (let i = 0; i < compressedResponse.length; i += chunkSize) {
      res.write(compressedResponse.slice(i, i + chunkSize));
    }

    res.end();
  } catch (error) {
      res.status(500).json({ error: error.message });
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
      console.log(response.data)
  }
};
