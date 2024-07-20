require('dotenv').config();
const express = require('express');
const app = express();
const verseRouter = require('./controllers/verseRouter');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// Start MongoDB
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(() => {
    console.log('error connecting to MongoDB');
  });

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

app.use('/api/verse', verseRouter);

app.get('*', (req, res) => {
  res.redirect(301, '/');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app;
