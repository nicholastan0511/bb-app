const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else
    req.token = null
      
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  
  console.log(decodedToken)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  req.user = await User.findById(decodedToken.id)
  
  next()
}

module.exports = { tokenExtractor, userExtractor }