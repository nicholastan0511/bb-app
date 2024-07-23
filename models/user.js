const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define the schema for a saved verse
const savedVerseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    minlength: 3, // Adjust as needed
  },
  text: {
    type: String,
    required: true,
    minlength: 3, // Adjust as needed
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: false,
    minLength: 3,
  },
  savedVerses: [savedVerseSchema],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
