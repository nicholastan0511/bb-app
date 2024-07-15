import React from "react";

// import components
import Hero from "./Hero";
import MoodSection from "./MoodSection";

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

  return (
    <div>
      <Hero />
      <MoodSection moodList={moodList} />
    </div>
  )
}

export default Home