import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeehome',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.css']
})
export class EmployeehomeComponent implements OnInit {

  stockCount
  employeesCount
  customersCount
  feedbackCount

  constructor(
    private router: Router,
    private employeeService:EmployeeService

  ) { }

  ngOnInit(): void {
    this.employeeService.getCount().
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
    sessionStorage.removeItem('role')

    this.router.navigate(['/auth/login'])
  }
}
