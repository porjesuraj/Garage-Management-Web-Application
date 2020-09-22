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
//---------------------------------------------------------------------------------
//GET
//-----------------------------------------------------------------------------------

router.get('/profile', (request, response) => {
    const statement = `select * from customer where customer_id = '${request.customerId}'`
    db.query(statement, (error, customers) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
        if (customers.length == 0) {
          response.send({status: 'error', error: 'customer does not exist'})
        } else {
          const customer = customers[0]
          response.send(utils.createResult(error,customer))
        }
      }
    })
  })

router.get('/activate/:token',(request,response) => {
    const{token} = request.params
         const activatestatement = `update customer set active = 1, 
         activationToken = '' 
         where activationToken = '${token}'`;
        
       
         db.query(activatestatement,(error,data) => {
          const htmlPath = path.join(__dirname,'/../template/activated_account.html')
          let body = '' + fs.readFileSync(htmlPath)
            response.header('Content-Type','text/html')
            response.send(body)

         })


  })



//---------------------------------------------------------------------------------
//POST
//-----------------------------------------------------------------------------------

router.post('/signup',(request,response) => {

    const {firstName,middleName,lastName,
    birthDate,contact,email,address,password} = request.body 
    const activationToken = uuid.v4()
    const activationLink = `http://localhost:3000/customer/activate/${activationToken}`;
    const htmlPath = path.join(__dirname,`/../template/signup_email.html`)
   let body = '' + fs.readFileSync(htmlPath)
   body = body.replace('firstName',firstName)
   body = body.replace('activationLink',activationLink)
    
    const statement = `insert into customer (firstName,middleName,lastName,
        birthDate,contact,email,address,password,activationToken)
        values('${firstName}','${middleName}','${lastName}','${birthDate}','${contact}',
        '${email}','${address}','${password}','${activationToken}' )`
        db.query(statement, (error, data) => {

            mailer.sendEmail(email,'Welcome to online garage',body,(error,info) => {
                console.log(error)
                console.log(info)
                response.send(utils.createResult(error,data))
            }  )
        
          })
})




router.post('/signin',(request,response) => {

    const {email,password} = request.body 
     
  
    const statement = `select customer_id,firstName,lastName,active from customer where email = '${email}'
    and password = '${password}'`
        db.query(statement, (error, users) => {
         if(error)
         {
             response.send(utils.createError(error))
         } else if (users.length == 0) {
             response.send(utils.createError('user not found'))
         } else
         {
             const user = users[0]
             if (user['active'] == 1)
             {
                const token = jwt.sign({id : user['customer_id']},config.secret)

                response.send(utils.createResult(error, {
   
                   firstName : user['firstName'],
                   lastName : user['lastName'],
                   token : token
   
                }))
   
             }
             else
      {
        response.send(utils.createError('contact administrator your account not active'))
      }

            
         }


        
          })
})


//-------------------------------------------------------------------------------


module.exports = router