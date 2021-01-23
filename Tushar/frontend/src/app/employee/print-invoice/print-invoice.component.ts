import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css']
})
export class PrintInvoiceComponent implements OnInit {

  id
  name=''
  email=''
  password=''
  birth_date
  employee_id=sessionStorage['id']
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
    private employeeService:EmployeeService,
    private activatedRoute: ActivatedRoute,    )
    {
    this.customer = this.router.getCurrentNavigation().extras.state.customer
    this.name = this.customer['name']
    this.email = this.customer['email']
    this.password = this.customer['password']
    this.birth_date = this.customer['birth_date']
    this.contact = this.customer['contact']
    this.address = this.customer['address']
    this.id = this.customer['id']
  }
  ngOnInit(): void {
    this.getPreFilledValues(this.id)

  }

  onCancel(){
    this.location.back()
  }

  getPreFilledValues(id:number){

    console.log("on load")
    if(id>0){
      this.employeeService.getInvoiceDetails(id).subscribe(response => {
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
