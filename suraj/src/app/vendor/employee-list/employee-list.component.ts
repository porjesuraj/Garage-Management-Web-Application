import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees = [];

  constructor(
    private router: Router,
    private vendorService: VendorService ) { }

  ngOnInit(): void {
    this.loadEmployees()
  }

  loadEmployees() {

    this.vendorService.getEmployees().subscribe(response => {

        if (response['status'] == 'success') {
          this.employees = response['data']
          console.log(this.employees)
        } else {
          console.log(response['error'])
        }
      }
      )
  }

  onEdit(employee) {
    this.router.navigate(['/vendor/employee-add'], {queryParams: {id: employee['id']}})
  }

  addEmployee() {
    this.router.navigate(['/vendor/employee-add'])
  }

  onDelete(employee){
    this.vendorService.deleteEmployee(employee['id']).subscribe(response =>{
      if(response['status']=='success'){
        this.loadEmployees()
      }else{
        console.log(response['error'])
      }
    })
  }

  onBlock(employee){

    this.vendorService.blockEmployee(employee['id']).subscribe(response =>{
      if(response['status']=='success'){
        this.loadEmployees()
      }else{
        console.log(response['error'])
      }
    })
  }

  onUnblock(employee){
    this.vendorService.unblockEmployee(employee['id']).subscribe(response =>{
      if(response['status']=='success'){
        this.loadEmployees()
      }else{
        console.log(response['error'])
      }
    })
  }


  onLogout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')

    this.router.navigate(['/auth/login'])
  }
}

