import axios from 'axios';

const signUp = async (creds) => {
  const result = await axios.post(`${BACKEND_URL}/user`, creds);
  return result.data;
};

const login = async (creds) => {
  const result = await axios.post(`${BACKEND_URL}/login`, creds);
  return result.data;
};

export default {
  signUp,
  login,
};
