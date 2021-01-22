import { CustomerService } from './../customer.service';
import { CustomerModule } from './../customer.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {

  email = sessionStorage.getItem("email")
  id = parseInt( sessionStorage.getItem("id") )

  feedback_message

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {

  }

  onLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    this.router.navigate(['/home'])
  }


  onSubmit() {

    this.customerService.addFeedback(this.id,this.feedback_message).
      subscribe(response => {

        console.log(this.feedback_message);
        console.log(this.id);

        if (response['status'] == 'success') {
          console.log("Feedback Submitted Successfully")
          this.router.navigate(['/customer/home'])
        } else {
          console.log(response['error']);
        }
      })
  }

}
