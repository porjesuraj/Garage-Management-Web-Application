const express  = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('./config')




const vendorRouter = require('./routes/vendor')
<<<<<<< HEAD
const employeeRouter = require('./routes/employee')
const customerRouter = require('./routes/customer')
=======
const jobcardRouter = require('./routes/jobcard')
>>>>>>> 2383f077e59833c1fad96a4804bf1e0b3b0c5e5a



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
<<<<<<< HEAD
app.use('/employee', employeeRouter)
app.use('/customer', customerRouter)

=======
app.use('/vendor/jobcard', jobcardRouter)
>>>>>>> 2383f077e59833c1fad96a4804bf1e0b3b0c5e5a



app.get('/', (request, response) => {
  response.send('welcome to Garage Management System')
})


app.listen (3000, '0.0.0.0', () => {
    console.log('Server started on 3000');
  })