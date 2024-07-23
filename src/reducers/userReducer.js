import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';
import { resetError, setError } from './errorReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    signOut: (state, action) => {
      localStorage.clear();
      return {};
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
      localStorage.setItem('loggedUserInfo', result);
    } catch (err) {
      dispatch(
        setError({
          message: err.response.data.error,
          type: 'userError',
        })
      );
      setTimeout(() => {
        resetError();
      }, 5000);
    }
  };
};

export const handleUserLogin = (creds) => {
  return async (dispatch) => {
    try {
      const result = await userService.login(creds);
      dispatch(setUser(result));
      localStorage.setItem('loggedUserInfo', JSON.stringify(result));
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
