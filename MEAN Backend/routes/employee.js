const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')
const fs = require('fs')
const path = require('path')

const db = require('../db')
const utils = require('../utils')
const config = require('../config')
const mailer = require('../mailer')

const router = express.Router()


// ******************************************************************************EMPLOYEE******************************************************************************
// ********************************************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// ------------------------             GET/ Emp-profile             ------------------------
// ------------------------------------------------------------------------------------------
router.get('/profile', (request, response) => {
    const statement = `select id, vendor_id, firstName, lastName, birthDate, email from employee where id = '${request.userId}'`

    console.log(statement);

    db.query(statement, (error, employees) => {
        if (error) {
            response.send({ status: 'error', error: error })
        } else {
            if (employees.length == 0) {
                response.send({ status: 'error', error: 'Employee does not exist' })
            } else {
                const employee = employees[0]
                response.send(utils.createResult(error, employee))
            }
        }
    })
})

// ------------------------------------------------------------------------------------------
// -----------------------            POST/ Employee-Signin           -----------------------
// ------------------------------------------------------------------------------------------
router.post('/signin', (request, response) => {

    const { email, password } = request.body
    const encryptedPassword = crypto.SHA256(password)

    const statement = `select id, vendor_id, firstName, lastName, email, active from employee 
     where email = '${email}' and password = '${encryptedPassword}'   `

    db.query(statement, (error, employees) => {

        if (error) {
            response.send({ status: 'error', error: error })
        } else if (employees.length == 0) {
            response.send({ status: 'error', error: 'Employee does not exist' })
        } else {
            const emp = employees[0]

            if (emp['active'] == 1) {
                const token = jwt.sign({ id: emp['id'] }, config.secret)

                response.send(utils.createResult(error, {
                    firstName: emp['firstName'],
                    lastName: emp['lastName'],
                    token: token
                }))
            } else {
                response.send({ status: 'error', error: 'Your account is not active. Please contact Vendor' })
            }
        }
    })
})


// ------------------------------------------------------------------------------------------
// ----------------------         PUT/ Update-Employee-Profile         ----------------------
// ------------------------------------------------------------------------------------------
router.put('/', (request, response) => {
    const { firstName, lastName, birthDate, email, password } = request.body
    const encryptedPassword = crypto.SHA256(password)

    const statement = `select id, firstName, lastName, birthDate from employee
    where email = '${email}' and password = '${encryptedPassword}'   `

    console.log(statement);

    db.query(statement, (error, employees) => {

        if (error) {
            response.send({ status: 'error', error: error })
        } else if (employees.length == 0) {
            response.send({ status: 'error', error: 'Employee does not exist' })
        } else {
            const emp = employees[0]
            const empId = emp['id']

            const statement = ` update employee set
                firstName = '${firstName}',
                lastName = '${lastName}',
                birthDate = '${birthDate}',
                email = '${email}',
                password = '${encryptedPassword}'
                where id = '${empId}'   `

            db.query(statement, (error, data) => {
                response.send(utils.createResult(error, data))
            })
        }
    })
})


// ------------------------------------------------------------------------------------------
// ------------------------             DELETE/ Employee             ------------------------
// ------------------------------------------------------------------------------------------
router.delete('/', (request, response) => {

    const statement = `delete from employee where id = '${request.userId}'   `

    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })

})



// *************************************************************************JOBCARD MANAGEMENT*************************************************************************
// ********************************************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// --------------------------             GET/ Jobcard             --------------------------
// ------------------------------------------------------------------------------------------
router.get('/jobcard/', (request, response) => {

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
            WHERE sd.customer_id = ${customer_id} and sd.customerServices_id = ${customerServices_id}
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
// ----------------------             POST/ Create Jobcard             ----------------------
// ------------------------------------------------------------------------------------------
router.post('/jobcard/create', (request, response) => {

    const { customer_id, serviceStatus, paymentType, products, services } = request.body

    const productPriceArray = []
    const servicePriceArray = []

    for (let index = 0; index < products.length; index++) {
        let priceStatement = ` select productPrice from products where product_id = ${products[index]['product_id']} `
        db.query(priceStatement, (error, data) => {
            productPriceArray.push(data[0].productPrice)
            // console.log(productPriceArray);
        })
    }
    for (let index = 0; index < services.length; index++) {
        let priceStatement = ` select servicePrice from services where service_id = ${services[index]['service_id']} `
        db.query(priceStatement, (error, data) => {
            servicePriceArray.push(data[0].servicePrice)
            // console.log(servicePriceArray);
        })
    }

    const statementBooking = ` INSERT INTO customer_services (customer_id, serviceStatus, paymentType ) values ( '${customer_id}', '${serviceStatus}', '${paymentType}'  )`

    db.query(statementBooking, (error, data) => {

        const cusServId = data['insertId']

        let statementProduct = `INSERT INTO service_details (customer_id, customerServices_id, product_id, price, quantity, totalAmount) values `

        let totalPrice = 0

        for (let index = 0; index < products.length; index++) {
            const product = products[index];

            if (index > 0) { statementProduct += ', ' }

            statementProduct += `( 
                    ${customer_id}, ${cusServId}, ${product['product_id']}, ${productPriceArray[index]}, ${product['quantity']}, ${productPriceArray[index] * product['quantity']} )`

            totalPrice += (productPriceArray[index] * product['quantity'])
        }

        db.query(statementProduct, (error, data) => {

            let statementServices = `INSERT INTO service_details (customer_id, customerServices_id, service_id, price, quantity, totalAmount) values `

            for (let index = 0; index < services.length; index++) {
                const service = services[index];

                if (index > 0) { statementServices += ', ' }

                statementServices += `( 
                        ${customer_id}, ${cusServId}, ${service['service_id']}, ${servicePriceArray[index]}, ${service['quantity']}, ${servicePriceArray[index] * service['quantity']} )`

                totalPrice += (servicePriceArray[index] * service['quantity'])
            }

            db.query(statementServices, (error, data) => {
                let tax = (0.18 * totalPrice)
                let statementUpdate = `UPDATE customer_services SET totalAmount = ${totalPrice} , tax = ${tax}   WHERE customerServices_id = ${cusServId}`

                db.query(statementUpdate, (error, data) => {
                    response.send(utils.createSuccess('Jobcard Created'))
                })

            })
        })

    })
})


// ------------------------------------------------------------------------------------------
// ----------------------             PUT/ Update JobCard              ----------------------
// ------------------------------------------------------------------------------------------
router.put('/jobcard/:customerServices_id', (request, response) => {
    const { customerServices_id } = request.params
    const { service_details_id, customer_id, serviceStatus, paymentType, package } = request.body

    let statementBooking = ` UPDATE customer_services SET customer_id = '${customer_id}', serviceStatus = '${serviceStatus}', paymentType = '${paymentType}'
            WHERE customerServices_id = ${customerServices_id}  `

    db.query(statementBooking, (error, data) => {
        const getTotalAmount = `SELECT totalAmount FROM customer_services WHERE customerServices_id = ${customerServices_id}  `

        db.query(getTotalAmount, (error, data) => {
            const oldTotalAmount = (data[0].totalAmount);
            const packageStatement = `SELECT totalAmount, service_id FROM service_details WHERE service_details_id = ${service_details_id}`

            db.query(packageStatement, (error, data) => {
                const oldPackageAmount = (data[0].totalAmount);
                const type = (data[0].service_id);

                if (type == null) {
                    let priceStatement = ` select productPrice from products where product_id = ${package['id']} `

                    db.query(priceStatement, (error, data) => {
                        const productPrice = (data[0].productPrice)

                        let packagePrice = (productPrice * package['quantity'])
                        const updatedTotalAmount = oldTotalAmount - oldPackageAmount + packagePrice
                        const updatedTax = (0.18 * updatedTotalAmount)

                        updatePackageStatement = `UPDATE service_details SET customer_id = ${customer_id}, product_id = ${package['id']}, price = ${productPrice},
                        quantity = ${package['quantity']}, totalAmount = ${productPrice * package['quantity']}
                        WHERE service_details_id = ${service_details_id}    `

                        db.query(updatePackageStatement, (error, data) => {
                            let statementUpdate = `UPDATE customer_services SET totalAmount = ${updatedTotalAmount} , tax = ${updatedTax}  
                                WHERE customerServices_id = ${customerServices_id}`

                            db.query(statementUpdate, (error, data) => {
                                response.send(utils.createSuccess('Successfully updated'))
                            })
                        })
                    })

                } else {
                    let priceStatement = ` select servicePrice from services where service_id = ${package['id']} `
                    db.query(priceStatement, (error, data) => {
                        const servicePrice = (data[0].servicePrice)
                        let packagePrice = (servicePrice * package['quantity'])
                        const updatedTotalAmount = oldTotalAmount - oldPackageAmount + packagePrice
                        const updatedTax = (0.18 * updatedTotalAmount)

                        updatePackageStatement = `UPDATE service_details SET customer_id = ${customer_id}, product_id = ${package['id']}, price = ${servicePrice},
                        quantity = '${package['quantity']}', totalAmount = '${servicePrice * package['quantity']}',
                        WHERE service_details_id = ${service_details_id}    `

                        db.query(updatePackageStatement, (error, data) => {
                            let statementUpdate = `UPDATE customer_services SET totalAmount = ${updatedTotalAmount} , tax = ${updatedTax}  
                                WHERE customerServices_id = ${customerServices_id}`

                            db.query(statementUpdate, (error, data) => {
                                response.send(utils.createSuccess('Successfully updated'))
                            })
                        })

                    })
                }
            })
        })
    })
})


// ------------------------------------------------------------------------------------------
// --------------------------            DELETE/ JobCard           --------------------------
// ------------------------------------------------------------------------------------------
router.delete('/jobcard/:customerService_id', (request, response) => {

    const { customerService_id } = request.params

    const customerStatement = `delete FROM customer_services WHERE customerServices_id = ${customerService_id} `
    db.query(customerStatement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})



// *************************************************************************JOBCARD MANAGEMENT*************************************************************************
// ********************************************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// ------------------------            GET/ All Feedbacks            ------------------------
// ------------------------------------------------------------------------------------------
router.get('/feedback/', (request, response) => {

    const statement = ` SELECT f.feedback_id, CONCAT(c.firstName , ' ' , c.middleName , ' ' , c.lastName ) AS 'Customer Name', f.feedback
    FROM feedback f INNER JOIN customer c ON f.customer_id = c.id;  `

    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })

})



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = router