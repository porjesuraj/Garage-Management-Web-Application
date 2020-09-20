const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')
const morgan = require('morgan')

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const employeeRouter = require('./employee/routes/employee')

const app = express()
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
    apis: ['./employee/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


// ------------------------------------------------

function getUserId(request, response, next) {

    if (request.url == '/employee/signup'
        || request.url == '/employee/signin'
    ) {
        next()
    } else {
        try {
            const token = request.headers['token']
            const data = jwt.verify(token, config.secret)

            request.userId = data['emp_id']

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


// ----------------default route----------------
app.get('/', (request, response) => {
    response.send('Welcome to employee panel')
})

// ----------------listen in port----------------
app.listen(3000, '0.0.0.0', () => {
    console.log('employee server started on 3000');
})