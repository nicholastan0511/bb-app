import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {},
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    resetError: (state, action) => {
      return {};
    },
  },
});

export const { setError, resetError } = errorSlice.actions;

export default errorSlice.reducer;
