const express = require("express");
const router = express.Router();
const misc = require("../controllers/misc.controller");
const contacts = require("../controllers/contacts.controller");
const events = require("../controllers/events.controller");
const auth = require("../controllers/auth.controller");
const secure = require("../middlewares/secure.mid");

router.get("/", misc.home);

router.get("/admin", secure.isAuthenticated, secure.isAdmin, contacts.admin);

router.get("/contacts", secure.isAuthenticated, contacts.list);
router.get("/contacts/create", secure.isAuthenticated, contacts.create);
router.post("/contacts", secure.isAuthenticated, contacts.doCreate);
router.get("/contacts/:id", secure.isAuthenticated, contacts.detail);
router.get("/contacts/:id/edit", secure.isAuthenticated, contacts.edit);
router.post("/contacts/:id", secure.isAuthenticated, contacts.doEdit);
router.post("/contacts/:id/delete", secure.isAuthenticated, contacts.delete);

router.post(
  "/contacts/:contactId/events",
  secure.isAuthenticated,
  events.doCreate
);

router.get("/register", auth.register);
router.post("/register", auth.doRegister);
router.get("/login", auth.login);
router.post("/login", auth.doLogin);
router.get("/logout", auth.logout);
router.get("/users/:id/verify", auth.verify);

module.exports = router;
