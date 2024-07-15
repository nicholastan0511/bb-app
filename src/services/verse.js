import axios from "axios";

const fetchRandomVerse = async (mood) => {
  const result = await axios.get(`${BACKEND_URL}/verse?mood=${mood}`)
  return result.data
}

export default {
  fetchRandomVerse
}
