const createError = require('http-errors');
const mongoose = require('mongoose');
const Contact = require('../models/contact.model');
const Event = require('../models/event.model');


module.exports.doCreate = (req, res, next) => {
  const { contactId } = req.params;
  const event = req.body;
  event.contact = contactId;

  Contact.findById(contactId)
    .then(contact => {
      if (contact) {
        req.contact = contact;
        return Event.create(event)
          .then(event => res.redirect(`/contacts/${contactId}`))
      } else {
        next(createError(404, 'Contact not found'));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('contacts/detail', {
          event,
          errors: error.errors,
          contact: req.contact
        })
      } else {
        next(error)
      }
    });
}