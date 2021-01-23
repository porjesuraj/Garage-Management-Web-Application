import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

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

    console.log(this.id);
    
    this.getPreFilledValues(this.id)

  }

  getPreFilledValues(id:number){

    console.log("on load")
    if(id>0){
      this.employeeService.getServiceDetails(id).subscribe(response => {
        if (response['status'] == 'success') {
          
            this.vehicle_brand = response['data']['vehicle_brand']
            this.vehicle_reg_no = response['data']['vehicle_reg_no']
            this.vehicle_model = response['data']['vehicle_model']
            this.vehicle_type = response['data']['vehicle_type']
            this.delivery_type = response['data']['delivery_type']
            this.service_date = response['data']['service_date']

            this.status = response['data']['status']
            console.log(this.customer);
            
            console.log("on load" + this.customer);

          }

      })
    }
    else {

   }
  }

  onCancel(){
    this.location.back()
  }

  onSave(){

    this.employeeService.generateInvoice(this.id, this.total ,this.discount, this.labour_charges, this.out_date, this.product_charges,this.service_date,this.status  ,this.vehicle_reg_no,this.vehicle_type,this.vehicle_brand,this.vehicle_model,this.delivery_type).subscribe(response=>{
         if(response['status']=='success'){
           this.router.navigate(['/employee/customer-list'])
         }else{
           console.log(response['error'])
           window.alert("Service is already Used")
         }
       })
     }


     onUpdate() {

        console.log('in update')
        this.employeeService
          .generateInvoice(this.id, this.total ,this.discount, this.labour_charges, this.out_date, this.product_charges,this.service_date,this.status  ,this.vehicle_reg_no,this.vehicle_type,this.vehicle_brand,this.vehicle_model,this.delivery_type)
          .subscribe(response => {
            if (response['status'] == 'success') {
              this.router.navigate(['/employee/customer-list'])
            }
          })

  
    }

}
