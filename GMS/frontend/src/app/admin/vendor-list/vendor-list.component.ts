import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  email=sessionStorage.getItem("email")

  vendors = [];

  constructor(
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadVendors()
  }

  loadVendors() {

    this.adminService.getVendors().subscribe(response => {

      if (response['status'] == 'success') {
        this.vendors = response['data']
        console.log(this.vendors)
      } else {
        console.log(response['error'])
      }
    }
    )
  }

  onEdit(vendor) {
    this.router.navigate(['/admin/vendor-add'], { queryParams: { id: vendor['id'] } })
  }

  addVendor() {
    this.router.navigate(['/admin/vendor-add'])
  }

  onDelete(vendor) {
    this.adminService.deleteVendor(vendor['id']).subscribe(response => {
      if (response['status'] == 'success') {
        this.loadVendors()
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

