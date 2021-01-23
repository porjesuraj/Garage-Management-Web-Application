import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.css']
})
export class StockAddComponent implements OnInit {

  item_name = ''
  price = 0 
  quantity = 0

  stocks = null
  id = 0
  constructor(
    private location:Location,
    private router:Router,
    private employeeService:EmployeeService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

     this.id = this.activatedRoute.snapshot.queryParams['id']
    this.getPreFilledValues(this.id)
  }

  onCancel(){
    this.location.back()
  }

  onUpdate() {

    if (this.stocks) {
      // edit

      console.log(this.id)

      console.log('update')
      this.employeeService
        .updateStock(this.id,this.item_name, this.quantity, this.price)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/employee/stock-list'])
          }
        })
    } else {
      // insert
      this.employeeService.addStock(this.item_name, this.quantity, this.price)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/employee/stock-list'])
          }
        })
    }

  }

   getPreFilledValues(id:number){

    if(id>0){
      this.employeeService.getStockDetails(id).subscribe(response => {
        if (response['status'] == 'success') {
                 this.item_name = response['data']['item_name']
                 this.price = response['data']['price']
                 this.quantity = response['data']['quantity']

            this.stocks = response['data']
            

          }

      })
    }
    else {

   }
  }


  onLogout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')

    this.router.navigate(['/auth/login'])
  }


}
