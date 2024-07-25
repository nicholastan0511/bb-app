const verseRouter = require('express').Router();
const { generateVerse } = require('../utils/gemini');
const tts = require('../utils/tts');
const middleware = require('../utils/middleware');
const Verse = require('../models/verse');

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

verseRouter.post(
  '/save_verse',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;

      if (
        !body.book ||
        !body.text ||
        !body.verse ||
        !body['gen-z_version'] ||
        !body.context ||
        !body.mood
      ) {
        res.status(400).json({ error: 'Missing required fields' });
      }

      // Check if the verse already exists in the Verse Collection
      let existingVerse = await Verse.findOne({ ...body });

      // If the verse doesn't exist in the Verse Collection, create a new one
      if (!existingVerse) {
        existingVerse = new Verse({ ...body, userId: user.id });
        await existingVerse.save();
      }

      // check if the verse is already saved by user in the User Collection
      const userAlreadySavedVerse = user.savedVerses.filter(
        (verse) => verse._id.toString() === existingVerse._id.toString()
      );

      if (userAlreadySavedVerse.length !== 0) {
        return res
          .status(409)
          .json({ error: 'Verse already saved by this user' });
      }

      // save the verse to user's saved verses in the User Collection
      user.savedVerses.push(existingVerse._id);
      await user.save();

      res.status(200).send(existingVerse);
    } catch (err) {
      res.status(500).json({ error: 'Save failed' });
      next(err);
    }
  }
);

module.exports = verseRouter;
