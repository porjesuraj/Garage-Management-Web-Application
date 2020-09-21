const { request, response } = require('express')
const express = require('express')

const db = require('../../db')
const utils = require('../../utils')

// --------export router--------
const router = express.Router()

// ------------------------------------------------------------------------------------------
// ------------------------------             GET              ------------------------------
// ------------------------------------------------------------------------------------------

router.get('/', (request, response) => {
    response.send('indide get/jobcard')
})


// ------------------------------------------------------------------------------------------
// ------------------------------            POST              ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /employee/jobcard/create:
 *   post:
 *     description: For creating a jobcard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customer_id
 *         description: id of customer
 *         in: formData
 *         required: true
 *         type: number
 *       - name: totalAmount
 *         description: Total Amount of services + products.
 *         in: formData
 *         required: true
 *         type: number
 *       - name: tax
 *         description: tax on totalAmount.
 *         in: formData
 *         required: true
 *         type: number
 *       - name: serviceStatus
 *         description: status of servicing.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: paymentType
 *         description: mode of payment.
 *         in: formData
 *         required: true
 *         type: string
*       - name: products
 *         description: list of products that to be replaces.
 *         in: formData
 *         required: true
 *         type: object
 *         properties:
 *          product_id:
 *            type: integer
 *          price:
 *           type: integer
 *          quantity:
 *           type: integer
 *       - name: services
 *         description: list of services given to customer.
 *         in: formData
 *         required: true
 *         type: object
 *         properties:
 *          service_id:
 *            type: integer
 *          price:
 *           type: integer
 *          quantity:
 *           type: integer
 *     responses:
 *       200:
 *         description: successfull message
 */
router.post('/create', (request, response) => {

    const { customer_id, totalAmount, tax, serviceStatus, paymentType, products, services } = request.body

    const statementBooking = ` insert into customer_services (customer_id, totalAmount, tax, serviceStatus, paymentType ) values 
            ( '${customer_id}', '${totalAmount}', '${tax}', '${serviceStatus}', '${paymentType}'  )`

    db.query(statementBooking, (error, data) => {
        const cusServId = data['insertId']

        let statementProduct = `INSERT INTO service_details (customer_id, customerServices_id, service_id ,product_id, price, quantity, totalAmount) values `

        for (let index = 0; index < products.length; index++) {
            const product = products[index];

            if (index > 0) { statementProduct += ', ' }

            statementProduct += `( 
                    ${customer_id}, ${cusServId}, 1, ${product['product_id']}, ${product['price']}, ${product['quantity']}, ${product['price'] * product['quantity']} 
                )`
        }

        db.query(statementProduct, (error, data) => {
            console.log("product_data = ");
            console.log(data);

            let statementServices = `INSERT INTO service_details (customer_id, customerServices_id, service_id ,product_id, price, quantity, totalAmount) values `

            for (let index = 0; index < services.length; index++) {
                const service = services[index];

                if (index > 0) { statementServices += ', ' }

                statementServices += `( 
                        ${customer_id}, ${cusServId}, ${service['service_id']}, 1, ${service['price']}, ${service['quantity']}, ${service['price'] * service['quantity']} 
                    )`
            }

            db.query(statementServices, (error, data) => {
                response.send(utils.createSuccess('placed order'))
                console.log(data);
            })
        })

    })

})


// ------------------------------------------------------------------------------------------
// ------------------------------             PUT              ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /employee/jobcard/:
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
    response.send('inside put/jobcard')
})


// ------------------------------------------------------------------------------------------
// ------------------------------            DELETE            ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /employee/jobcard/:customerService_id:
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

/* router.delete('/:customerService_id', (request, response) => {

    const { customerService_id } = request.params

    const serviceDetailsId = `select service_details_id from service_details where customerService_id = ${customerService_id} `

    const customerStatement = `delete from customer_services where customerService_id = ${customerService_id} `
    db.query(customerStatement, (error, data) => {
        response.send(utils.createResult(error, data))
    })

    const serviceStatement = `delete from service_details where service_details_id = ${serviceDetailsId} `
    db.query(serviceStatement, (error, data) => {
        response.send(utils.createResult(error, data))
    })

}) */


// ------------------------------------------------------------------------------------------
module.exports = router