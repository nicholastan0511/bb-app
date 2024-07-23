const verseRouter = require('express').Router();
const { generateVerse } = require('../utils/gemini');
const tts = require('../utils/tts');

verseRouter.get('/', async (req, res, next) => {
  const queryParams = req.query;
  if (queryParams.mood) {
    try {
      let result = await generateVerse(queryParams.mood);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
});

verseRouter.post('/audio', async (req, res, next) => {
  const text = req.body.text;
  try {
    const audio = await tts(text);
    res.send(audio);
  } catch (err) {
    next(err);
  }
});

module.exports = verseRouter;
