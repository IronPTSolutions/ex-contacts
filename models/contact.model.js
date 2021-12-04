const allContacts = require('../data/contacts.json');

class Contact {

  static find(search) {
    return new Promise((resolve) => {
      if (search) {
        const regex = new RegExp(search, 'i');
        resolve(allContacts.filter(contact => regex.test(contact.name)));
      } else {
        resolve(allContacts);
      }
    })
  }

  static findByEmail(email) {
    const contact = allContacts.find(contact => contact.email === email);
    return Promise.resolve(contact);
  }

  static create(contact) {
    allContacts.push(contact);
    return Promise.resolve(contact);
  }

}

module.exports = Contact;