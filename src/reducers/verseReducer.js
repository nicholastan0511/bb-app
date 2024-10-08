import { createSlice } from '@reduxjs/toolkit';
import verseService from '../services/verse';
import { setError, resetError } from './errorReducer';

const verseSlice = createSlice({
  name: 'verses',
  initialState: [],
  reducers: {
    setOneVerse: (state, action) => {
      return action.payload;
    },
    resetVerse: (state, action) => {
      return [];
    },
  },
});

export const { setOneVerse, resetVerse } = verseSlice.actions;

export const fetchOneVerse = (mood) => {
  return async (dispatch) => {
    try {
      const verse = await verseService.fetchRandomVerse(mood);
      dispatch(setOneVerse(verse));
    } catch (err) {
      dispatch(
        setError({
          message: err.response ? err.response.data.error : null,
          error: err.message,
          type: 'serverError',
        })
      );
      setTimeout(() => {
        dispatch(resetError());
      }, 5000);
    }
  };
};

export default verseSlice.reducer;
