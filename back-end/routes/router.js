const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes.js')
const currenciesRoutes = require('./currenciesRoutes.js')

router
    .route('/users/profile')
    .get(userRoutes.getProfile)
    .put(userRoutes.editProfile)

router
    .route('/users/register')
    .post(userRoutes.register)

router
    .route('/users/login')
    .post(userRoutes.login)

router
    .route('/users/logout')
    .post(userRoutes.logout)

router
    .route('/users/auth/:provider')
    .get();

router
    .route('/users/auth/:provider/callback')
    .get();

router
    .route('/currency/getAll') 
    .get(currenciesRoutes.getAll) // Appel pour syncro les cryptos via api externe

router
    .route('/currency/getOneCrypto/:CurId')
    .get(currenciesRoutes.getOneCrypto)

router
    .route('/currency/getOneCrypto/:CurId')
    .delete(currenciesRoutes.deleteOneCryptoDocument)

router
    .route('/currency/getAllCrypto')
    .get(currenciesRoutes.getAllCrypto)

router
    .route('/currency/getOneCrypto/')
    .post(currenciesRoutes.createOneCryptoDocument)

module.exports = router;