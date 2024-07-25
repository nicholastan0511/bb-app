require('dotenv').config();
const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
const Verse = require('../models/verse');

userRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  try {
    const savedUser = await user.save();

    const userForToken = {
      username: savedUser.username,
      id: savedUser.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(201).json({ token, ...userForToken });
  } catch (err) {
    next(err);
  }
});

userRouter.post(
  '/verse',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res, next) => {
    const user = req.user;
    try {
      user.generatedVerseCount++;
      const result = await user.save();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res, next) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.delete(
  '/:userId/verse/:verseId',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res, next) => {
    try {
      const { verseId } = req.params;
      const user = req.user;

      // check if verse is within user's saved verses
      const verseToBeDeleted = user.savedVerses.filter(
        (verse) => verse.id === verseId
      );

      // if verse is not within user's saved verses
      if (verseToBeDeleted.length === 0) {
        return res
          .status(500)
          .json({ error: "Unable to delete a verse you didn't save" });
      }

      // remove verse from user's saved verses
      user.savedVerses = user.savedVerses.filter(
        (verse) => verse.id !== verseId
      );
      await user.save();

      // Check if the verse is still referenced by any other users
      const usersReferencingVerse = await User.find({ savedVerses: verseId });

      if (usersReferencingVerse.length === 0) {
        // If no users are referencing the verse, delete it from the Verse collection
        await Verse.findByIdAndDelete(verseId);
        res.status(200).json({
          message: 'Verse removed from saved verses and deleted successfully',
        });
      } else {
        // If other users are still referencing the verse, just respond successfully
        res.status(200).json({
          message:
            'Verse removed from saved verses but still referenced by other users',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = userRouter;
