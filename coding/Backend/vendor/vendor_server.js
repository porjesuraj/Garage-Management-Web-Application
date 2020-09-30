const express  = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('./config')




const vendorRouter = require('./routes/vendor')
const jobcardRouter = require('./routes/jobcard')



const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

// add a middleware for getting the id from token
function getUserId(request, response, next) {

  if (request.url == '/vendor/signin') {
    next()
  } else {

    try {
      const token = request.headers['token']
      const data = jwt.verify(token, config.secret)

      request.Id = data['vendor_id']

      next()
      
    } catch (ex) {
      response.status(401)
      response.send({status: 'error', error: 'protected api'})
    }
  }
}

app.use(getUserId)



app.use('/vendor', vendorRouter)
app.use('/vendor/jobcard', jobcardRouter)



app.get('/', (request, response) => {
  response.send('welcome to Garage Management System')
})


app.listen (3000, '0.0.0.0', () => {
    console.log('Server started on 3000');
  })