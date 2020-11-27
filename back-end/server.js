const express = require('express');
const cors = require('cors');
const env = require('./config/env.js')
const db = require('./services/database.js');
const router = require('./routes/router.js');

// App
const app = express();

app.use(cors());

// Check environment required variables persistence
if (env.isConform() === false)
  throw "Error, wrong .env format.\nPlease refer to the README.md";

// Initialize Environment Variables
let { database, server } = env.getVariables();

// Initialize Database
db.initialize(database.credentials, database.databaseUrl);

app.use(express.json());
app.use(router)

app.listen(server.port);

console.log(`Running on http://${server.host}:${server.port}`);