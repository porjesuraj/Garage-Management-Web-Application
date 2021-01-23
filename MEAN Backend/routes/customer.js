const express = require('express')
const crypto = require('crypto-js')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const db = require('../db')
const utils = require('../utils')
const mailer = require('../mailer')
const config = require('../config')

router = express.Router()

// *******************************************************************CUSTOMER*******************************************************************
// **********************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// -------------------------         GET/ Profile               -----------------------------
// ------------------------------------------------------------------------------------------
router.get('/profile', (request, response) => {
  const statement = `select  id, CONCAT(firstName, " ", middleName," ", lastName) as Name, birthDate, contact, email, address  from customer where id = '${request.userId}'`
  db.query(statement, (error, customers) => {
    if (error) {
      response.send({ status: 'error', error: error })
    } else {
      if (customers.length == 0) {
        response.send({ status: 'error', error: 'customer does not exist' })
      } else {
        const customer = customers[0]
        response.send(utils.createResult(error, customer))
      }
    }
  })
})

// -------------------------         GET/ Activate Token               ----------------------

router.get('/activate/:token', (request, response) => {
  const { token } = request.params

  const activatestatement = `update customer set active = 1, activationToken = '' 
         where activationToken = '${token}'`;

  db.query(activatestatement, (error, data) => {
    const htmlPath = path.join(__dirname, `../templates/customer_activated_account_link_page.html`)
    let body = '' + fs.readFileSync(htmlPath)
    response.header('Content-Type', 'text/html')
    response.send(body)
  })

})


// --------------------------------------------------------------------------------------------
// --------------------         POST/ Customer-Signup               ---------------------------
// --------------------------------------------------------------------------------------------

router.post('/signup', (request, response) => {
  const { firstName, middleName, lastName, birthDate, contact, email, address, password } = request.body

  const encryptedPassword = crypto.SHA256(password)

  const activationToken = uuid.v4()
  const activationLink = `http://localhost:3000/customer/activate/${activationToken}`;

  const htmlPath = path.join(__dirname, `../templates/customer_signup_email.html`)
  let body = '' + fs.readFileSync(htmlPath)
  body = body.replace('firstName', firstName)
  body = body.replace('activationLink', activationLink)

  const statement = `insert into customer (firstName,middleName,lastName, birthDate,contact,email,address,password,activationToken) values(
    '${firstName}','${middleName}','${lastName}', '${birthDate}','${contact}', 
    '${email}','${address}','${encryptedPassword}','${activationToken}' )`

  db.query(statement, (error, data) => {
    mailer.sendEmail(email, 'Welcome to FastWheels', body, (error, info) => {
      console.log(error)
      console.log(info)
      response.send(utils.createResult(error, data))
    })

  })
})

// -------------------------       POST/ Customer-Signin             --------------------------

router.post('/signin', (request, response) => {
  const { email, password } = request.body
  const encryptedPassword = crypto.SHA256(password)

  const statement = `select  id, firstName, lastName, active from customer where email = '${email}' and password = '${encryptedPassword}'  `

  db.query(statement, (error, customers) => {

    if (error) {
      response.send({ status: 'error', error: error })
    } else if (customers.length == 0) {
      response.send({ status: 'error', error: 'Customer does not exist' })
    } else {
      const customer = customers[0]

      if (customer['active'] == 1) {
        const token = jwt.sign({ id: customer['id'] }, config.secret)

        response.send(utils.createResult(error, {
          firstName: customer['firstName'],
          lastName: customer['lastName'],
          token: token
        }))
      } else {
        response.send({ status: 'error', error: 'Your account is not active. Please contact Vendor' })
      }
    }
  })
})


// **************************************************************SERVICE MANAGEMENT**************************************************************
// **********************************************************************************************************************************************
// ------------------------------               GET               ------------------------------


// ------------------------------         Service-history         ------------------------------
router.get('/servicing/history', (request, response) => {

  const statement = `select customerServices_id as "Servicing Id", totalAmount as "Amount", tax, (totalAmount + tax) as "Bill Amount", serviceStatus, paymentType 
        from customer_services where customer_id = ${request.userId}`;

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  })
})

// ------------------------------         Current Service         ------------------------------
router.get('/servicing/current_service', (request, response) => {

  const statement = `select customerServices_id as "Servicing Id", totalAmount as "Amount", tax, (totalAmount + tax) as "Bill Amount", serviceStatus, paymentType 
  from customer_services where customer_id = ${request.userId} && serviceStatus = "pending"`;

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------              Invoice              ------------------------------
router.get('/servicing/invoice/:customerServices_id', (request, response) => {
  const {customerServices_id} = request.params;

  const statement = `SELECT sd.service_details_id, sd.service_id, p.productName, sd.price, sd.quantity, sd.totalAmount,
  (sd.totalAmount * 0.18) as 'tax',
  (1.18 * sd.totalAmount) as 'total Amount',
  (cs.totalAmount + cs.tax) as 'Bill Amount'
  FROM service_details sd INNER JOIN products p
      ON sd.product_id = p.product_id
      INNER JOIN customer_services cs
      ON cs.customerServices_id = sd.customerServices_id
  WHERE sd.customer_id = ${request.userId} and sd.customerServices_id = ${customerServices_id}
UNION
  SELECT sd.service_details_id, s.serviceName, sd.product_id, sd.price, sd.quantity, sd.totalAmount,
      (sd.totalAmount * 0.18) as 'tax',
      (1.18 * sd.totalAmount) as 'total Amount',
      (cs.totalAmount + cs.tax) as 'Bill Amount'
  FROM service_details sd INNER JOIN services s
      ON sd.service_id = s.service_id
      INNER JOIN customer_services cs
      ON cs.customerServices_id = sd.customerServices_id
  WHERE sd.customer_id = ${request.userId} and sd.customerServices_id = ${customerServices_id} `

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


// ------------------------------               Payment               ------------------------------

router.put('/servicing/payment/:customerServices_id', (request, response, next) => {
  const {customerServices_id} = request.params;
  
  const statement = `UPDATE customer_services set paymentType = "Cash" where 
  customerServices_id = {customerServices_id} and customer_id = '${request.userId}' `

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})



// *******************************************************************FEEDBACK*******************************************************************
// **********************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// -------------------------             POST/ Feedback             -------------------------
// ------------------------------------------------------------------------------------------

router.post('/feedback/post', (request, response) => {
  const { feedback } = request.body

  const statement = `insert into feedback (customer_id,feedback) 
    values('${request.userId}','${feedback}')`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


// ----------------------------------------------------------------------------------------------------------------------------------------------
module.exports = router