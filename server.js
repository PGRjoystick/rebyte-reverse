require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const proxyController = require('./controllers/proxyController');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a writable stream to a log file
const logFilePath = path.join(__dirname, 'server.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Redirect console.log to the log file
console.log = function (message) {
	if (typeof message === 'object') {
		message = JSON.stringify(message);
	}
	logStream.write(`[${new Date().toISOString()}] ${message}\n`);
};

app.use(bodyParser.json());

app.post('/', proxyController.handleProxyRequest);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
