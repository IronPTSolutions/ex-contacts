const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
}, { timestamp: true });

const Contact = mongoose.model("Contact", schema);

module.exports = Contact;
