require('dotenv').config()
const axios = require('axios')

const tts = async (text) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVEN_LABS_API_KEY
        },
        responseType: 'arraybuffer'
    };

    const data = { text }

    try {
      const response = await axios.post('https://api.elevenlabs.io/v1/text-to-speech/yoZ06aMxZJJ28mfd3POQ', data, options)
      return response.data
    //   fs.writeFileSync('output_audio.wav', response.data)
    } catch (error) {   
      console.log(error)
    }
}

module.exports = tts