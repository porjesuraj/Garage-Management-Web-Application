import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  name=''
  email=''
  password=''
  birth_date
  employee_id=sessionStorage['id']
  contact=''
  address

  customer=null

  constructor(
    private location:Location,
    private router:Router,
    private employeeService:EmployeeService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id']
    console.log(id)
    this.getPreFilledValues(id)
  }

  onSave(){

 this.employeeService.addCustomer(this.name,this.email,this.password,this.birth_date,this.employee_id,this.address,this.contact).subscribe(response=>{
      if(response['status']=='success'){
        this.router.navigate(['/employee/customer-list'])
      }else{
        console.log(response['error'])
        window.alert("Customer is already Used")
      }
    })
  }
  onCancel(){
    this.location.back()
  }

  onUpdate() {

    
    if (this.customer) {
      // edit
      console.log('in update')
      this.employeeService
        .updateCustomer(this.customer['id'], this.name, this.email, this.password, this.birth_date, this.employee_id,this.address,this.contact)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/employee/customer-list'])
          }
        })
    } else {
      // insert
      console.log('in add')
      this.employeeService.addCustomer(this.name, this.email, this.password, this.birth_date, this.employee_id,this.address,this.contact)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/employee/customer-list'])
          }
        })
    }

  }

   getPreFilledValues(id:number){

    console.log("on load")
    if(id>0){
      this.employeeService.getCustomerDetails(id).subscribe(response => {
        if (response['status'] == 'success') {

            this.name = response['data']['name']
            this.email = response['data']['email']
            this.password = response['data']['password']
            this.birth_date = response['data']['birth_date']
            this.address = response['data']['address']
            this.contact = response['data']['contact']
            this.customer = response['data']
            console.log(this.customer);
            
            console.log("on load" + this.customer);

          }

      })
    }
    else {

   }
  }




}
