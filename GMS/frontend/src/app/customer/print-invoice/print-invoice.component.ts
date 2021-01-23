import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css']
})
export class PrintInvoiceComponent implements OnInit {

  id=sessionStorage['id']
  name=''
  email=''
  password=''
  birth_date
  employee_id
  contact=''
  address

  delivery_type
  discount
  labour_charges
  out_date
  product_charges
  service_date
  status
  total
  vehicle_brand
  vehicle_model
  vehicle_reg_no
  vehicle_type

  customer = null

  constructor(
    private location:Location,
    private router:Router,
    private customerService:CustomerService,
    private activatedRoute: ActivatedRoute,    ){}
    
  ngOnInit(): void {
    this.getPreFilledValuesCust(this.id)
    this.getPreFilledValues(this.id)

  }

  onCancel(){
    this.location.back()
  }

  getPreFilledValuesCust(id:number){
    if (id > 0) {
      this.customerService.getProfile(id).subscribe(response=>{

        if(response['status'] == 'success' ){

          this.email = response['data']['email']
          this.name = response['data']['name']
          this.birth_date = response['data']['birth_date']
          this.password = response['data']['password']
          this.address = response['data']['address']
          this.contact = response['data']['contact']
          this.employee_id = response['data']['employee_id']

          this.customer = response['data']
        }
      })
    }
  }


  getPreFilledValues(id:number){

    console.log("on load")
    if(id>0){
      this.customerService.getInvoiceDetails(id).subscribe(response => {
        if (response['status'] == 'success') {

          
            this.vehicle_brand = response['data']['vehicle_brand']
            this.vehicle_reg_no = response['data']['vehicle_reg_no']
            this.vehicle_model = response['data']['vehicle_model']
            this.vehicle_type = response['data']['vehicle_type']
            this.delivery_type = response['data']['delivery_type']
            this.status = response['data']['status']
            this.discount = response['data']['discount']
            this.labour_charges = response['data']['labour_charges']
            this.out_date = response['data']['out_date']
            this.product_charges = response['data']['product_charges']
            this.service_date = response['data']['service_date']
            this.total = response['data']['total']



            console.log(this.customer);
            
            console.log("on load" + this.customer);

          }

      })
    }
    else {

   }
  }

  onPrint(){
    window.print();
  }
}
