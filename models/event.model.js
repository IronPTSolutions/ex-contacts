const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    minlength: [3, 'Title needs at least 3 chars']
  },
  description: String,
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contacts',
    required: [true, 'contact id is required']
  }
}, { timestamp: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
