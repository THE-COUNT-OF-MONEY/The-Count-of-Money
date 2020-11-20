const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes.js')

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

module.exports = router;