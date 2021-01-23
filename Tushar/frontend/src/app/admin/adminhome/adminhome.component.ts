import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  email=sessionStorage.getItem("email")

  vendorsCount
  employeesCount
  customersCount
  feedbackCount

  constructor(
    private router: Router,
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getCount().
    subscribe(response=>{
      if(response['status']=='success'){
        this.vendorsCount = response['vendors']
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
