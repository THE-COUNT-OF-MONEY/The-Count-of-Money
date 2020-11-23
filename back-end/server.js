const express = require('express');

const cors = require('cors');

const env = require('./config/env.js')
const db = require('./services/database.js');
const router = require('./routes/router.js');

// App
const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
  "Access-Control-Allow-Methods",
  "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
    );
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
});

// Check environment required variables persistence
if (env.isConform() === false)
  throw "Error, wrong .env format.\nPlease refer to the README.md";

// Initialize Environment Variables
let { database, server } = env.getVariables();

// Initialize Database
let firebase = db.initialize(database.credentials, database.databaseUrl);

app.use(express.json());
app.use(router)

app.listen(server.port);

console.log(`Running on http://${server.host}:${server.port}`);