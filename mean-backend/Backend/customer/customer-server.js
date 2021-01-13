const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')
//include routing 
const customerRouter = require('./customer/routes/customer')
const servicingRouter = require('./customer/routes/servicing')
const feebackRouter = require('./customer/routes/feedback')
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


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(express.static('images/'))
//routes
app.use('/customer',customerRouter)
app.use('/customer/servicing',servicingRouter)
app.use('/customer/feedback',feebackRouter)

app.get('/',(request,response) => {
    response.send('welcome to applicaiton')
})


app.listen(3000,'0.0.0.0',() => {

    console.log(`server started on port 3000`)
})