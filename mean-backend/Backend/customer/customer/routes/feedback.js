const express = require('express')
const crypto = require('crypto-js')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const db = require('../../db')
const utils = require('../../utils')
router = express.Router()
const mailer = require('../../mailer')
const config = require('../../config')
const { request } = require('http')
//---------------------------------------------------------------------------------
//GET
//-----------------------------------------------------------------------------------













//---------------------------------------------------------------------------------
//POST
//-----------------------------------------------------------------------------------


router.post('/',(request,response) => {

    const {feedback} = request.body

    const statement = `insert into feedback (customer_id,feedback) 
    values('${request.customerId}','${feedback}')`

    db.query(statement,(error,data) => {
        response.send(utils.createResult(error,data))
    })
})





//-------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//PUT
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
//DELETE
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------




module.exports = router