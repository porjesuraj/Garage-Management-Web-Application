const express = require('express')
const customerRouter = require('./customer/routes/customer')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()


//middleware
app.use(morgan('combined'))
app.use(bodyParser.json())
//routes
app.use('/customer',customerRouter)

app.get('/',(request,response) => {
    response.send('welcome to applicaiton')
})


app.listen(3000,'0.0.0.0',() => {

    console.log(`server started on port 3000`)
})