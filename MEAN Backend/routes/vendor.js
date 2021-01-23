const express = require('express')
const db = require('../db')
const config = require('../config')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')
const fs = require('fs')
const path = require('path')
const mailer = require('../mailer')
const uuid = require('uuid')

const router = express.Router()

// *******************************************************************VENDOR*******************************************************************
// ********************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// ------------------------      GET/ vendor profile            -----------------------------
// ------------------------------------------------------------------------------------------
router.get('/profile', (request, response) => {
  const statement = `select * from vendor where id = '${request.userId}'`
  db.query(statement, (error, vendors) => {
    if (error) {
      response.send({ status: 'error', error: error })
    } else {
      if (vendors.length == 0) {
        console.log("vendor/hi1");
        response.send({ status: 'error', error: 'vendor does not exist' })
      } else {
        const vendor = vendors[0]
        response.send(utils.createResult(error, vendor))
      }
    }
  })
})


// ------------------------------------------------------------------------------------------
// -------------------------           POST/ Vendor-Signin          -------------------------
// ------------------------------------------------------------------------------------------
router.post('/signin', (request, response) => {
  const { email, password } = request.body
  const statement = `select id,name,active from vendor where email = '${email}' and password = '${crypto.SHA256(password)}'`
  db.query(statement, (error, vendors) => {
    if (error) {
      response.send({ status: 'error', error: error })
    }
    else {
      if (vendors.length == 0) {
        console.log("vendor/hi2");
        response.send({ status: 'error', error: 'vendor does not exist' })
      }
      else {
        const vendor = vendors[0]
        if (vendor['active']) {
          const token = jwt.sign({ id: vendor['id'] }, config.secret)
          response.send(utils.createResult(error, {
            Name: vendor['name'],
            token: token
          }))
        }
        else {
          response.send(utils.createError('Your account is inactive. Contact Administrator '))
        }

      }
    }
  })
})


// ------------------------------------------------------------------------------------------
// -----------------------         PUT/ Update Vendor Profile         -----------------------
// ------------------------------------------------------------------------------------------
router.put('/', (request, response) => {

  const { name, address, contact, email, password } = request.body
  const encryptedPassword = crypto.SHA256(password)

  const statement = `select id, name, address, contact from vendor where 
      email = '${email}' and password = '${encryptedPassword}'`

  db.query(statement, (error, vendors) => {
    if (error) {
      response.send({ status: 'error', error: error })
    }
    else {
      if (vendors.length == 0) {
        console.log("vendor/hi3");
        response.send({ status: 'error', error: 'Vendor does not exist' })
      }
      else {
        const vendor = vendors[0]
        const vendorId = vendor['id']

        const statement = `update vendor set 
              name = '${name}', address = '${address}', contact = '${contact}',
              email = '${email}', password = '${encryptedPassword}'
              where id = '${vendorId}'   `

        db.query(statement, (error, data) => {
          response.send(utils.createResult(error, data))
        })
      }
    }
  })
})


// ******************************************************************EMPLOYEE******************************************************************
// ********************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// --------------------------          GET/ All employee           --------------------------
// ------------------------------------------------------------------------------------------
router.get('/employee/', (request, response) => {

  const statement = `SELECT id, vendor_id, CONCAT(firstName, " ", lastName) as "Name", birthDate, email, active from employee `

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// --------------------------       GET/ Active Employee          ---------------------------
router.get('/employee/active/', (request, response) => {

  const statement = `SELECT id, vendor_id, CONCAT(firstName, " ", lastName) as "Name", birthDate, email from employee where active = 1`

  db.query(statement, (error, employees) => {
    if (error) {
      response.send({ status: 'error', error: error })
    } else if (employees.length == 0) {
      response.send({ status: 'error', error: 'NOT FOUND' })
    } else {
      response.send(utils.createResult(error, employees))
    }
  })
})

// --------------------------       GET/ Employee by id          ----------------------------
router.get('/employee/:employee_id', (request, response) => {
  const { employee_id } = request.params

  const statement = `SELECT vendor_id, CONCAT(firstName, " ", lastName) as "Name", birthDate, email, active from employee where id = ${employee_id} `
  console.log("HIiiiiiiiiiiiiiiiiiiiiiii");
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


// ------------------------------------------------------------------------------------------
// ----------------------             POST/ Add-employee              -----------------------
// ------------------------------------------------------------------------------------------
router.post('/employee/add', (request, response) => {

  const { firstName, lastName, birthDate, email, password } = request.body
  const encryptedPassword = crypto.SHA256(password)

  const htmlPath = path.join(__dirname, '../templates/welcome.html')

  let body = '' + fs.readFileSync(htmlPath)
  body = body.replace('{firstName}', firstName)
  body = body.replace('{Name}', firstName)
  body = body.replace('{email}', email)
  body = body.replace('{password}', password)

  const statement = `insert into employee (vendor_id, firstName, lastName, birthDate, email, password) values (
    '${request.userId}', '${firstName}', '${lastName}', '${birthDate}', '${email}' ,'${encryptedPassword}')`

  console.log("--------------------------------------");
  console.log(statement);
  console.log("--------------------------------------");

  db.query(statement, (error, data) => {
    console.log(data);
    console.log("--------------------------------------");

    mailer.sendEmail(email, 'Welcome to FastWheels', body, (error, info) => {
      console.log(error);
      console.log(info);
      response.send(utils.createResult(error, data))
    })
  })

})


// ------------------------------------------------------------------------------------------
// ----------------------            PUT / Update-employee              ---------------------
// ------------------------------------------------------------------------------------------
router.put('/employee/:employee_id', (request, response) => {

  const { employee_id } = request.params
  const { firstName, lastName, birthDate, email } = request.body

  const statement = `update employee set firstName = '${firstName}',lastName = '${lastName}',
    birthDate = '${birthDate}',email = '${email}' where id= '${employee_id}'`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ----------------------         PUT / Block/Unblock-employee          ---------------------
router.put('/employee/active-status/:employee_id', (request, response) => {
  const { employee_id } = request.params

  const activeStatement = `SELECT active from employee WHERE id = ${employee_id} `

  db.query(activeStatement, (error, data) => {
    const setActive = data[0].active ? 0 : 1
    const customerStatement = `UPDATE employee Set active = ${setActive} WHERE id = ${employee_id} `

    db.query(customerStatement, (error, data) => {
      response.send(utils.createResult(error, data))
    })

  })
})


// ------------------------------------------------------------------------------------------
// -----------------------          DELETE/ Delete Employee         -------------------------
// ------------------------------------------------------------------------------------------
router.delete('/employee/:employee_id', (request, response) => {
  const { employee_id } = request.params

  const statement = `delete from employee where id= '${employee_id}'`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})



// ******************************************************************CUSTOMER******************************************************************
// ********************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// ------------------------         GET/ customer by id              ------------------------
// ------------------------------------------------------------------------------------------
router.get('/customer/:customer_id', (request, response) => {
  const { customer_id } = request.params
  const statement = `SELECT  CONCAT(firstName, " ", middleName, " ", lastName) as "Name", birthDate, contact, email, address, active from customer
      where id = ${customer_id}      `

  db.query(statement, (error, data) => {
    console.log(data);
    response.send(utils.createResult(error, data))
  })

})

// ------------------------         GET/ All customers              -------------------------
router.get('/customer/', (request, response) => {

  const statement = `SELECT  id as "customer id", CONCAT(firstName, " ", middleName, " ", lastName) as "Name", birthDate, contact, email, address, active from customer `

  db.query(statement, (error, data) => {
    console.log(data);
    response.send(utils.createResult(error, data))
  })
})


// ------------------------------------------------------------------------------------------
// -------------------------           POST/ Add Customer           -------------------------
// ------------------------------------------------------------------------------------------
router.post('/customer/add', (request, response) => {
  const { firstName, middleName, lastName, birthDate, contact, email, address, password } = request.body
  const encryptedPassword = crypto.SHA256(password)

  const activationToken = uuid.v4()
  const activationLink = `http://localhost:3000/customer/activate/${activationToken}`;

  const htmlPath = path.join(__dirname, `../templates/customer_signup_email.html`)

  console.log("path = ");
  console.log(htmlPath);

  let body = '' + fs.readFileSync(htmlPath)
  body = body.replace('firstName', firstName)
  body = body.replace('activationLink', activationLink)

  const statement = `insert into customer (firstName,middleName,lastName,
        birthDate,contact,email,address,password,activationToken)
        values('${firstName}','${middleName}','${lastName}','${birthDate}','${contact}',
        '${email}','${address}','${encryptedPassword}','${activationToken}' )`

  db.query(statement, (error, data) => {
    mailer.sendEmail(email, 'Welcome to FastWheels', body, (error, info) => {
      console.log(error);
      console.log(info);
      response.send(utils.createResult(error, data))
    })
  })

})


// ------------------------------------------------------------------------------------------
// ---------------------          PUT/ Update Customer Profile          ---------------------
// ------------------------------------------------------------------------------------------
router.put('/customer/:customer_id', (request, response) => {
  const { customer_id } = request.params
  const { firstName, middleName, lastName, birthDate, contact, email, address } = request.body

  const statement = `update customer set firstName = '${firstName}', middleName = '${middleName}', lastName = '${lastName}',
        birthDate = '${birthDate}', contact = '${contact}', email = '${email}', address = '${address}'
        where id = '${customer_id}'   `

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ---------------------          PUT/ Block/Unblock Customer         -----------------------
router.put('/customer/active-status/:customer_id', (request, response) => {
  const { customer_id } = request.params

  const activeStatement = `SELECT active from customer WHERE id = ${customer_id} `

  db.query(activeStatement, (error, data) => {
    const setActive = data[0].active ? 0 : 1

    const customerStatement = `UPDATE customer Set active = ${setActive} WHERE id = ${customer_id} `
    db.query(customerStatement, (error, data) => {
      response.send(utils.createResult(error, data))
    })

  })
})


// ------------------------------------------------------------------------------------------
// ----------------------          DELETE/ Delete-customer          -------------------------
// ------------------------------------------------------------------------------------------
router.delete('/customer/:customer_id', (request, response) => {

  const { customer_id } = request.params

  const statement = `delete FROM customer WHERE id = ${customer_id} `
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})



// ******************************************************************JOBCARD*******************************************************************
// ********************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// -------------------------            GET/ All jobcard            -------------------------
// ------------------------------------------------------------------------------------------
router.get('/jobcard/', (request, response) => {

  const statement = `SELECT  customerServices_id as "Jobcard_id", customer_id, totalAmount as "Amount", tax as "Tax", 
      (totalAmount + tax) as "Bill Amount" , serviceStatus as "Status", paymentType from  customer_services
  `

  db.query(statement, (error, data) => {
    console.log(data);
    response.send(utils.createResult(error, data))
  })

})

// -------------------------          GET/ GENERATE INVOICE          ------------------------
router.get('/jobcard/invoice/:customerServices_id', (request, response) => {
  const { customerServices_id } = request.params
  const statement = `SELECT cs.customerServices_id, c.id "customer id", concat(c.firstName, " ", c.lastName) as "Name", 
  cs.totalAmount as "Amount", cs.tax as "Tax", (cs.totalAmount + cs.tax) as "Bill Amount", cs.serviceStatus, cs.paymentType
  FROM customer_services cs INNER JOIN customer c ON cs.customer_id = c.id WHERE cs.customerServices_id = ${customerServices_id};
  `

  db.query(statement, (error, data) => {
    console.log(data);
    response.send(utils.createResult(error, data))
  })

})


// ------------------------------------------------------------------------------------------
// -------------------------         DELETE/ Jobcard            -----------------------------
// ------------------------------------------------------------------------------------------
router.delete('/jobcard/:customerService_id', (request, response) => {

  const { customerService_id } = request.params

  const customerStatement = `delete FROM customer_services WHERE customerServices_id = ${customerService_id} `
  db.query(customerStatement, (error, data) => {
    response.send(utils.createResult(error, data))
  })

})


// ******************************************************************FEEDBACK******************************************************************
// ********************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// -------------------------            GET/ All Feedback           -------------------------
// ------------------------------------------------------------------------------------------
router.get('/feedback/', (request, response) => {

  const statement = `SELECT CONCAT(c.firstName, " ", c.middleName, " ", c.lastName) as "Name", f.feedback
                    FROM customer c INNER JOIN feedback f ON c.id = f.customer_id;
  `

  db.query(statement, (error, data) => {
    console.log(data);
    response.send(utils.createResult(error, data))
  })

})


// ------------------------------------------------------------------------------------------
// -------------------------         DELETE/ Feedback           -----------------------------
// ------------------------------------------------------------------------------------------
router.delete('/feedback/:feedback_id', (request, response) => {
  const { feedback_id } = request.params
  const statement = ` DELETE FROM feedback where feedback_id = ${feedback_id};   `

  db.query(statement, (error, data) => {
    console.log(data);
    response.send(utils.createResult(error, data))
  })

})

// ------------------------------------------------------------------------------------------
module.exports = router 
