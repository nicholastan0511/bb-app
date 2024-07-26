const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
  savedVerses: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Verse', required: false },
  ],
  generatedVerseCount: {
    type: Number,
    required: false,
  },
  notes: [
    {
      verse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Verse',
        required: true,
      },
      note: { type: String, required: false, minLength: 5 },
    },
  ],
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
