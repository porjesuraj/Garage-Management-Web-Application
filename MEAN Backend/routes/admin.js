const express = require('express')
const db = require('../db')
const config = require('../config')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')
const fs = require('fs')
const path = require('path')
const mailer = require('../mailer')

const router = express.Router()

// *********************************************************************************ADMIN********************************************************************************
// **********************************************************************************************************************************************************************

// ------------------------------------------------------------------------------------------
// ------------------------            GET/ Admin-profile            ------------------------
// ------------------------------------------------------------------------------------------
router.get('/profile', (request, response) => {
  const statement = `select id, firstName, lastName, email from admin where id = '${request.userId}'`
  db.query(statement, (error, admins) => {
    if (error) {
      response.send({ status: 'error', error: error })
    } else {
      if (admins.length == 0) {
        response.send({ status: 'error', error: 'admin does not exist' })
      } else {
        const admin = admins[0]
        response.send(utils.createResult(error, admin))
      }
    }
  })
})


// ------------------------------------------------------------------------------------------
// ------------------------------         POST/Signup         -------------------------------
// ------------------------------------------------------------------------------------------
router.post('/signup', (request, response) => {
  const { firstName, lastName, email, password } = request.body

  const encryptedPassword = crypto.SHA256(password)

  const statement = `insert into admin (firstName, lastName,email, password) 
    values ('${firstName}', '${lastName}', '${email}' ,'${encryptedPassword}')`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ----------------------------             POST/SignIn          ----------------------------

router.post('/signin', (request, response) => {
  const { email, password } = request.body
  const statement = `select id, firstName, lastName from admin where email = '${email}' and password = '${crypto.SHA256(password)}'`
  db.query(statement, (error, admins) => {
    if (error) {
      response.send({ status: 'error', error: error })
    }
    else {
      if (admins.length == 0) {
        response.send({ status: 'error', error: 'admin does not exist' })
      }
      else {
        const admin = admins[0]
        const token = jwt.sign({ id: admin['id'] }, config.secret)
        response.send(utils.createResult(error, {
          firstName: admin['firstName'],
          lastName: admin['lastName'],
          token: token
        }))
      }
    }
  })
})


// ------------------------------------------------------------------------------------------
// -----------------------------              PUT              ------------------------------
// ------------------------------------------------------------------------------------------
router.put('/', (request, response) => {
  const { firstName, lastName, email, password } = request.body
  const encryptedPassword = crypto.SHA256(password)

  const statement = `select id, firstName, lastName from admin where 
      email = '${email}' and password = '${encryptedPassword}'`

  db.query(statement, (error, admins) => {
    if (error) {
      response.send({ status: 'error', error: error })
    }
    else {
      if (admins.length == 0) {
        response.send({ status: 'error', error: 'admin does not exist' })
      }
      else {
        const admin = admins[0]
        const adminId = admin['id']

        const statement = `update admin set 
              firstName = '${firstName}', lastName = '${lastName}',
              email = '${email}', password = '${encryptedPassword}'
              where id = '${adminId}'   `

        db.query(statement, (error, data) => {
          response.send(utils.createResult(error, data))
        })
      }
    }
  })
})


// ------------------------------------------------------------------------------------------
// ---------------------------               DELETE               ---------------------------
// ------------------------------------------------------------------------------------------
router.delete('/', (request, response) => {

  const statement = `delete from admin where id = '${request.userId}'`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


// *************************************************************VENDOR MANAGEMENT**************************************************************
// **********************************************************************************************************************************************************************


// ------------------------------------------------------------------------------------------
// -----------------------             GET / All vendors             ------------------------
// ------------------------------------------------------------------------------------------
router.get('/vendor/', (request, response) => {
  const statement = `select id, name, address, contact, email, active from vendor `

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------                GET Acvtive Vendor                ----------------------

router.get('/vendor/active-vendor/', (request, response) => {

  console.log("before statement");
  const statement = `select id, name, address, contact, email from vendor where active = 1 `

  db.query(statement, (error, vendors) => {
    console.log(vendors);
    if (error) {
      response.send({ status: 'error', error: error })
    } else if (vendors.length == 0) {
      response.send({ status: 'error', error: 'vendor does not exist' })
    } else {
      response.send(utils.createResult(error, vendors))
    }
  })
})

// ---------------------               GET Vendor by Id                ----------------------

router.get('/vendor/:vendorId', (request, response) => {
  const { vendorId } = request.params

  const statement = `select name, address, contact, email, active from vendor where id = '${vendorId}'`

  db.query(statement, (error, vendors) => {
    if (error) {
      response.send({ status: 'error', error: error })
    } else if (vendors.length == 0) {
      response.send({ status: 'error', error: 'vendor does not exist' })
    } else {
      response.send(utils.createResult(error, vendors))
    }
  })
})


// ------------------------------------------------------------------------------------------
// ------------------                   POST- Add Vendor                    -----------------
// ------------------------------------------------------------------------------------------
router.post('/vendor/add', (request, response) => {
  const { name, address, contact, email, password } = request.body
  const encryptedPassword = crypto.SHA256(password)
  console.log("request.body = ");
  console.log(request.body);

  const htmlPath = path.join(__dirname, '../templates/welcome.html')
  console.log("htmlPath = ");
  console.log(htmlPath);

  let body = '' + fs.readFileSync(htmlPath)
  body = body.replace('{firstName}', name)
  body = body.replace('{Name}', name)
  body = body.replace('{email}', email)
  body = body.replace('{password}', password)

  const statement = `insert into vendor (name, address, contact, email, password) 
    values ('${name}', '${address}', '${contact}', '${email}' ,'${encryptedPassword}')`

  db.query(statement, (error, data) => {
    mailer.sendEmail(email, 'Welcome to FastWheels', body, (error, info) => {
      console.log(error);
      console.log(info);
      response.send(utils.createResult(error, data))
    })
  })

})


// ------------------------------------------------------------------------------------------
// ----------------                 PUT/ Update vendor name                 -----------------
// ------------------------------------------------------------------------------------------
router.put('/vendor/:vendor_id', (request, response) => {
  const { vendor_id } = request.params
  const { name } = request.body

  const statement = `update vendor set name = '${name}' where id= '${vendor_id}'`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// -------------------                   Block/Unblock                   -------------------
router.put('/vendor/active/:vendor_id', (request, response) => {
  const { vendor_id } = request.params

  const activeStatement = `SELECT active from vendor WHERE id = ${vendor_id} `
  db.query(activeStatement, (error, data) => {

    const setActive = data[0].active ? 0 : 1

    const customerStatement = `UPDATE vendor Set active = ${setActive} WHERE id = ${vendor_id} `
    db.query(customerStatement, (error, data) => {
      response.send(utils.createResult(error, data))
    })

  })
})


// ------------------------------------------------------------------------------------------
// ---------------------                     DELETE                     ---------------------
// ------------------------------------------------------------------------------------------
router.delete('/vendor/:vendor_id', (request, response) => {
  const { vendor_id } = request.params

  const statement = `delete from vendor where id= '${vendor_id}'`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})



// ***************************************************************************OFFER MANAGEMENT***************************************************************************
// **********************************************************************************************************************************************************************


// ------------------------------------------------------------------------------------------
// -------------------------             GET/ all offer             -------------------------
// ------------------------------------------------------------------------------------------
router.get('/offer/', (request, response) => {
  const statement = `select * from offer  `

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// -------------------------            GET/ offer by id            -------------------------

router.get('/offer/:offer_id', (request, response) => {
  const { offer_id } = request.params

  const statement = `select * from offer where offer_id = '${offer_id}'`
  db.query(statement, (error, offers) => {
    if (error) {
      response.send({ status: 'error', error: error })
    } else if (offers.length == 0) {
      response.send({ status: 'error', error: 'offer does not exist' })
    } else {
      const offer = offers[0]
      response.send(utils.createResult(error, offer))
    }
  })
})


// ------------------------------------------------------------------------------------------
// --------------------------            POST- Add Offer           --------------------------
// ------------------------------------------------------------------------------------------
router.post('/offer/add', (request, response) => {
  const { offer_name, offer_discount, offer_min_value } = request.body

  const statement = `insert into offer (offer_name, offer_discount, offer_min_value ) 
    values ('${offer_name}', '${offer_discount}', '${offer_min_value}')`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


// ------------------------------------------------------------------------------------------
// ------------------------------             PUT              ------------------------------
// ------------------------------------------------------------------------------------------
router.put('/offer/:offer_id', (request, response) => {
  const { offer_id } = request.params
  const { offer_name, offer_discount, offer_min_value } = request.body

  const statement = `update offer set offer_name = '${offer_name}', offer_discount = '${offer_discount}', offer_min_value = '${offer_min_value}'
        where offer_id= '${offer_id}'`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


// ------------------------------------------------------------------------------------------
// ---------------------------               DELETE               ---------------------------
// ------------------------------------------------------------------------------------------
router.delete('/offer/:offer_id', (request, response) => {
  const { offer_id } = request.params

  const statement = `delete from offer where offer_id= '${offer_id}'`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


//--------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = router 