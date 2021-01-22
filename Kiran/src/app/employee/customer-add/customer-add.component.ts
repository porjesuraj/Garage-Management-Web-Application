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

  employee_id = sessionStorage.getItem("id")

  name
  email
  password
  birth_date
  contact
  address

  customer = null

  constructor(
    private location: Location,
    private router: Router,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id']
    this.getPreFilledValues(id)
  }

  onSave() {

    this.employeeService.addCustomer(this.name, this.email, this.password, this.birth_date, this.employee_id, this.address, this.contact).subscribe(response => {
      if (response['status'] == 'success') {
        this.router.navigate(['/employee/customer-list'])
      } else {
        console.log(response['error'])
        window.alert("Customer is already Used")
      }
    })
  }
  onCancel() {
    this.location.back()
  }

  onUpdate() {

    if (this.customer) {
      // edit
      this.employeeService
        .updateCustomer(this.customer['id'], this.name, this.email, this.password, this.birth_date, this.employee_id, this.address, this.contact)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/employee/customer-list'])
          }
        })
    } else {
      // insert
      this.employeeService
      .addCustomer(this.name, this.email, this.password, this.birth_date, this.employee_id, this.address, this.contact)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/employee/customer-list'])
          }
        })
    }

  }

  getPreFilledValues(id: number) {

    if (id > 0) {
      this.employeeService.getCustomerDetails(id).subscribe(response => {
        if (response['status'] == 'success') {

          this.name = response['data']['name']
          this.email = response['data']['email']
          this.password = response['data']['password']
          this.birth_date = response['data']['birth_date']
          this.employee_id = response['data']['employee_id']
          this.address = response['data']['address']
          this.contact = response['data']['contact']

          this.customer = response['data']

          console.log(id);

        }

      })
    }
  }


  onLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')

    this.router.navigate(['/auth/login'])
  }

}
