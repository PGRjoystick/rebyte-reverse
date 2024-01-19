const express = require('express');
const bodyParser = require('body-parser');
const proxyController = require('./controllers/proxyController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/', proxyController.handleProxyRequest);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;