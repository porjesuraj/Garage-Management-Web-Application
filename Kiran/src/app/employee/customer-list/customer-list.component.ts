import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  email=sessionStorage.getItem("email")

  customers = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService ) { }

  ngOnInit(): void {
    this.loadCustomers()
  }

  loadCustomers() {

    this.employeeService.getCustomers().subscribe(response => {

        if (response['status'] == 'success') {
          this.customers = response['data']
          console.log(this.customers)
        } else {
          console.log(response['error'])
        }
      }
      )
  }

  onEdit(customer) {
    this.router.navigate(['/employee/customer-add'], {queryParams: {id: customer['id']}})
  }

  addCustomer() {
    this.router.navigate(['/employee/customer-add'])
  }

  onDelete(customer){
    this.employeeService.deleteCustomer(customer['id']).subscribe(response =>{
      if(response['status']=='success'){
        this.loadCustomers()
      }else{
        console.log(response['error'])
      }
    })
  }

  onLogout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')

    this.router.navigate(['/auth/login'])
  }
}

