import { AdminService } from './../admin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.css']
})
export class VendorAddComponent implements OnInit {

  name
  email
  password
  address
  contact

  vendor=null

  constructor(
    private location:Location,
    private router:Router,
    private adminService:AdminService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id']
    if (id) {
      // edit product
      this.adminService.getVendorDetails(id).subscribe(response => {
          if (response['status'] == 'success') {
            let vendors = response['data']
            if (vendors.length > 0) {
              this.vendor = vendors[0]
              this.name = this.vendor['name']
              this.email = this.vendor['email']
              this.password = this.vendor['password']
              this.address = this.vendor['address']
              this.contact = this.vendor['contact']
            }
          }
        })
    } 
  }

  onSave(){

 this.adminService.addVendor(this.name,this.email,this.password,this.address,this.contact).subscribe(response=>{
      if(response['status']=='success'){
        this.router.navigate(['/admin/vendor-list'])
      }else{
        console.log(response['error'])
        window.alert("Vendor is already Used")
      }
    })
  }
  onCancel(){
    this.location.back()
  }

  onUpdate() {

    if (this.vendor) {
      // edit
      this.adminService
        .updateVendor(this.vendor['id'], this.name, this.email, this.password, this.address, this.contact)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/product-list'])
          }
        })
    } else {
      // insert
      this.adminService.addVendor(this.name, this.email, this.password, this.address, this.contact)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/product-list'])
          }
        })
    }

  }
}
