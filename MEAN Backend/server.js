const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')
const morgan = require('morgan')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


//routers required
const adminROuter = require('./routes/admin')
const customerRouter = require('./routes/customer')
const employeeRouter = require('./routes/employee')
const vendorRouter = require('./routes/vendor')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))


// ----------------swagger initialization----------------
const swaggerOptions = {
    definition: {
        info: {
            title: 'FASTWheels Server',
            version: '1.0.0',
            description: 'Online Garage Management Services'
        }
    },
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


// ------------------------------------------------

function getUserId(request, response, next) {

    if (request.url == '/admin/signup'
        || request.url == '/admin/signin'
        || request.url == '/vendor/signin'
        || request.url == '/employee/signin'
        || request.url == '/customer/signup'
        || request.url == '/customer/signin'
        || request.url.startsWith('/customer/activate')
    ) {
        next()
    } else {
        try {
            const token = request.headers['token']
            const data = jwt.verify(token, config.secret)
            request.userId = data['id']

            next()

        } catch (ex) {
            response.status(401)
            response.send({ status: 'error', error: 'RESTRICTED API' })
        }
    }
}
app.use(getUserId)

// ------------------------------------------------
app.use(express.static('images/'))
app.use('/employee', employeeRouter)
app.use('/admin', adminROuter)
app.use('/customer', customerRouter)
app.use('/vendor', vendorRouter)


// ----------------default route----------------
app.get('/', (request, response) => {
    response.send('Welcome to online garage')
})

// ----------------listen in port----------------
app.listen(3000, '0.0.0.0', () => {
    console.log('garage server started on 3000');
})