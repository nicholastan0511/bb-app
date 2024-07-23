import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';
import { setError } from './errorReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    signOut: (state, action) => {
      return '';
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const handleUserSignUp = (creds) => {
  return async (dispatch) => {
    try {
      const result = await userService.signUp(creds);
      dispatch(setUser(result));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const handleUserLogin = (creds) => {
  return async (dispatch) => {
    try {
      const result = await userService.login(creds);
      dispatch(setUser(result));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};
