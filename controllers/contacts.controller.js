const Contact = require('../models/contact.model');


module.exports.list = (req, res, next) => {
  Contact.find()
    .then(contacts => res.render('contacts/list', { contacts }))
    .catch(error => next(error));
}