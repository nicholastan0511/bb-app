import React from "react";
import { useSelector } from "react-redux";

// import components
import Hero from "./Hero";
import MoodSection from "./MoodSection";
import Error from "./Error";

const moodList = [
  { mood: "motivated", emoji: "💪" },
  { mood: "joyful", emoji: "😄" },
  { mood: "grateful", emoji: "🙏" },
  { mood: "peaceful", emoji: "😌" },
  { mood: "hopeful", emoji: "🌟" },
  { mood: "inspired", emoji: "🌼" },
  { mood: "content", emoji: "😊" },
  { mood: "optimistic", emoji: "😃" },
  { mood: "energetic", emoji: "🚀" },
  { mood: "blessed", emoji: "🙌" }
];

const Home = () => {
  const error = useSelector(state => state.error)

  return (
    <div>
      { error.length > 0 ? <Error message={error} /> : null }
      <Hero />
      <MoodSection moodList={moodList} />
    </div>
  )
}

export default Home