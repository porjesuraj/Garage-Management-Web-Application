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
 * /vendor/jobcard/:
 *   get:
 *     description: For listing a jobcards
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successfull message
 */

router.get('/', (request, response) => {

    const statement = `SELECT  customerServices_id as "Jobcard_id", customer_id, totalAmount as "Amount", tax as "Tax", 
        (totalAmount + tax) as "Bill Amount" , serviceStatus as "Status", paymentType from  customer_services
    `

    db.query(statement, (error, data) => {
        console.log(data);
        response.send(utils.createResult(error, data))
    })

})

// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /vendor/jobcard/invoice/:customerServices_id:
 *   get:
 *     description: For generating a invoice
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customerServices_id
 *         description: id of servicing.
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: successfull message
 */
router.get('/invoice/:customerServices_id', (request, response) => {
    const { customerServices_id } = request.params
    const statement = `SELECT cs.customerServices_id, c.customer_id, concat(c.firstName, " ", c.lastName) as "Name", 
    cs.totalAmount as "Amount", cs.tax as "Tax", (cs.totalAmount + cs.tax) as "Bill Amount", cs.serviceStatus, cs.paymentType
    FROM customer_services cs INNER JOIN customer c ON cs.customer_id = c.customer_id WHERE cs.customerServices_id = ${customerServices_id};
    `

    db.query(statement, (error, data) => {
        console.log(data);
        response.send(utils.createResult(error, data))
    })

})


// ------------------------------------------------------------------------------------------
// ------------------------------            DELETE            ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /vendor/jobcard/:customerService_id:
 *   delete:
 *     description: For deleting an jobcard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customerService_id
 *         description: customer service id (jobcard_id)
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: successfull message
 */

router.delete('/:customerService_id', (request, response) => {

    const { customerService_id } = request.params

    const customerStatement = `delete FROM customer_services WHERE customerServices_id = ${customerService_id} `
    db.query(customerStatement, (error, data) => {
        response.send(utils.createResult(error, data))
    })

})


// ------------------------------------------------------------------------------------------
module.exports = router