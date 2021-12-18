const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /.{8,}/;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    match: [EMAIL_PATTERN, 'email is not valid'],
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    match: [PASSWORD_PATTERN, 'password needs at least 8 chars']
  }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_WORK_FACTOR)
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
}


const User = mongoose.model('User', userSchema);
module.exports = User;
