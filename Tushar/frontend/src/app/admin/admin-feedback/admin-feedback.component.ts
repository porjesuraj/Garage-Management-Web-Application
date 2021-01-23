import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {

  email=sessionStorage.getItem("email")

  feedbacks = [];

  constructor(
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadFeedbacks()
  }

  loadFeedbacks() {
    this.adminService.getFeedback().subscribe(response => {

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
    this.adminService.deleteFeedback(feedback['id']).subscribe(response => {
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

