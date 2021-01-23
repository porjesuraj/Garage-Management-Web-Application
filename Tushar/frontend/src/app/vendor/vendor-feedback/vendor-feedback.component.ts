import { VendorService } from './../vendor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-feedback',
  templateUrl: './vendor-feedback.component.html',
  styleUrls: ['./vendor-feedback.component.css']
})
export class VendorFeedbackComponent implements OnInit {

  email=sessionStorage.getItem("email")

  feedbacks = [];

  constructor(
    private router: Router,
    private vendorService: VendorService) { }

  ngOnInit(): void {
    this.loadFeedbacks()
  }

  loadFeedbacks() {
    this.vendorService.getFeedback().subscribe(response => {

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
    this.vendorService.deleteFeedback(feedback['id']).subscribe(response => {
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

