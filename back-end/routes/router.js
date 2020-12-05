const express = require('express');
const router = express.Router();

const user = require('./user.js')
const auth = require('./auth.js')

router
    .route('/users')
    .get(user.getAllUsers)
    
router
    .route('/users/profile')
    .get(user.getProfile)
    .put(user.editProfile)

router
    .route('/users/register')
    .post(user.register)

router
    .route('/users/login')

    .post(auth.login)

router
    .route('/users/logout')
    .post(auth.logout)

router
    .route('/users/auth/:provider')
    .get(auth.loginWithProvider);

router
    .route('/users/auth/:provider/callback')
    .get();

module.exports = router;