import axios from 'axios';

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const signUp = async (creds) => {
  const result = await axios.post(`${BACKEND_URL}/user`, creds);
  return result.data;
};

const login = async (creds) => {
  const result = await axios.post(`${BACKEND_URL}/login`, creds);
  return result.data;
};

const generateOneVerse = async () => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const result = await axios.post(`${BACKEND_URL}/user/verse`, {}, config);
  return result.data;
};

const fetchUserInfo = async () => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  const result = await axios.get(`${BACKEND_URL}/user`, config);
  return result.data;
};

export default {
  signUp,
  login,
  generateOneVerse,
  setToken,
  fetchUserInfo,
};
