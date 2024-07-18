const express = require('express')
const app = express()
const { generateVerse } = require('./utils/gemini')
const path = require('path')
const cors = require('cors')
const tts = require('./utils/tts')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/verse', async (req, res) => {
  const queryParams = req.query 
  if (queryParams.mood) {
    try {
      let result = await generateVerse(queryParams.mood)
      res.send(result)
    } catch (err) {
      res.status(500).send({ error: err.message, statusCode: 500 })
    }
  }
})

app.post('/api/verse/audio', async (req, res) => {
  const text = req.body.text
  try {
    const audio = await tts(text)
    res.send(audio)
  } catch(error) {
    console.log(error)
  }


  // console.log(audio)

  
})  


app.get('*', (req, res) => {
  res.redirect(301, '/')
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// app.get('/error', async (req, res) => {
//   try {
//     let result = await errorTest()
//     res.send(result)
//   } catch (err) {
//     console.log(err)
//     res.status(500).send({ error: err.message, statusCode: 500 })
//   }

// })

module.exports = app;


