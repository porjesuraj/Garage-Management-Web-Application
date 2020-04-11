---
Customer: Clinent, who gets service by vendor.
Vendor:      Service center owner.
Employee: He actually handles service of customers.
Admin:       He has an authority to ADD and DELETE Vendors.
---

##Customer role:   
   
    1. 	Login
    2. 	Register
    3. 	Vehicle Servicing Task
    4. 	Service History
    5. 	Service Booking
    6. 	View  Invoice Details
    7.  Pay Bill
    8. 	Feedback

  ```plantuml 
left to right direction
Customer-->(login)
Customer-->(Register)
Customer-->(Servicing History)
Customer-->(Service Booking)
Customer-->(Inform Servicing Task)
Customer-->(View Invoice Details)
Customer-->(Pay Bill)
Customer-->(Feedback)
```



##Vendor role:

	1. Login
	2. New customer registration
	3. Remove Customer
	4. Search Existing customer 
	5. Employee Management
		- Add Employee
		- Remove Employee
		- List Registered Employee
	6.  Job Assignment to Employee
	7.  Generate Service Invoice/ Bill
	8. Report generation
		- Employee performance
		- Daily/Monthly servicing report
	9. Store Management
		- Add Part entry
		- Remove Parts
		- List available parts
          10.Inform customer about servicing status/Servicing Status
          11. Servicing Task
          12. Create Check-list/JobCard
          13.Feedback


 ```plantuml 
left to right direction
vendor-->(login)
vendor-->(New customer Registration)
vendor-->(Remove Customer)
vendor-->(Search Existing Customer )
vendor-->(Employee Management )
vendor-->(Job Assignment to Employee)
vendor-->(Generate Service Invoice/ Bill)
vendor-->(Report generation)
vendor--> (Store Management)
vendor-->(Inform customer about servicing status/Servicing Status)
vendor-->(Servicing Task)
vendor-->(Create Check-list/JobCard)
vendor-->( Feedback)
```

##Employee role:

         1. Register
         2.Login 
	        - Update info
         3. Job Card updation
		    - Create Job-card
		    - Update Job-card/ Select Additional Task Performed on vehicle
		    - View Job-card
         4.Request to Generate Estimated Bill
         5.Feedback
         
 ```plantuml 
left to right direction
Employee-->(Register)
Employee-->(login)
Employee-->(Job Card updation)
Employee-->(Request to Generate Estimated Bill)
Employee-->(Feedback)
```

##Admin role:

            1.Login
         	2.Vendor Management
	          - Add Vendor
		      - Remove Vendor
	          - List  and search Registered Vendor
	        3.Employee Management
            4. Offers on servicing
            5. Vendor Report per vendor
            6. Overall  Report Generation
            
 ```plantuml 
left to right direction
Admin-->(login)
Admin-->(Vendor Management)
Admin-->(Employee Management)
Admin-->(Offers on servicing)
Admin-->( Vendor Report per vendor)
Admin-->( Overall  Report Generation)
```