const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/usersCtrl');

router.get('/', usersCtrl.getUsers);
router.post('/login', usersCtrl.login);
router.post('/register', usersCtrl.register);

module.exports = router