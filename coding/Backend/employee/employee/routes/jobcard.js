const { request, response } = require('express')
const express = require('express')

const db = require('../../db')
const utils = require('../../utils')

// --------export router--------
const router = express.Router()

// ------------------------------------------------------------------------------------------
// ------------------------------             GET              ------------------------------
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
 *       - name: customerServices_id
 *         description: id of servicing.
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: successfull message
 */
router.get('/', (request, response) => {

    const { customer_id, customerServices_id } = request.body

    const statement = ` 
            SELECT sd.service_details_id, sd.service_id, p.productName, sd.price, sd.quantity, sd.totalAmount,
            (sd.totalAmount * 0.18) as 'tax',
            (1.18 * sd.totalAmount) as 'total Amount',
            (cs.totalAmount + cs.tax) as 'Bill Amount'
            FROM service_details sd INNER JOIN products p
                ON sd.product_id = p.product_id
                INNER JOIN customer_services cs
                ON cs.customerServices_id = sd.customerServices_id
            WHERE sd.customer_id = 1 and sd.customerServices_id = 6
    UNION
            SELECT sd.service_details_id, s.serviceName, sd.product_id, sd.price, sd.quantity, sd.totalAmount,
                (sd.totalAmount * 0.18) as 'tax',
                (1.18 * sd.totalAmount) as 'total Amount',
                (cs.totalAmount + cs.tax) as 'Bill Amount'
            FROM service_details sd INNER JOIN services s
                ON sd.service_id = s.service_id
                INNER JOIN customer_services cs
                ON cs.customerServices_id = sd.customerServices_id
            WHERE sd.customer_id = ${customer_id} and sd.customerServices_id = ${customerServices_id} `

    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })

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

    const { customer_id, serviceStatus, paymentType, products, services } = request.body

    const statementBooking = ` insert into customer_services (customer_id, serviceStatus, paymentType ) values ( '${customer_id}', '${serviceStatus}', '${paymentType}'  )`

    db.query(statementBooking, (error, data) => {
        const cusServId = data['insertId']

        let statementProduct = `INSERT INTO service_details (customer_id, customerServices_id, product_id, price, quantity, totalAmount) values `

        let totalPrice = 0

        for (let index = 0; index < products.length; index++) {
            const product = products[index];

            if (index > 0) { statementProduct += ', ' }

            statementProduct += `( 
                    ${customer_id}, ${cusServId}, ${product['product_id']}, ${product['price']}, ${product['quantity']}, ${product['price'] * product['quantity']} )`

            totalPrice += (product['price'] * product['quantity'])
        }

        db.query(statementProduct, (error, data) => {

            let statementServices = `INSERT INTO service_details (customer_id, customerServices_id, service_id, price, quantity, totalAmount) values `

            for (let index = 0; index < services.length; index++) {
                const service = services[index];

                if (index > 0) { statementServices += ', ' }

                statementServices += `( 
                        ${customer_id}, ${cusServId}, ${service['service_id']}, ${service['price']}, ${service['quantity']}, ${service['price'] * service['quantity']} )`

                totalPrice += (service['price'] * service['quantity'])
            }

            db.query(statementServices, (error, data) => {
                let tax = (0.18 * totalPrice)
                let statementUpdate = `UPDATE customer_services SET totalAmount = ${totalPrice} , tax = ${tax}   where customerServices_id = ${cusServId}`

                db.query(statementUpdate, (error, data) => {
                    response.send(utils.createSuccess('Jobcard Created'))
                })

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
 * /employee/jobcard/:customerServices_id:
 *   put:
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
router.put('/:customerServices_id', (request, response) => {

    const { customerServices_id } = request.params
    const { service_details_id, customer_id, totalAmount, tax, serviceStatus, paymentType, products, services } = request.body

    console.log("request.params = ");
    console.log(request.params);
    console.log("request.body = ");
    console.log(request.body);

    const statementBooking = ` UPDATE customer_services SET 
            customer_id = '${customer_id}', 
            totalAmount = '${totalAmount}',
            tax = '${tax}',
            serviceStatus = '${serviceStatus}',
            paymentType = '${paymentType}'
            where customerServices_id = ${customerServices_id}   `

    db.query(statementBooking, (error, data) => {

        const type = ` SELECT service_id FROM service_details WHERE service_details_id = ${service_details_id} `

        const statementUpdate = `   UPDATE service_details SET `

        if (type == 'NULL') {
            statementUpdate += ` product_id = ${product['product_id']}, 
                price = ${product['price']},
                quantity = ${product['quantity']},
                totalAmount = ${product['price'] * product['quantity']}
                where customerServices_id = ${customerServices_id}      `
        }
        else {
            statementUpdate += ` service_id = ${service['service_id']},
                price = ${service['price']},
                quantity = ${service['quantity']},
                totalAmount = ${service['price'] * service['quantity']}
                where customerServices_id = ${customerServices_id}`
        }

    })

    db.query(statementUpdate, (error, data) => {

        console.log("error = ");
        console.log(error);
        console.log("data = ");
        console.log(data);
        response.send(utils.createSuccess('jobcard updated'))
        console.log(data);


    })
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