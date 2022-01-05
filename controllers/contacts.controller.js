const createError = require("http-errors");
const mongoose = require("mongoose");
const Contact = require("../models/contact.model");
const Event = require("../models/event.model");

module.exports.admin = (req, res, next) => {
  res.send("Only admin users can access here!");
};

module.exports.list = (req, res, next) => {
  const query = {};

  if (!req.user.admin) {
    query.author = req.user._id;
  }

  Contact.find(query)
    .populate("author")
    .then((contacts) => res.render("contacts/list", { contacts }))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  const query = { _id: req.params.id };

  if (!req.user.admin) {
    query.author = req.user._id;
  }

  Contact.findOne(query)
    .then((contact) => {
      if (contact) {
        return Event.find({ contact: req.params.id }).then((events) =>
          res.render("contacts/detail", { contact, events })
        );
      } else {
        next(createError(404, "Contact not found"));
      }
    })
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  res.render("contacts/create");
};

module.exports.doCreate = (req, res, next) => {
  req.body.author = req.user.id;

  Contact.create(req.body)
    .then(() => res.redirect("/contacts"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("contacts/create", {
          contact: req.body,
          errors: error.errors,
        });
      } else {
        next(error);
      }
    });
};

module.exports.edit = (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.render("contacts/edit", { contact });
      } else {
        next(createError(404, "Contact not found"));
      }
    })
    .catch((error) => next(error));
};

module.exports.doEdit = (req, res, next) => {
  Contact.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((contact) => {
      if (contact) {
        res.redirect(`/contacts/${contact.id}`);
      } else {
        next(createError(404, "Contact not found"));
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        const contact = req.body;
        contact.id = req.params.id;

        res.render("contacts/edit", {
          contact,
          errors: error.errors,
        });
      } else {
        next(error);
      }
    });
};

module.exports.delete = (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((contact) => {
      if (contact) {
        res.redirect(`/contacts`);
      } else {
        next(createError(404, "Contact not found"));
      }
    })
    .catch((error) => next(error));
};
