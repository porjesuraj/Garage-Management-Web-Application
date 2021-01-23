import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-feedback',
  templateUrl: './employee-feedback.component.html',
  styleUrls: ['./employee-feedback.component.css']
})
export class EmployeeFeedbackComponent implements OnInit {

  email=sessionStorage.getItem("email")

  feedbacks = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService
    ) { }

  ngOnInit(): void {
    this.loadFeedbacks()
  }

  loadFeedbacks() {
    this.employeeService.getFeedback().subscribe(response => {

      if (response['status'] == 'success') {
        this.feedbacks = response['data']
        console.log(this.feedbacks)
      } else {
        console.log(response['error'])
      }
    }
    )
  }

  onDelete(feedback) {
    this.employeeService.deleteFeedback(feedback['id']).subscribe(response => {
      if (response['status'] == 'success') {
        this.loadFeedbacks()
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

