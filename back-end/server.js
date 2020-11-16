const express = require('express');
const env = require('./config/env.js')
const { Database } = require('./services/database.js');


// App
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Check environment required variables persistence
if (env.isConform() === false)
  throw "Error, wrong .env format.\nPlease refer to the README.md";

// Initialize Environment Variables
let { database, server } = env.getVariables();

// Initialize Database
let firebase = new Database(database.credentials, database.databaseUrl);

// Example of data recuperation
async function test()
{
  let users = await firebase.getDocument("Users", "test");
  console.log("test: ", users);
}

test();

app.listen(server.port, server.host);

console.log(`Running on http://${server.host}:${server.port}`);
