const express = require('express')
const db = require('../db')
const config = require('../config')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')

const router = express.Router()


// ----------------------------------------------------
// GET all vendor
// ----------------------------------------------------

router.get('/get_all_vendor', (request, response) => {

  const { vendor_id } = request.body

  const statement = `select * from vendor where vendor_id = '${vendor_id}'`
  db.query(statement, (error, vendors) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (vendors.length == 0) {
        response.send({status: 'error', error: 'vendor does not exist'})
      } else {
        const vendor = vendors[0]
        response.send(utils.createResult(error, vendor))
      }
    }
  })
})

// ----------------------------------------------------
// GET only Active vendor
// ----------------------------------------------------

router.get('/get_active_vendor', (request, response) => {

  const { active } = request.body

  const statement = `select * from vendor where active = '${active}'`
  db.query(statement, (error, vendors) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (vendors.length == 0) {
        response.send({status: 'error', error: 'vendor does not exist'})
      } else {
        response.send(utils.createResult(error, vendors))
      }
    }
  })
})



// ----------------------------------------------------
// POST------------Add Vender
// ----------------------------------------------------

router.post('/add', (request, response) => {
    const { name, address, contact , email, password } = request.body
  
    const encryptedPassword = crypto.SHA256(password)
    
    const statement = `insert into vendor (name, address, contact, email, password) 
    values ('${name}', '${address}', '${contact}', '${email}' ,'${encryptedPassword}')`

    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
})


  // ----------------------------------------------------
// PUT
// ----------------------------------------------------

 router.put('/update', (request, response) => {
    const { vendor_id, name } = request.body
    
    const statement = `update vendor set name = '${name}' where vendor_id= '${vendor_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })


// ----------------------------------------------------
// DELETE
// ----------------------------------------------------

 router.delete('/', (request, response) => {
    const { vendor_id } = request.body
    
    const statement = `delete from vendor where vendor_id= '${vendor_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })


// ----------------------------------------------------
// Block / Unblock vendor
// ----------------------------------------------------

router.put('/active', (request, response) => {
  const { vendor_id, active } = request.body
  
  const statement = `update vendor set active = '${active}' where vendor_id= '${vendor_id}'`

  db.query(statement , (error, data) => {
    response.send(utils.createResult(error, data))
})
})


//-----------------------------------------------------------------------------------------------------------






  module.exports = router 