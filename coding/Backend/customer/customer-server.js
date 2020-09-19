const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')


const customerRouter = require('./customer/routes/customer')
const config = require('./config')
const utils = require('./utils')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())

//middleware

function getCustomerId(request,response,next) 
{
   if(request.url == '/customer/signup'
   || request.url == '/customer/signin'
   || request.url.startsWith('/customer/activate')
   || request.url == '/logo.jpg')
   {
       next()
   }
   else
   {
   try {

    const token = request.headers['token']
    const data = jwt.verify(token,config.secret)
   
    request.customerId = data['id']
      next()
   } catch(ex) {

    response.status(401)
    response.send(utils.createError('protected customer api  '))
               }
   }
}

app.use(getCustomerId)



app.use(express.static('images/'))
//routes
app.use('/customer',customerRouter)

app.get('/',(request,response) => {
    response.send('welcome to applicaiton')
})


app.listen(3000,'0.0.0.0',() => {

    console.log(`server started on port 3000`)
})