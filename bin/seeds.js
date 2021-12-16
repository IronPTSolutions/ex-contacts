const mongoose = require('mongoose');
const Contact = require('../models/contact.model')
const contacts = require('../data/contacts.json');

require('../config/db.config');


mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
    .then(() => Contact.create(contacts))
    .then(contacts => console.log(`Successfully created ${contacts.length} contacts`))
    .catch(error => console.error(error))
    .then(() => mongoose.connection.close())
})
