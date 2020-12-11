const env = require('./config/env.js');
const db = require('./services/database.js');
const router = require('./routes/router.js');
const security = require('./config/security');
const express = require('express');
const app = express();
const swagger = require('./config/swagger');

security.initializeCORS(app);
security.initializeCSRF(app);

// Check environment required variables persistence
if (env.isConform() === false)
  throw 'Error, wrong .env format.\nPlease refer to the README.md';

// Initialize Environment Variables
let { database, server } = env.getVariables();

// Initialize Database
db.initialize(database.credentials, database.config, database.databaseUrl);

app.use(express.json());

swagger.initialize(router)
app.use(router);


app.listen(server.port);

console.log(`Running on http://${server.host}:${server.port}`);
