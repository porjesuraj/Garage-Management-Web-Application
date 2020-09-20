const express = require('express')
const db = require('../db')
const config = require('../config')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')

const router = express.Router()


// ----------------------------------------------------
// GET
// ----------------------------------------------------

router.get('/profile', (request, response) => {
  const statement = `select * from admin where admin_id = '${request.Id}'`
  db.query(statement, (error, admins) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (admins.length == 0) {
        response.send({status: 'error', error: 'admin does not exist'})
      } else {
        const admin = admins[0]
        response.send(utils.createResult(error, admin))
      }
    }
  })
})

// ----------------------------------------------------
// POST------------Signup
// ----------------------------------------------------

router.post('/signup', (request, response) => {
    const { firstName, lastName, email, password } = request.body
  
    const encryptedPassword = crypto.SHA256(password)
    
    const statement = `insert into admin (firstName, lastName,email, password) 
    values ('${firstName}', '${lastName}', '${email}' ,'${encryptedPassword}')`

    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
})

// ----------------------------------------------------
// POST------------Signin
// ----------------------------------------------------



router.post('/signin', (request, response) => {
    const {email, password} = request.body
    const statement = `select admin_id, firstName, lastName from admin where email = '${email}' and password = '${crypto.SHA256(password)}'`
    db.query(statement, (error, admins) => {
      if (error) {
        response.send({status: 'error', error: error})
      }
      else {
        if (admins.length == 0) {
          response.send({status: 'error', error: 'admin does not exist'})
        }
        else {
          const admin = admins[0]
          const token = jwt.sign({admin_id: admin['admin_id']}, config.secret)
          response.send(utils.createResult(error, {
            firstName: admin['firstName'],
            lastName: admin['lastName'],
            token: token
          }))
        }
      }
    })
  })

  // ----------------------------------------------------
// PUT
// ----------------------------------------------------

  router.put('/update', (request, response) => {
    const { admin_id, firstName } = request.body
    
    const statement = `update admin set firstName = '${firstName}' where admin_id= '${admin_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })


// ----------------------------------------------------
// DELETE
// ----------------------------------------------------

 router.delete('/', (request, response) => {
    const { admin_id } = request.body
    
    const statement = `delete from admin where admin_id= '${admin_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })


//-----------------------------------------------------------------------------------------------------------






  module.exports = router 