const Contact = require("../models/contact.model");

module.exports.list = (req, res, next) => {
  Contact.find()
    .then((contacts) => {
      res.render("contacts/list", { contacts });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.detail = (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.render("contacts/detail", { contact });
      } else {
        res.redirect("/contacts");
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.create = (req, res, next) => {
  res.render("contacts/create");
};

module.exports.doCreate = (req, res, next) => {
  Contact.create(req.body)
    .then(() => {
      res.redirect("/contacts");
    })
    .catch((error) => {
      res.render("contacts/create", {
        contact: req.body,
        errors: error.errors,
      });
    });
};

module.exports.edit = (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.render("contacts/edit", { contact });
      } else {
        res.redirect("/contacts");
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.doEdit = (req, res, next) => {
  Contact.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((contact) => {
      if (contact) {
        res.redirect(`/contacts/${contact.id}`);
      } else {
        res.redirect("/contacts");
      }
    })
    .catch((error) => {
      const contact = req.body;
      contact.id = req.params.id;

      res.render("contacts/edit", {
        contact,
        errors: error.errors,
      });
    });
};

module.exports.delete = (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/contacts");
    })
    .catch((error) => {
      next(error);
    });
};
