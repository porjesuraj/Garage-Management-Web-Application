import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  email=sessionStorage.getItem("email")

  name = ''
  password = ''
  birth_date
  vendor_id

  employee = null

  constructor(
    private location: Location,
    private router: Router,
    private vendorService: VendorService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id']
    this.getPreFilledValues(id)
  }

  onSave() {

    this.vendorService.addEmployee(this.name, this.email, this.password, this.birth_date, this.vendor_id).subscribe(response => {
      if (response['status'] == 'success') {
        this.router.navigate(['/vendor/employee-list'])
      } else {
        console.log(response['error'])
        window.alert("Employee is already Used")
      }
    })
  }

  onCancel() {
    this.location.back()
  }

  onUpdate() {

    if (this.employee) {
      // edit
      this.vendorService
        .updateEmployee(this.employee['id'], this.name, this.email, this.password, this.birth_date, this.vendor_id)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/vendor/employee-list'])
          }
        })
    } else {
      // insert
      this.vendorService.addEmployee(this.name, this.email, this.password, this.birth_date, this.vendor_id)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/vendor/employee-list'])
          }
        })
    }

  }

  getPreFilledValues(id: number) {
    if (id > 0) {
      this.vendorService.getEmployeeDetails(id).subscribe(response => {
        if (response['status'] == 'success') {

          this.name = response['data']['name']
          this.email = response['data']['email']
          this.password = response['data']['password']
          this.birth_date = response['data']['birth_date']
          this.vendor_id = response['data']['vendor_id']

          this.employee = response['data']
          console.log(id);

        }

      })
    }
  }


  onLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')

    this.router.navigate(['/auth/login'])
  }

}
