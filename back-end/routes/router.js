const express = require('express');
const router = express.Router();

const authFunctions = require('./authRoutes.js');
const userFunctions = require('./userRoutes.js');
const currenciesFunctions = require('./currenciesRoutes.js');
const cryptosBankFunctions = require('./cryptosbankRoutes.js');
const settingFunctions = require('./settingsRoutes.js');

const none = () => {}


const setupRoutes = (routes) => {
  // Basic route format : { path: string, method: 'GET' || 'POST' || 'PUT' || 'DELETE', bind: function }
  routes.forEach(route => {
      if (route.method === 'GET')
        router.route(route.path).get(route.bind)
      if (route.method === 'POST')
        router.route(route.path).post(route.bind)
      if (route.method === 'PUT')
        router.route(route.path).put(route.bind)
      if (route.method === 'DELETE')
        router.route(route.path).delete(route.bind)
  });
}

// User Routes
const userRoutes = new Array(
  { path: '/users', method: 'GET', bind: userFunctions.getAllUsers },
  { path: '/users/profile', method: 'GET', bind: userFunctions.getProfile },
  { path: '/users/profile', method: 'PUT', bind: userFunctions.editProfile },
  { path: '/users/register', method: 'POST', bind: userFunctions.register }
)
  
// Auth Routes
const authRoutes = new Array(
  { path: '/users/login', method: 'POST', bind: authFunctions.login },
  { path: '/users/logout', method: 'POST', bind: authFunctions.logout },
  { path: '/users/auth/:provider', method: 'GET', bind: authFunctions.loginWithProvider },
  { path: '/users/auth/:provider/callback', method: 'GET', bind: none },
)

// Currencies Routes
const currenciesRoutes = new Array(
  { path: '/currencies/refresh', method: 'GET', bind: currenciesFunctions.setAll },
  { path: '/currencies', method: 'GET', bind: currenciesFunctions.getAllCrypto },
  { path: '/currencies/:CurId', method: 'GET', bind: currenciesFunctions.getOneCrypto },
  { path: '/currencies/:CurId', method: 'DELETE', bind: currenciesFunctions.deleteOneCryptoDocument },
  { path: '/currencies', method: 'POST', bind: currenciesFunctions.createOneCryptoDocument },
)

// Crypto Bank
const cryptoBankRoutes = new Array(
  { path: '/users/:userId/currencies', method: 'GET', bind: cryptosBankFunctions.getUserCryptos },
  { path: '/users/:userId/currencies/:currencyId', method: 'PUT', bind: cryptosBankFunctions.addCryptoToBank },
  // { path: '/users/:userId/currencies/:CurrId', method: 'GET', bind: cryptosBankFunctions.getOneCryptos },
  { path: '/users/:userId/currencies/:currencyId', method: 'DELETE', bind: cryptosBankFunctions.deleteCryptoFromBank },
)

// Settings
const settingsRoutes = new Array(
  { path: '/settings', method: 'PUT', bind: settingFunctions.update },
  { path: '/settings', method: 'GET', bind: settingFunctions.getSettings },
)

setupRoutes(userRoutes)
setupRoutes(authRoutes)
setupRoutes(currenciesRoutes)
setupRoutes(settingsRoutes)
setupRoutes(cryptoBankRoutes)

module.exports = router;
