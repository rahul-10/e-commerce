const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('../api/routes');
const { sendResponse } = require('../api/utils/response');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// CORS Enabling
app.use(cors());
app.options('*', cors());

process.on('unhandledRejection', (reason, promise) => {
  console.log('unhandledRejection', reason, promise);
});

app.get('/', (req, res) => sendResponse(req, res, 200, 'Health Check'));


app.use('/api/', routes);


app.use((err, req, res, next) => res.status(err.statusCode || 500).json({
  success: false,
  message: err.statusCode === 500 ? 'Something went wrong' : err.message,
}));

// Module
module.exports = app;
