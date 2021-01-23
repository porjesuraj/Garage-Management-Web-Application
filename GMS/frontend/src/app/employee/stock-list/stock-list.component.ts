import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  email=sessionStorage.getItem("email")

  stockCount
  employeesCount
  customersCount
  feedbackCount
  
stocks = []

stock = null

  constructor(
    private router: Router,
    private employeeService: EmployeeService ) { }

  ngOnInit(): void {    
    this.loadStocks()

    this.employeeService.getCount().
    subscribe(response=>{
      if(response['status']=='success'){
        this.stockCount = response['stocks']
        this.employeesCount = response['employees']
        this.customersCount = response['customers']
        this.feedbackCount = response['feedbacks']
      }
    })

    console.log(this.stocks) 
  }

  loadStocks() {

    this.employeeService.getStocks().subscribe(response => {

      console.log('in load stocks')

        if (response['status'] == 'success') {
          this.stocks= response['data']
          console.log(this.stocks)
        } else {
          console.log(response['error'])
        }
      }
      )
  }

  onEdit(stock) {
    this.router.navigate(['/employee/stock-add'], {queryParams: {id: stock['stock_id']}})
  }

  addStock() {
    this.router.navigate(['/employee/stock-add'])
  }

  onDelete(stock){
    this.employeeService.deleteStock( stock['stock_id']).subscribe(response =>{
      if(response['status']=='success'){
        this.loadStocks()
      }else{
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

