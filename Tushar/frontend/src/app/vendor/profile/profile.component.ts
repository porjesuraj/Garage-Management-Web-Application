import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { Location } from "@angular/common";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  emaill=sessionStorage.getItem("email")

  id = parseInt(sessionStorage.getItem("id"))
  
  email
  name
  password
  address
  contact

  vendor = null

  

  constructor(
    private location: Location,
    private router: Router,
    private vendorService: VendorService
  ) { }

  ngOnInit(): void {
    this.getPreFilledValues(this.id)

  }

  getPreFilledValues(id:number){
    if (id > 0) {
      this.vendorService.getProfile(id).subscribe(response=>{

        if(response['status'] == 'success' ){

          this.email = response['data']['email']
          this.name = response['data']['name']
          this.password = response['data']['password']
          this.address = response['data']['address']
          this.contact = response['data']['contact']

          this.vendor = response['data']
        }
      })
    }
  }

  onSave() {
    const body = {
      id: this.id,
      name: this.name,
      contact: this.contact,
      address: this.address,
      email: this.email,
      password : this.password,
    }
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
