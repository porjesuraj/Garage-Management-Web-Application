customer panel 
  - customer-server.js 		<- express application 
  - utils.js		<- utility functions (like createResult)
  - db.js		<- db connection
  - config.js		<- application configuration
  - routes		<- (dir) will hold all the routers
    - <router>.js	<- router to add required routes

- modules
  - express		<- for web server
  - mysql2 		<- mysql connectivity
  - crypto-js		<- for encryption
  - jsonwebtoken	<- jwt auth token
  - uuid         <-- universal identifier
  - morgan		<- server logging
  - nodemailer		<- for sending email

  - multer		<- file uploading
  - swagger		<- for API documentation 
  - cors		<- for cross origin resource sharing
  - mongojs		<- for mongoldb connectivity
  - mongoose		<- ORM for mongo

  customer panel 

  1. Signup : done
  2. Signin : done 
  3. Service Management
     - get service history          : done
     - get current serivce details : done
     - get invoice  : done
     - Pay Bill : done
  4. Feedback
     - add feedback : done 
    
     
   - postman customer entry
   ```json    
        "firstName" : "suraj",
        "middleName" : "valu",
        "lastName" : "porje",
        "birthDate" : 1994-01-01,
        "contact" : 9881233422,
        "email" : "testprojectdac@gmail.com",
        "address" : "nasik",
        "password" : "IndiaIsBest"
   ```     

- insert into customer related tables
```bash
insert into services (serviceName,servicePrice) values("oil change",500);

insert into products (productName,productPrice) values('breaks',3000);

insert into customer_services (customer_id,totalAmount,tax,serviceStatus,paymentType)
 values(2,10000,0.05*totalAmount,'pending','cod');

insert into service_details (customer_id,customerServices_id,service_id,product_id,quantity,totalAmount)
values(2,2,1,1,1,100);

insert into offer (offer_name,offer_discount,offer_min_value) values("diwali",.50,5000);

insert into invoice (totalBill,service_details_id,customer_id,offer_id)
values (1000,1,1,2);

```
- select or get service_details
```bash
   select c.firstName as customer,s.service_details_id as 'customer service details id',  s.service_id,sr.serviceName,sr.servicePrice,
      s.product_id,p.productName,p.productPrice ,s.quantity, (sr.servicePrice + (p.productPrice)*s.quantity) as total_amount
    from service_details s INNER JOIN customer c
                           INNER Join services sr
                           INNER JOIN products p
    where s.customer_id = ${request.customerId};
```
  - service history
```bash
           select i.invoice_id,(c.firstName + c.lastName) as customer_name,c.contact,
        cs.customerServices_id,cs.tax,o.offer_name,i.totalBill as "to pay" 
        from invoice i INNER JOIN customer c ON i.customer_id = c.customer_id 
                       INNER JOIN customer_services cs ON i.customerServices_id = cs.customerServices_id
        			   INNER JOIN offer o ON i.offer_id = o.offer_id
			   where i.customer_id = ${request.customerId};
```            
- customer_payment

```bash
select c.customer_id,CONCAT(c.firstName,lastName) as 'customer name',c.contact,c.email, i.invoice_id,i.totalBill,i.createdOn 
    from invoice i INNER JOIN customer c ON i.customer_id = c.customer_id where i.customer_id = '${request.customerId}' ;

```