import { CustomerService } from './../customer.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email = sessionStorage.getItem("email")
  id = sessionStorage.getItem("id")
  name
  birth_date
  password
  address
  contact
  employee_id

  customer = null

  constructor(
    private location: Location,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    if (this.email) {
      console.log("inside")
      this.customerService.getProfile(this.id).subscribe(response => {
        console.log(response);

        if (response['status'] == 'success') {
          let customers = response['data']
          if (customers.length > 0) {
            this.customer = customers[0]
            this.name = this.customer['name']
            this.birth_date = this.customer['birth_date']
            this.password = this.customer['password']
            this.address = this.customer['address']
            this.contact = this.customer['contact']
            this.employee_id = this.customer['employee_id']
          }
        }
      })
    }
  }

  onLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    this.router.navigate(['/home'])
  }


  onSave() {
    const body = {
      id: this.id,
      name: this.name,
      birth_date: this.birth_date,
      contact: this.contact,
      address: this.address,
      email: this.email,
      password : this.password,
      employee_id:1
    }

    this.customerService.updateProfile(body).subscribe(response => {
      if (response['status'] == 'success') {
        window.alert("Successfully Updated")
        this.location.back()
      } else {
        console.log(response['error']);
      }
    })

  }

  onCancel() {
    this.location.back();
  }

}
