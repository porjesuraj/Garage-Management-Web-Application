
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name
  birth_date
  contact
  address
  email
  employee_id
  password

  customer=null

  constructor(
    private router:Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  onLogout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    this.router.navigate(['/home'])
  }

  onSignup(){

    this.customerService.signup( this.name, this.birth_date, this.contact, this.address, this.email, this.employee_id, this.password).subscribe(response=>{
      if(response[ 'status' ] == 'success')
      {
        window.alert("Successfully Registerd")
        this.router.navigate(['/home'])
      }else{
        console.log(response['error']);

      }
    })

  }

  onCancel(){
    this.router.navigate(['/home'])
  }

}
