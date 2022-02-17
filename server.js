const express = require('express')
const history = require('connect-history-api-fallback')
const path = require('path')
const helmet = require('helmet')

const app = express()
app.use(history())
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'frame-ancestors': ["'self'", 'https://www.facebook.com/', 'https://www.messenger.com/']
    }
  }
}))
app.use(express.static(path.join(__dirname, 'dist')))

const port = process.env.PORT || 8000
app.listen(port)
console.log('Server started with port: ' + port)
