import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  name
  email
  password
  address
  contact

  employee=null

  constructor(
    private location:Location,
    private router:Router,
    private vendorService:VendorService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
   // const id = this.activatedRoute.snapshot.queryParams['id']
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      // edit employee
      this.vendorService.getEmployeeDetails(id).subscribe(response => {
          if (response['status'] == 'success') {
            let employees = response['data']
            if (employees.length > 0) {
              this.employee = employees[0]
              this.name = this.employee['name']
              this.email = this.employee['email']
              this.password = this.employee['password']
              this.address = this.employee['address']
              this.contact = this.employee['contact']
            }
          }
        })
    } 
  }

  onSave(){

 this.vendorService.addEmployee(this.name,this.email,this.password,this.address,this.contact).subscribe(response=>{
      if(response['status']=='success'){
        this.router.navigate(['/vendor/employee-list'])
      }else{
        console.log(response['error'])
        window.alert("Employee is already Used")
      }
    })
  }
  onCancel(){
    this.location.back()
  }

  onUpdate() {

    if (this.employee) {
      // edit
      this.vendorService
        .updateEmployee(this.employee['id'], this.name, this.email, this.password, this.address, this.contact)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/employee-list'])
          }
        })
    } else {
      // insert
      this.vendorService.addEmployee(this.name, this.email, this.password, this.address, this.contact)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/employee-list'])
          }
        })
    }

  }

/*   getPreFilledValues(){
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.adminService.getVendorDetails(id).subscribe(response=>{
      if(response['status']=='success'){
        this.name = ++response['data']['name'] 
        this.email = ++response['data']['email']
        this.password = ++response['data']['password']
        this.address = ++response['data']['address']
        this.contact = ++response['data']['contact']
      }
    })
  } */
}
