const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { checkIfLoggedIn, checkIfNotLoggedIn } = require('../middleware/authMiddleware');

router.get('/login', checkIfNotLoggedIn, authController.showLoginRegister);
router.get('/register', checkIfNotLoggedIn, authController.showLoginRegister);

router.post('/register', checkIfNotLoggedIn, authController.registerUser);
router.post('/login', checkIfNotLoggedIn, authController.loginUser);

router.get('/logout', checkIfLoggedIn, authController.logoutUser);

router.get('/', (req, res) => res.redirect('/login'));

module.exports = router;
