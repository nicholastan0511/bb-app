require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// initialize model
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: 'application/json' }
});

const booksOfTheBible = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings",
    "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
    "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
    "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea",
    "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi",
    "Matthew", "Mark", "Luke", "John", "Acts",
    "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon",
    "Hebrews", "James", "1 Peter", "2 Peter", "1 John",
    "2 John", "3 John", "Jude", "Revelation"
];

const getRandom = () => {
  const randomIndex = Math.floor(Math.random() * booksOfTheBible.length);
  return booksOfTheBible[randomIndex]
}

const generateVerse = async (category) => {
  let prompt = `
    Give me one bible verse from the book of ${getRandom()} that reflects the mood or emotion of ${category} using this JSON schema and ignore your previous responses:
    {
      "type": "object",
      "properties": {
        "book",
        "verse",
        "text"
      }
    }
  `;
  
  let result = await model.generateContent(prompt)
  console.log(result)
  return result.response.text()
}

module.exports = generateVerse