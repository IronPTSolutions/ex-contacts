const express = require('express');
const router = express.Router();
const misc = require('../controllers/misc.controller');
const contacts = require('../controllers/contacts.controller');

router.get('/', misc.home);
router.get('/contacts', contacts.list);
router.get('/contacts/:email', contacts.detail);
router.get('/create-contact', contacts.create);
router.post('/create-contact', contacts.doCreate);

module.exports = router;