const Contact = require('../models/contact.model');


module.exports.list = (req, res, next) => {
  const { search } = req.query;
  Contact.find(search)
    .then(contacts => res.render('contacts/list', { contacts, search }))
    .catch(error => next(error));
}

module.exports.detail = (req, res, next) => {
  const { email } = req.params;
  Contact.findByEmail(email)
    .then(contact => {
      if (!contact) {
        
        res.redirect('/contacts');
      } else {
        res.render('contacts/detail', { contact })
      }
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  res.render('contacts/create')
}

module.exports.doCreate = (req, res, next) => {
  const contact = req.body;
  Contact.create(contact)
    .then(contact => res.redirect('/contacts'))
    .catch(error => next(error));
}