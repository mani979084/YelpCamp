const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../error/catchAsync');
const users = require('../controllers/user');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser))


router.get('/loginFail', (req, res) => {
    res.json({ error: 'Login failed' })
})

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureRedirect: '/loginFail' }),
        users.loginUser)

router.get('/logout', users.logoutUser)

module.exports = router;