const express = require('express')
const crypto = require('crypto-js')
const db = require('./../../db')
const utils = require('./../../utils')
router = express.Router()
const mailer = require('./../../mailer')


//---------------------------------------------------------------------------------
//POST
//-----------------------------------------------------------------------------------

router.post('/signup',(request,response) => {

    const {firstName,middleName,lastName,
    birthDate,contact,email,address,password} = request.body 
     body = `
     <h1> hello user ${firstName}  ${lastName}
     `
    const encryptedP = crypto.SHA256(password)
    const statement = `insert into customer (firstName,middleName,lastName,
        birthDate,contact,email,address,password)
        values('${firstName}','${middleName}','${lastName}','${birthDate}','${contact}',
        '${email}','${address}','${encryptedP}' )`
        db.query(statement, (error, data) => {

            mailer.sendEmail(email,'Welcome to mystore',body,(error,info) => {
                console.log(error)
                console.log(info)
                response.send(utils.createResult(error,data))
            }  )
        
          })
})





//-------------------------------------------------------------------------------









module.exports = router