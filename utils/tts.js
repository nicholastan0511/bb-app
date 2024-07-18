require('dotenv').config()
const axios = require('axios')

const tts = async (text) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVEN_LABS_API_KEY
        },
    };

    const data = { text: 't' }

    const response = await axios.post('https://api.elevenlabs.io/v1/text-to-speech/yoZ06aMxZJJ28mfd3POQ', data, options)
    console.log(response.data)
}

tts()