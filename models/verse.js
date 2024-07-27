const mongoose = require('mongoose');

// Define the schema for a saved verse
const verseSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 3, // Adjust as needed
  },
  verse: {
    type: String,
    required: true,
  },
  book: {
    type: String,
    required: true,
  },
  'gen-z_version': {
    type: String,
    required: false,
  },
  context: {
    type: String,
    required: false,
  },
  mood: {
    type: String,
    required: true,
  },
  userId: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
});

const Verse = mongoose.model('Verse', verseSchema);

module.exports = Verse;
