import axios from 'axios';

const fetchRandomVerse = async (mood) => {
  const result = await axios.get(`${BACKEND_URL}/verse?mood=${mood}`);
  return result.data;
};

const getVerseAudio = async (text) => {
  const result = await axios.post(
    `${BACKEND_URL}/verse/audio`,
    { text },
    { responseType: 'arraybuffer' }
  );

  return result.data;
};

export default {
  fetchRandomVerse,
  getVerseAudio,
};
