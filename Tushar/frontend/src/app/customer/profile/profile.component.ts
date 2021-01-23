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

  id = parseInt(sessionStorage.getItem("id"))
  email
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
   this.getPreFilledValues(this.id)
  }

  getPreFilledValues(id:number){
    if (id > 0) {
      this.customerService.getProfile(id).subscribe(response=>{

        if(response['status'] == 'success' ){

          this.email = response['data']['email']
          this.name = response['data']['name']
          this.birth_date = response['data']['birth_date']
          this.password = response['data']['password']
          this.address = response['data']['address']
          this.contact = response['data']['contact']
          this.employee_id = response['data']['employee_id']

          this.customer = response['data']
        }
      })
    }
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

  onLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('email')
    this.router.navigate(['/home'])
  }

}
