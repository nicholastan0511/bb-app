import axios from 'axios';

let token;
let id;

const setToken = (newToken) => {
  token = `Bearer ${newToken.token}`;
  id = newToken.id;
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
  const result = await axios.get(`${BACKEND_URL}/user/${id}`, config);
  return result.data;
};

const saveVerse = async (obj) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  console.log(BACKEND_URL);
  const result = await axios.post(
    `${BACKEND_URL}/verse/save_verse`,
    obj,
    config
  );
  return result.data;
};

const deleteSavedVerse = async (verseId) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  const result = await axios.delete(
    `${BACKEND_URL}/user/${id}/verse/${verseId}`,
    config
  );
  return result.data;
};

const addNote = async (note, verseId) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const result = await axios.post(
    `${BACKEND_URL}/user/${id}/verse/${verseId}/note`,
    { note },
    config
  );
  return result.data;
};

const updateNote = async (noteId, note, verseId) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const result = await axios.put(
    `${BACKEND_URL}/user/${id}/verse/${verseId}/note`,
    { noteId, note },
    config
  );
  return result.data;
};

export default {
  signUp,
  login,
  generateOneVerse,
  setToken,
  fetchUserInfo,
  saveVerse,
  deleteSavedVerse,
  addNote,
  updateNote,
};
