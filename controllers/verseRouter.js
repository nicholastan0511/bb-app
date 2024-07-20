const verseRouter = require('express').Router();
const { generateVerse } = require('../utils/gemini');
const tts = require('../utils/tts');

verseRouter.get('/', async (req, res) => {
  const queryParams = req.query;
  if (queryParams.mood) {
    try {
      let result = await generateVerse(queryParams.mood);
      res.send(result);
    } catch (err) {
      res.status(500).send({ error: err.message, statusCode: 500 });
    }
  }
});

verseRouter.post('/audio', async (req, res) => {
  const text = req.body.text;
  try {
    const audio = await tts(text);
    res.send(audio);
  } catch (error) {
    console.log(error);
  }
});

module.exports = verseRouter;
