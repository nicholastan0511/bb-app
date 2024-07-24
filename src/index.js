import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './index.css';
import './styles/tailwind.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import verseSlice from './reducers/verseReducer';
import errorSlice from './reducers/errorReducer';
import userSlice from './reducers/userReducer';
import userStatsSlice from './reducers/userStatsReducer';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    verses: verseSlice,
    error: errorSlice,
    user: userSlice,
    userStats: userStatsSlice,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
