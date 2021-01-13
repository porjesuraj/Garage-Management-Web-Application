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
const { response } = require('express')
//---------------------------------------------------------------------------------
//GET
//-----------------------------------------------------------------------------------


router.get('/invoice',(request,response) => {

    const statement = `select i.invoice_id,c.firstName,c.contact,i.totalBill,i.service_details_id 
     from invoice i INNER JOIN customer c ON i.customer_id = c.customer_id
     where i.customer_id = '${request.customerId}'` 

     db.query(statement,(error,data) => {
         response.send(utils.createResult(error,data))
     })
})


router.get('/service_details',(request,response) => {

    const statement = `select c.firstName as customer,s.service_details_id as 'customer service details id',s.service_id,sr.serviceName,sr.servicePrice,
    s.product_id,p.productName,p.productPrice ,s.quantity, (sr.servicePrice + (p.productPrice)*s.quantity) as total_amount
    from service_details s INNER JOIN customer c
                           INNER Join services sr
                           INNER JOIN products p
    where s.customer_id = ${request.customerId}`;

    db.query(statement,(error,data) => {
        response.send(utils.createResult(error,data))
    })
})



router.get('/service_history',(request,response) => {

   
    console.log('before statement');

   const statement = `select i.invoice_id,CONCAT(c.firstName, c.lastName) as customer_name,c.contact,
    cs.customerServices_id,cs.tax,o.offer_name,i.totalBill as "to pay" 
    from invoice i INNER JOIN customer c ON i.customer_id = c.customer_id 
                   INNER JOIN customer_services cs ON i.customerServices_id = cs.customerServices_id
                   INNER JOIN offer o ON i.offer_id = o.offer_id
                   where i.customer_id = 1`;

                   
     db.query(statement,(error,data) => {

         response.send(utils.createResult(error,data));
     })
})



router.get('/payment',(request,response,next) => {

    const statement = `select c.customer_id,CONCAT(c.firstName,lastName) as 'customer name',c.contact,c.email, i.invoice_id,i.totalBill,i.createdOn 
    from invoice i INNER JOIN customer c ON i.customer_id = c.customer_id where i.customer_id = '${request.customerId}' `
    
    
    db.query(statement,(error,data) => {
        response.send(utils.createResult(error,data))
    })
})




//---------------------------------------------------------------------------------
//POST
//-----------------------------------------------------------------------------------


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