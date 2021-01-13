const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')

const db = require('../../db')
const utils = require('../../utils')
const config = require('../../config')
const mailer = require('../../mailer')

const fs = require('fs')
const path = require('path')


// --------export router--------
const router = express.Router()

// ------------------------------------------------------------------------------------------
// ------------------------------             GET              ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /employee/profile:
 *   get:
 *     description: For getting employee profile
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successfull message
 */

router.get('/profile', (request, response) => {

    const statement = `select emp_id, firstName, lastName, borthDate, email from employee 
        where emp_id = ${request.userId}`

    db.query(statement, (error, employees) => {
        if (error) {
            response.send({ status: 'error', error: error })
        } else {
            if (employees.length == 0) {
                response.send({ status: 'error', error: 'Employee does not exist' })
            } else {
                const emp = employees[0]
                response.send(utils.createResult(error, emp))
            }
        }
    })

})


// ------------------------------------------------------------------------------------------
// ------------------------------            POST              ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /employee/signup:
 *   post:
 *     description: For signing up an employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: vendor_id
 *         description: id of vendor
 *         in: formData
 *         required: true
 *         type: number
 *       - name: firstName
 *         description: first name of employee user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lasttName
 *         description: last name of employee user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: birthDate
 *         description: birthdate of employee user.
 *         in: formData
 *         required: true
 *         type: date
 *       - name: email
 *         description: email of employee user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: employee's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successfull message
 */
router.post('/signup', (request, response) => {
    const { vendor_id, firstName, lastName, birthDate, email, password } = request.body
    const encryptedPassword = crypto.SHA256(password)

    const htmlPath = path.join(__dirname, '/../templates/welcome.html')
    let body = '' + fs.readFileSync(htmlPath)
    body = body.replace('{firstName}', firstName)
    body = body.replace('{Name}', firstName)

    const statement = `insert into employee (vendor_id, firstName, lastName, birthDate, email, password)
    values ('${vendor_id}', '${firstName}', '${lastName}', '${birthDate}', '${email}', '${encryptedPassword}')   `


    db.query(statement, (error, data) => {
        mailer.sendEmail(email, 'Welcome to FastWheels', body, (error, info) => {
            console.log(error);
            console.log(info);
            response.send(utils.createResult(error, data))
        })
    })

})

// -------------------------------------------------------------------------
/**
 * @swagger
 *
 * /employee/signin:
 *   post:
 *     description: For signing in an employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email of employee user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: employee's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successfull singin
 */

router.post('/signin', (request, response) => {

    const { email, password } = request.body
    const encryptedPassword = crypto.SHA256(password)

    const statement = `select emp_id, vendor_id, firstName, lastName, email, active from employee 
     where email = '${email}' and password = '${password}'   `
    // where email = '${email}' and password = '${encryptedPassword}'   

    db.query(statement, (error, employees) => {

        if (error) {
            response.send({ status: 'error', error: error })
        } else if (employees.length == 0) {
            response.send({ status: 'error', error: 'Employee does not exist' })
        } else {
            const emp = employees[0]

            if (emp['active'] == 1) {
                const token = jwt.sign({ emp_id: emp['emp_id'] }, config.secret)

                response.send(utils.createResult(error, {
                    firstName: emp['firstName'],
                    lastName: emp['lastName'],
                    token: token
                }))
            } else {
                response.send({ status: 'error', error: 'You are not active. Please contact Vendor' })
            }
        }

    })

})


// ------------------------------------------------------------------------------------------
// ------------------------------             PUT              ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /employee/:
 *   put:
 *     description: For updating an employee profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: vendor_id
 *         description: id of vendor
 *         in: formData
 *         required: true
 *         type: number
 *       - name: firstName
 *         description: first name of employee user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lasttName
 *         description: last name of employee user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: birthDate
 *         description: birthdate of employee user.
 *         in: formData
 *         required: true
 *         type: date
 *       - name: email
 *         description: email of employee user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: employee's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successfull message
 */

router.put('/', (request, response) => {
    const { vendor_id, firstName, lastName, birthDate, email, password } = request.body
    const encryptedPassword = crypto.SHA256(password)


    const statement = `select emp_id, vendor_id, firstName, lastName, birthDate from employee
    where email = '${email}' and password = '${encryptedPassword}'   `


    db.query(statement, (error, employees) => {

        if (error) {
            response.send({ status: 'error', error: error })
        } else if (employees.length == 0) {
            response.send({ status: 'error', error: 'Employee does not exist' })
        } else {
            const emp = employees[0]
            const empId = emp['emp_id']

            const statement = ` update employee set
                vendor_id = '${vendor_id}',
                firstName = '${firstName}',
                lastName = '${lastName}',
                birthDate = '${birthDate}',
                email = '${email}',
                password = '${encryptedPassword}'
                where emp_id = '${empId}'   `

            db.query(statement, (error, data) => {
                response.send(utils.createResult(error, data))
            })
        }

    })

})


// ------------------------------------------------------------------------------------------
// ------------------------------            DELETE            ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /employee/:empId:
 *   delete:
 *     description: For deleting an employee user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: emp_id
 *         description: id of employee
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: successfull message
 */

router.delete('/:empId', (request, response) => {
    const { empId } = request.params

    const statement = `delete from employee where emp_id = '${empId}'   `

    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })

})

// ------------------------------------------------------------------------------------------
module.exports = router