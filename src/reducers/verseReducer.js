import { createSlice } from "@reduxjs/toolkit";
import verseService from "../services/verse";

const verseSlice = createSlice({
  name: 'verses',
  initialState: [],
  reducers: {
    setOneVerse: (state, action) => {
      return action.payload
    },
    resetVerse: (state, action) => {
      return []
    }
  }
})

export const { setOneVerse, resetVerse } = verseSlice.actions

export const fetchOneVerse = (mood) => {
  return async dispatch => {
    const verse = await verseService.fetchRandomVerse(mood)
    dispatch(setOneVerse(verse))
  }
}

export default verseSlice.reducer

