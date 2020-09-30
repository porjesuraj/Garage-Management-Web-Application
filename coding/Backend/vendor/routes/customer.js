const express = require('express')
const db = require('../db')
const config = require('../config')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')


const router = express.Router()



// ----------------------------------------------------
// GET all Customer
// ----------------------------------------------------

router.get('/get_all_cust', (request, response) => {

  
const statement = `select * from customer`
db.query(statement, (error, customers) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (customers.length == 0) {
        response.send({status: 'error', error: 'customer does not exist'})
      } else {
        const customer = customers
        response.send(utils.createResult(error, customer))
      }
    }
  })
})
  // ----------------------------------------------------
  // GET only Active Customer
  // ----------------------------------------------------
  
  router.get('/get_active_customer', (request, response) => {
  
  
    const statement = `select * from customer where active = 1`
    db.query(statement, (error, customers) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
        if (customers.length == 0) {
          response.send({status: 'error', error: 'customer does not exist'})
        } else {
          response.send(utils.createResult(error, customers))
        }
      }
    })
  })
  
  
  
// ----------------------------------------------------
// POST------------Add Customer
// ----------------------------------------------------
  
  router.post('/add', (request, response) => {
      const { firstName, middleName , lastName, birthDate , contact , email, address , password } = request.body
    
      const encryptedPassword = crypto.SHA256(password)
      
      const statement = `insert into customer ( firstName, middleName , lastName, birthDate, contact , email, address , password) 
      values ('${firstName}', '${middleName}' ,'${lastName}', '${birthDate}', '${contact}' ,'${email}', '${address}' ,'${encryptedPassword}')`
  
      db.query(statement , (error, data) => {
        response.send(utils.createResult(error, data))
    })
  })
  
  
// ----------------------------------------------------
// PUT ----------------update Customer
// ----------------------------------------------------
  
router.put('/update', (request, response) => {
    const { customer_id, firstName, middleName ,lastName, birthDate ,contact ,email, address } = request.body
    
    const statement = `update customer set firstName = '${firstName}', middleName='${middleName}' ,lastName = '${lastName}',
    birthDate = '${birthDate}', contact='${contact}' ,email = '${email}', address='${address}' where customer_id= '${customer_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })

  
  // ----------------------------------------------------
  // DELETE---------delete Customer
  // ----------------------------------------------------
  
   router.delete('/', (request, response) => {
      const { customer_id } = request.body
      
      const statement = `delete from customer where customer_id= '${customer_id}'`
    
      db.query(statement , (error, data) => {
        response.send(utils.createResult(error, data))
    })
    })
  
  
  // ----------------------------------------------------
  // Block / Unblock Customer
  // ----------------------------------------------------
  
  router.put('/active', (request, response) => {
    const { customer_id, active } = request.body
    
    const statement = `update customer set active = '${active}' where customer_id= '${customer_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })
  
  
  //-----------------------------------------------------------------------------------------------------------
  
  
  


module.exports = router 