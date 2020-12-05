const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes.js');
const currenciesRoutes = require('./currenciesRoutes.js');
const cryptosbankRoutes = require('./cryptosbankRoutes.js');
const settingTabRoutes = require('./settingsRoutes.js');

// User Call
router
  .route('/users/profile')
  .get(userRoutes.getProfile)
  .put(userRoutes.editProfile);
router.route('/users/register').post(userRoutes.register);
router.route('/users/login').post(userRoutes.login);
router.route('/users/logout').post(userRoutes.logout);
router.route('/users/auth/:provider').get();
router.route('/users/auth/:provider/callback').get();

// Currencies General
router.route('/currencies/setAll').get(currenciesRoutes.setAll); // Appel pour syncro les cryptos via api externe
router.route('/currencies/getAll').get(currenciesRoutes.getAllCrypto); // Appel pour syncro les cryptos via api externe
router
  .route('/currencies/getOneCrypto/:CurId')
  .get(currenciesRoutes.getOneCrypto);
router
  .route('/currencies/getOneCrypto/:CurId')
  .delete(currenciesRoutes.deleteOneCryptoDocument);

//Crypto Bank
router
  .route('/currencies/getAllCryptos/:UserId')
  .get(cryptosbankRoutes.getAllhisCryptos);
router
  .route('/currencies/getOneCryptos/:UserId/:CurrId')
  .get(cryptosbankRoutes.getOneCryptos);
router
  .route('/currencies/setOneCryptos/:UserId/:CurrId')
  .get(cryptosbankRoutes.setOneCrypto);
router
  .route('/currencies/deleteOneCryptos/:UserId/:CurrId')
  .delete(cryptosbankRoutes.deleteOneCrypto);

// Settings Tab
router.route('/settings/:UserId').put(settingTabRoutes.update);
router.route('/settings/:UserId').get(settingTabRoutes.getSettings);

module.exports = router;
