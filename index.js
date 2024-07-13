const app = require('./app') // the actual Express application
require('dotenv').config()

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
