import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';
import { setError, resetError } from './errorReducer';

const userSlice = createSlice({
  name: 'userStats',
  initialState: {},
  reducers: {
    initializeUser: (state, action) => {
      return action.payload;
    },
    generateOneVerse: (state, action) => {
      const user = {
        ...state,
        generatedVerseCount: action.payload.generatedVerseCount,
      };
      return user;
    },
    saveOneVerse: (state, action) => {
      state.savedVerses.push(action.payload);
      return;
    },
    deleteOneVerse: (state, action) => {
      const newState = {
        ...state,
        savedVerses: state.savedVerses.filter(
          (verse) => verse._id.toString() !== action.payload.toString()
        ),
      };

      return newState;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
      return;
    },
  },
});

export const {
  initializeUser,
  generateOneVerse,
  saveOneVerse,
  deleteOneVerse,
  addNote,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUserInfo = () => {
  return async (dispatch) => {
    const user = await userService.fetchUserInfo();
    console.log(user);
    dispatch(initializeUser(user));
  };
};

export const handleUserGenerateVerse = () => {
  return async (dispatch) => {
    try {
      const result = await userService.generateOneVerse();
      dispatch(generateOneVerse(result));
    } catch (err) {
      dispatch(
        setError({
          message: err.message,
          type: 'serverError',
        })
      );
      setTimeout(() => {
        dispatch(resetError());
      }, 5000);
    }
  };
};

export const handleUserSaveVerse = (obj) => {
  return async (dispatch) => {
    try {
      const result = await userService.saveVerse(obj);
      dispatch(saveOneVerse(result));
    } catch (err) {
      dispatch(
        setError({
          message: err.response.data.error,
          type: 'userError',
        })
      );
      setTimeout(() => {
        dispatch(resetError());
      }, 5000);
    }
  };
};

export const handleUserDeleteSavedVerse = (verseId) => {
  return async (dispatch) => {
    try {
      await userService.deleteSavedVerse(verseId);
      dispatch(deleteOneVerse(verseId));
    } catch (err) {
      dispatch(
        setError({
          message: err.response.data.error,
          type: 'serverError',
        })
      );
      setTimeout(() => {
        dispatch(resetError());
      }, 5000);
    }
  };
};

export const handleUserAddNote = (note, verseId) => {
  return async (dispatch) => {
    try {
      const savedNote = await userService.addNote(note, verseId);
      dispatch(addNote(savedNote));
    } catch (err) {
      dispatch(
        setError({
          message: err.response.data.error,
          type: 'userError',
        })
      );
      setTimeout(() => {
        dispatch(resetError());
      }, 5000);
    }
  };
};
