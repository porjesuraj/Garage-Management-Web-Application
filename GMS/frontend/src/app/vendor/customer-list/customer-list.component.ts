import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';

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
    private vendorService: VendorService) { }

  ngOnInit(): void {
    this.loadCustomers()
  }

  loadCustomers() {

    this.vendorService.getCustomers().subscribe(response => {

      if (response['status'] == 'success') {
        this.customers = response['data']
        console.log(this.customers)
      } else {
        console.log(response['error'])
      }
    }
    )
  }

  /*  onEdit(customer) {
     this.router.navigate(['/vendor/customer-list'], {queryParams: {id: customer['id']}})
   }*/

  /*   addEmployee() {
      this.router.navigate(['/vendor/customer-list'])
    } */

  onDelete(customer) {
    this.vendorService.deleteEmployee(customer['id']).subscribe(response => {
      if (response['status'] == 'success') {
        this.loadCustomers()
      } else {
        console.log(response['error'])
      }
    })
  }

  onLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('email')
    this.router.navigate(['/home'])
  }

}

