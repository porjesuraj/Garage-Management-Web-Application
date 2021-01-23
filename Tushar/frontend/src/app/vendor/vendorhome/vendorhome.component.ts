import { VendorService } from './../vendor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendorhome',
  templateUrl: './vendorhome.component.html',
  styleUrls: ['./vendorhome.component.css']
})
export class VendorhomeComponent implements OnInit {

  email=sessionStorage.getItem("email")

  stockCount
  employeesCount
  customersCount
  feedbackCount

  constructor(
    private router:Router,
    private vendorService:VendorService
  ) { }

  ngOnInit(): void {
    this.vendorService.getCount().
    subscribe(response=>{
      if(response['status']=='success'){
        this.stockCount = response['stocks']
        this.employeesCount = response['employees']
        this.customersCount = response['customers']
        this.feedbackCount = response['feedbacks']
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
