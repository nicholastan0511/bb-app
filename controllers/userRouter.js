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
  middleware.checkVerseExistenceInUser,
  async (req, res, next) => {
    try {
      const { verseId } = req.params;
      const user = req.user;

      // remove verse from user's saved verses
      user.savedVerses = user.savedVerses.filter(
        (verse) => verse.id !== verseId
      );

      // remove note attached to the verse
      user.notes = user.notes.filter(
        (note) => note.verse.toString() !== verseId
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

userRouter.post(
  '/:userId/verse/:verseId/note',
  middleware.tokenExtractor,
  middleware.userExtractor,
  middleware.checkVerseExistenceInUser,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { verseId } = req.params;
      const { note } = req.body;

      // check if there is already a note on said verse in User Collection
      const noteExistence = user.notes.findIndex(
        (note) => note.verse.toString() === verseId
      );

      if (noteExistence !== -1) {
        return res
          .status(500)
          .json({ error: 'A note was already created for this verse' });
      }

      // save note into User Collection
      user.notes.push({ verse: verseId, note });
      await user.save();

      res.status(201).send(user.notes[user.notes.length - 1]);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  '/:userId/verse/:verseId/note',
  middleware.tokenExtractor,
  middleware.userExtractor,
  middleware.checkVerseExistenceInUser,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { verseId } = req.params;
      const note = user.notes.filter(
        (note) => note.verse.toString() === verseId
      );

      if (note.length === 0) {
        return res.status(404).json({ error: 'Note not found' });
      }

      res.status(200).send(note);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.put(
  '/:userId/verse/:verseId/note',
  middleware.tokenExtractor,
  middleware.userExtractor,
  middleware.checkVerseExistenceInUser,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { noteId, note } = req.body;

      // Find the index of the note in the notes array
      const noteIndex = user.notes.findIndex(
        (n) => n._id.toString() === noteId
      );

      // Check if the note is inside User Collection
      if (noteIndex === -1) {
        return res.status(404).json({
          error: 'Note not found',
        });
      }

      // update note
      user.notes[noteIndex].note = note;
      await user.save();

      res.status(200).json({ message: 'Note has been updated' });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = userRouter;
