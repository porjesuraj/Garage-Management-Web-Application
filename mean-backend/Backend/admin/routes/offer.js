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

router.get('/get_offer', (request, response) => {

  const { offer_id } = request.body

  const statement = `select * from offer where offer_id = '${offer_id}'`
  db.query(statement, (error, offers) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (offers.length == 0) {
        response.send({status: 'error', error: 'offer does not exist'})
      } else {
        const offer = offers[0]
        response.send(utils.createResult(error, offer))
      }
    }
  })
})

// ----------------------------------------------------
// POST------------Add Vender
// ----------------------------------------------------

router.post('/add', (request, response) => {
    const { offer_name, offer_discount, offer_min_value  } = request.body
      
    const statement = `insert into offer (offer_name, offer_discount, offer_min_value ) 
    values ('${offer_name}', '${offer_discount}', '${offer_min_value}')`

    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
})


  // ----------------------------------------------------
// PUT
// ----------------------------------------------------

 router.put('/update', (request, response) => {
    const { offer_id, offer_name, offer_discount, offer_min_value } = request.body
    
    const statement = `update offer set offer_name = '${offer_name}', offer_discount = '${offer_discount}', offer_min_value = '${offer_min_value}'
                        where offer_id= '${offer_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })


// ----------------------------------------------------
// DELETE
// ----------------------------------------------------

 router.delete('/', (request, response) => {
    const { offer_id } = request.body
    
    const statement = `delete from offer where offer_id= '${offer_id}'`
  
    db.query(statement , (error, data) => {
      response.send(utils.createResult(error, data))
  })
  })


//-----------------------------------------------------------------------------------------------------------






  module.exports = router 