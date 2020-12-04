const express = require('express');
const router = express.Router();
const userRoutes = require('./user.js')
const authRoutes = require('./auth.js');

router
    .route('/users')
    .get(userRoutes.getAllUsers)
    
router
    .route('/users/profile')
    .get(userRoutes.getProfile)
    .put(userRoutes.editProfile)

router
    .route('/users/register')
    .post(userRoutes.register)

router
    .route('/users/login')
    .post(authRoutes.login)

router
    .route('/users/logout')
    .post(authRoutes.logout)

router
    .route('/users/auth/:provider')
    .get(authRoutes.loginWithProvider);

router
    .route('/users/auth/:provider/callback')
    .get();

module.exports = router;