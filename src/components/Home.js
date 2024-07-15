import React, {useRef} from "react";
import verseService from '../services/verse'
import { useState } from "react";
import { Link } from 'react-scroll';

// components
import Hero from "./Hero";
import MoodSection from "./MoodSection";

const moodList = [
  "motivated", "joyful", "grateful", "peaceful", "hopeful",
  "inspired", "content", "optimistic", "energetic", "blessed"
];

const Home = () => {
  const [verse, setVerse] = useState(null)

  const handleClick = async (mood) => {
    try {
      const result = await verseService.fetchRandomVerse(mood)
      setVerse(result)
    } catch (e) {
      console.log(e)
    } 
  }

  return (
    <div>
      <Hero />
      <MoodSection handleClick={handleClick} moodList={moodList} />
      <section>
        {verse ? verse.text : null}
      </section>
    </div>
  )
}

export default Home