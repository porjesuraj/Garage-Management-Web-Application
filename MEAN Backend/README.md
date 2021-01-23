before starting app install

```bash

sudo npm install express mysql2 morgan jsonwebtoken swagger-jsdoc swagger-ui-express cors crypto-js uuid nodemailer --save

```

<!-- ********************************************************************************************************************************* -->
<!-- --------------------------------------------------            ADMIN            -------------------------------------------------- -->
<!-- ********************************************************************************************************************************* -->

<!-- --------             Admin           -------- -->

1. Get Profile
 GET- http://localhost:3000/Admin/profile

2. Signup
POST- http://localhost:3000/Admin/signup

3. Signin
POST- http://localhost:3000/Admin/signin

4. Update Profile
PUT- http://localhost:3000/Admin/

5. Delete Profile
DELETE- http://localhost:3000/Admin/

<!-- --------      Vendor Management      -------- -->

1. List all vendors
GET- http://localhost:3000/Admin/vendor/

2. Get vendor by Id
GET- http://localhost:3000/Admin/vendor/:vendorId

3. List active vendors
GET- http://localhost:3000/Admin/vendor/active-vendor/

4. Add vendor
POST- http://localhost:3000/Admin/vendor/add

5. Delete vendor
DELETE- http://localhost:3000/Admin/vendor/:vendor_id

6. Update vendor
PUT- http://localhost:3000/Admin/vendor/:vendor_id

7. Block/Unblock vendor
PUT- http://localhost:3000/Admin/vendor/active/:vendor_id

<!-- --------           Analytics          -------- -->
<!-- vender report per vendor
overall report generation -->

<!-- --------        Offer Management      -------- -->

1. create an offer
POST- http://localhost:3000/Admin/offer/add

2. get all offers
GET- http://localhost:3000/Admin/offer/

3. get offer by id
GET- http://localhost:3000/Admin/offer/:offer_id

4. update an offer
PUT- http://localhost:3000/Admin/offer/:offer_id

5. delete an offer
DELETE- http://localhost:3000/Admin/offer/:offer_id

<!-- ********************************************************************************************************************************* -->
<!-- --------------------------------------------------            VENDOR            -------------------------------------------------- -->
<!-- ********************************************************************************************************************************* -->

<!-- --------             vendor            -------- -->

1. Get profile
GET- http://localhost:3000/vendor/profile

2. Signin
GET- http://localhost:3000/vendor/signin

3. Update Profile
PUT- http://localhost:3000/vendor/

<!-- --------       Employee Management      -------- -->

A. list employee

1. GET Single employee
GET- http://localhost:3000/vendor/employee/:employee_id

2. GET All employees
GET- http://localhost:3000/vendor/employee/

3. GET Active employees
GET- http://localhost:3000/vendor/employee/active/

4. Add employee
POST- http://localhost:3000/vendor/employee/add

5. Update employee
PUT- http://localhost:3000/vendor/employee/:employee_id

6. Block/Unblock employee
PUT- http://localhost:3000/vendor/employee/active-status/:employee_id

7. Delete employee
DELETE- http://localhost:3000/vendor/employee/:employee_id

<!-- --------       Customer Management      -------- -->

A. List customer

1. Get single customer
GET- http://localhost:3000/vendor/customer/:customer_id

2. Get all customers
GET- http://localhost:3000/vendor/customer/

3. Add customer
POST- http://localhost:3000/vendor/customer/add

4. Update customer
UPDATE- http://localhost:3000/vendor/customer/:customer_id

5. Block/Unblock customer
PUT- http://localhost:3000/vendor/customer/active-status/:customer_id

6. Delete customer
DELETE- http://localhost:3000/vendor/customer/:customer_id

<!-- --------        Service Management       -------- -->

1. Get all job cards
GET- http://localhost:3000/vendor/jobcard/

2. Delete job card
DELETE- http://localhost:3000/vendor/jobcard/:customerServices_id

3. Generate invoice/bill
GET- http://localhost:3000/vendor/jobcard/invoice/:customerServices_id

<!-- --------            Analytics            -------- -->
<!-- employee performence
daily servicing report
monthly servicing report -->

<!-- --------             Feedback            -------- -->

1. List feedback
GET- http://localhost:3000/vendor/feedback/

2. Delete feedback
DELETE- http://localhost:3000/vendor/feedback/:feedback_id

<!-- ********************************************************************************************************************************* -->
<!-- ------------------------------------------------            EMPLOYEE            ------------------------------------------------- -->
<!-- ********************************************************************************************************************************* -->

<!-- --------             Employee             -------- -->

1. Get Profile
GET- http://localhost:3000/employee/

2. Signin
POST- http://localhost:3000/employee/signin

3. Update Profile
PUT- http://localhost:3000/employee/

4. Delete Profile
DELETE- http://localhost:3000/employee/

<!-- --------        Job card management       -------- -->

1. View job cards for th employee
GET- http://localhost:3000/employee/jobcard/

2. Make a job card
POST- http://localhost:3000/employee/jobcard/create

3. Update job card
PUT- http://localhost:3000/employee/jobcard/:customerServices_id

4. Delete job card
DELETE- http://localhost:3000/employee/jobcard/:customerServices_id

<!-- --------             Feedback             -------- -->

1. Get feedback
GET- http://localhost:3000/employee/feedback/

<!-- ********************************************************************************************************************************* -->
<!-- ------------------------------------------------            CUSTOMER            ------------------------------------------------- -->
<!-- ********************************************************************************************************************************* -->

<!-- --------              Customer              -------- -->

1. Get Profile
POST- http://localhost:3000/customer/profile

2. Signup
POST- http://localhost:3000/customer/signup

3. Signin
POST- http://localhost:3000/customer/signin

<!-- --------         Service Management         -------- -->

1. Get service history
GET- http://localhost:3000/customer/servicing/history

2. Get current service details
GET- http://localhost:3000/customer/servicing/current_service

3. Get invoice
GET- http://localhost:3000/customer/servicing/invoice

4. Pay Bill
GET- http://localhost:3000/customer/servicing/payment

<!-- --------              Feedback              -------- -->

1. add feedback
POST- http://localhost:3000/customer/feedback/post
