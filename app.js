const express = require('express')
const app = express()
const generateVerse = require('./utils/gemini')

app.use(express.static('build'))

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.get('/verse', async (req, res) => {
  const queryParams = req.query 
  if (queryParams.mood) {
    let result = await generateVerse(queryParams.mood)
    console.log(result)
    res.send(result)
  }
})


module.exports = app;


