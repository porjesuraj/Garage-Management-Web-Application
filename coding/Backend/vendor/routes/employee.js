const express = require('express')
const db = require('../db')
const config = require('../config')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')

const router = express.Router()


// ----------------------------------------------------
// GET all Employee
// ----------------------------------------------------

router.get('/get_all_emp', (request, response) => {


  const statement = `select * from employee `
  db.query(statement, (error, employees) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (employees.length == 0) {
        response.send({status: 'error', error: 'employee does not exist'})
      } else {
        const employee = employees
        response.send(utils.createResult(error, employee))
      }
    }
  })
})

// ----------------------------------------------------
// GET only Active Employee
// ----------------------------------------------------

router.get('/get_active_employee', (request, response) => {


  const statement = `select * from employee where active = 1`
  db.query(statement, (error, employees) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (employees.length == 0) {
        response.send({status: 'error', error: 'employee does not exist'})
      } else {
        response.send(utils.createResult(error, employees))
      }
    }
  })
})



// ----------------------------------------------------
// POST------------Add Employee
// ----------------------------------------------------

router.post('/add', (request, response) => {
    const { vendor_id, firstName, lastName, birthDate , email, password } = request.body
  
    const encryptedPassword = crypto.SHA256(password)
    
    const statement = `insert into employee (vendor_id, firstName, lastName, birthDate, email, password) 
    values ('${vendor_id}','${firstName}', '${lastName}', '${birthDate}', '${email}' ,'${encryptedPassword}')`

    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
})


  // ----------------------------------------------------
// PUT----------------update Employee
// ----------------------------------------------------

 router.put('/update', (request, response) => {
    const { emp_id, firstName, lastName, birthDate,email, } = request.body
    
    const statement = `update employee set firstName = '${firstName}',lastName = '${lastName}',
    birthDate = '${birthDate}',email = '${email}' where emp_id= '${emp_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })


// ----------------------------------------------------
// DELETE----------------Delete Employee
// ----------------------------------------------------

 router.delete('/', (request, response) => {
    const { emp_id } = request.body
    
    const statement = `delete from employee where emp_id= '${emp_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })


// ----------------------------------------------------
// Block / Unblock Employee
// ----------------------------------------------------

router.put('/active', (request, response) => {
  const { emp_id, active } = request.body
  
  const statement = `update employee set active = '${active}' where emp_id= '${emp_id}'`

  db.query(statement , (error, data) => {
    response.send(utils.createResult(error, data))
})
})


//-----------------------------------------------------------------------------------------------------------






  module.exports = router 