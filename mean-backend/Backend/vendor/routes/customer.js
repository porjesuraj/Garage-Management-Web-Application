const { request, response } = require('express')
const express = require('express')
const db = require('../db')
const utils = require('../utils')

// --------export router--------
const router = express.Router()

// ------------------------------------------------------------------------------------------
// ------------------------------             GET              ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /vendor/customer/:customer_id:
 *   get:
 *     description: For listing a jobcards
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customer_id
 *         description: id of customer.
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: successfull message
 */

router.get('/:customer_id', (request, response) => {
    const { customer_id } = request.params
    const statement = `SELECT  CONCAT(firstName, " ", middleName, " ", lastName) as "Name", birthDate, contact, email, address, active from customer
        where customer_id = ${customer_id}      `

    db.query(statement, (error, data) => {
        console.log(data);
        response.send(utils.createResult(error, data))
    })

})

// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /vendor/customer/:
 *   get:
 *     description: For listing a jobcards
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successfull message
 */
router.get('/', (request, response) => {

    const statement = `SELECT  customer_id, CONCAT(firstName, " ", middleName, " ", lastName) as "Name", birthDate, contact, email, address, active from customer `

    db.query(statement, (error, data) => {
        console.log(data);
        response.send(utils.createResult(error, data))
    })
})

// ------------------------------------------------------------------------------------------
// ------------------------------            POST            ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /vendor/customer/register:
 *   post:
 *     description: For registering customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: first name of customer.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: middleName
 *         description: middle name of customer.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: last name of customer.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: birthDate
 *         description: birth date of customer.
 *         in: formData
 *         required: true
 *         type: date
 *       - name: contact
 *         description: contact number of customer.
 *         in: formData
 *         required: true
 *         type: number
 *       - name: email
 *         description: email id of customer.
 *         in: formData
 *         required: true
 *         type: date
 *       - name: address
 *         description: address of customer.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: password of customer.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successfull message
 */

router.post('/register', (request, response) => {

    const { firstName, middleName, lastName, birthDate, contact, email, address, password } = request.body

    const statement = `INSERT INTO customer (firstName, middleName, lastName, birthDate, contact, email, address, password) VALUES (
        '${firstName}','${middleName}','${lastName}','${birthDate}','${contact}', '${email}','${address}','${password}' 
        )`

    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})



// ------------------------------------------------------------------------------------------
// ------------------------------            PUT            ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /vendor/customer/:customer_id:
 *   put:
 *     description: to block/unblock customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customer_id
 *         description: id of customer.
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: successfull message
 */

router.put('/:customer_id', (request, response) => {

    const { customer_id } = request.params
    const activeStatement = `SELECT active from customer WHERE customer_id = ${customer_id} `
    
    db.query(activeStatement, (error, data) => {
        
        const setActive = data[0].active ? 0 : 1

        const customerStatement = `UPDATE customer Set active = ${setActive} WHERE customer_id = ${customer_id} `
        db.query(customerStatement, (error, data) => {
            response.send(utils.createResult(error, data))
        })

    })
})



// ------------------------------------------------------------------------------------------
// ------------------------------            DELETE            ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /vendor/customer/:customer_id:
 *   delete:
 *     description: For deleting customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customer_id
 *         description: customer id
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: successfull message
 */

router.delete('/:customer_id', (request, response) => {

    const { customer_id } = request.params

    const statement = `delete FROM customer WHERE customer_id = ${customer_id} `
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})


// ------------------------------------------------------------------------------------------
module.exports = router