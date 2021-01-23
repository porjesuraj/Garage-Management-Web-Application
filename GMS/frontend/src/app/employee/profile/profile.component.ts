import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
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
  vendor_id

  customer = null

  constructor(
    private location: Location,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
   this.getPreFilledValues(this.id)
  }

  getPreFilledValues(id:number){
    if (id > 0) {
      this.employeeService.getProfile(id).subscribe(response=>{

        if(response['status'] == 'success' ){

          this.email = response['data']['email']
          this.name = response['data']['name']
          this.birth_date = response['data']['birth_date']
          this.password = response['data']['password']
          this.vendor_id = response['data']['vendor_id']

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
      email: this.email,
      password : this.password,
      vendor_id:sessionStorage['id']
    }

    this.employeeService.updateProfile(body).subscribe(response => {
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
