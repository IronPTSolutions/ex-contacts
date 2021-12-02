const express = require('express');
const router = express.Router();
const misc = require('../controllers/misc.controller');
const contacts = require('../controllers/contacts.controller');

router.get('/', misc.home);
router.get('/contacts', contacts.list);

module.exports = router;