const allContacts = require('../data/contacts.json');

class Contact {

  static find() {
    return Promise.resolve(allContacts);
  }
}

module.exports = Contact;