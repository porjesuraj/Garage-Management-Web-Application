const express = require('express')
const db = require('../db')
const config = require('../config')
const utils = require('../utils')
const jwt = require('jsonwebtoken')


const router = express.Router()


// ----------------------------------------------------
// GET
// ----------------------------------------------------

router.get('/profile', (request, response) => {
  const statement = `select * from vendor where vendor_id = '${request.Id}'`
  db.query(statement, (error, vendors) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (vendors.length == 0) {
        response.send({status: 'error', error: 'vendor does not exist'})
      } else {
        const vendor = vendors[0]
        response.send(utils.createResult(error,vendor))
      }
    }
  })
})

// ----------------------------------------------------
// POST------------Signup
// ----------------------------------------------------



// ----------------------------------------------------
// POST------------Signin
// ----------------------------------------------------



router.post('/signin', (request, response) => {
    const {email, password} = request.body
    const statement = `select vendor_id,name,active from vendor where email = '${email}' and password = '${password}'`
    db.query(statement, (error, vendors) => {
      if (error) {
        response.send({status: 'error', error: error})
      }
      else {
        if (vendors.length == 0) {
          response.send({status: 'error', error: 'vendor does not exist'})
        }
        else {
          const vendor = vendors[0]
          if(vendor['active'])
        {
            const token = jwt.sign({vendor_id: vendor['vendor_id']}, config.secret)
            response.send(utils.createResult(error, {
              Name: vendor['name'],
              token: token
            }))
        }
        else
        {
            response.send(utils.createError('contact administrator account is inactive'))
        }
          
        }
      }

//-----------------------------



//---------------------------







      
    })
  })

  // ----------------------------------------------------
// PUT
// ----------------------------------------------------

  


// ----------------------------------------------------
// DELETE
// ----------------------------------------------------



//-----------------------------------------------------------------------------------------------------------






  module.exports = router 