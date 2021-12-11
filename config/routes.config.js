const express = require("express");
const router = express.Router();
const misc = require("../controllers/misc.controller");
const contacts = require("../controllers/contacts.controller");

router.get("/", misc.home);
router.get("/contacts", contacts.list);
router.get("/contacts/create", contacts.create);
router.post("/contacts", contacts.doCreate);
router.get("/contacts/:id", contacts.detail);
router.get("/contacts/:id/edit", contacts.edit);
router.post("/contacts/:id", contacts.doEdit);
router.post("/contacts/:id/delete", contacts.delete);

module.exports = router;
