import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';

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
  },
});

export const { initializeUser, generateOneVerse } = userSlice.actions;

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
