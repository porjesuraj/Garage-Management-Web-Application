import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  vehicle_reg_no
  vehicle_type
  vehicle_brand
  vehicle_model
  delivery_type

 cust_id

  constructor(
    private location:Location,
    private router:Router,
    private customerService:CustomerService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

     this.cust_id = this.activatedRoute.snapshot.queryParams['id']

  }

  onCancel(){
    this.location.back()
  }

  onSave(){

    this.customerService.addService(this.cust_id ,this.vehicle_reg_no,this.vehicle_type,this.vehicle_brand,this.vehicle_model,this.delivery_type).subscribe(response=>{
         if(response['status']=='success'){
           this.router.navigate(['/customer/home'])
         }else{
           console.log(response['error'])
           window.alert("Service is already Used")
         }
       })
     }

}
