const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/usersCtrl');

router.get('/', usersCtrl.getUsers);
router.post('/', usersCtrl.login);

module.exports = router