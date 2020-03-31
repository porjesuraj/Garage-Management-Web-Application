
## Customer uml_case diagram

     Customer can handle following use cases:
    a. Login
    b. Register
    c. Vehicle Servicing booking
    d. Invoice 
    e. Feedback
    
```plantuml

left to right direction
Customer -->(register)
Customer -->(login)
Customer -->(service booking)
Customer -->(invoice )
Customer -->(feedback)
```
## Employee uml_case diagram

      Employee  can handle following use cases:
           a.  Register
           b. Login
           c.update_info
```plantuml

left to right direction
 Employee -->(register)
 Employee -->(login)
 Employee -->(update_info)

```
## Admin uml_case diagram

       Admin can handle following use cases:
           a. Login
           b. Employee management
           c. Vendor Management
           d. Report Generation
```plantuml

left to right direction
Admin-->(login)
Admin -->(employee management)
Admin -->(vendor management)
Admin -->(report generation)
```
## Vendor uml_case diagram
        Vendor can handle following use cases:
                a. register
                b. login
                c. Job Assignment
                d. Job history
    f. Invoice Generation
    g. Employee Management
```plantuml

left to right direction
Vendor -->(register)
Vendor -->(login)
Vendor -->(job assignment)
Vendor -->(invoice generation)
Vendor -->(job history)
```
