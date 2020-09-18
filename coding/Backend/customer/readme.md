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
     - get service history
     - get current serivce details
     - get invoice 
     - Pay Bill
  4. Feedback
     - add feedback
     - delete feedback that has already been posted
     
        
        "firstName" : "suraj",
        "middleName" : "valu",
        "lastName" : "porje",
        "birthDate" : 1994-01-01,
        "contact" : 9881233422,
        "email" : "testprojectdac@gmail.com",
        "address" : "nasik",
        "password" : "IndiaIsBest"