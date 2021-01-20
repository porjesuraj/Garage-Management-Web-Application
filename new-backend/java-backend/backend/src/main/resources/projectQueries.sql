
 insert into users values("raj",1,"1234","ADMIN");

  insert into users values("suraj",1,"1234","ADMIN");
 
  insert into admin values(2,"raj@gmail.com","raj","1234");

insert into vendor values(1,"nasik","9881","varsha@gmail.com","varsha","1234");  
 

admin: 
 {
 "email"   : "root@gmail.com",        
 "name"   : "root",
 "password": "1234" 
 }




vendor: 
{
 "address" : "nasik",  
 " contact" : "8668951369",
  "email" : "naga@gmail.com",           
  "name" : "naga" ,
  "password" : "1234"
}



employeee: 
 {        
 "birth_date" : "1994-01-01"  
 "email" : "arjun@gmail.com"       
 "name"   : "allo arjun"     
 "password" : "1234"   
 "vendor_id" : 1      

 }

 customer:
 {
"birth_date" : "1994-01-01" , 
 "email" : "arjun@gmail.com",       
 "name"   : "allo arjun",     
 "password" : "1234",   
  "address" : "nasik",  
 " contact" : "8668951369" 
 }


service request: 
{
 "request_id" : ,     
 "customer_id" : ,     
 "delivery_type": "DROPBY" ,  
 "discount"     :   , 
 "labour_charges" : , 
 "out_date"      : "", 
 "service_date"  : "", 
 "status"        : "", 
 "total"         : "", 
 "vehicle_brand"  : "", 
 "vehicle_model"  : " ",
 "vehicle_reg_no" : "",
 "vehicle_type"   : ""
}

while requesting service
{   
 "customer_id" : 1,     
 "delivery_type": "DROPBY" ,    
 "vehicle_brand"  : "ford", 
 "vehicle_model"  : "figo",
 "vehicle_reg_no" : "MH 15 2020",
 "vehicle_type"   : "CAR"
}


{
         
 "discount"     :  10 , 
 "labour_charges" :1000 , 
 "out_date"      : "2020-01-20", 
 "status"        : "COMPLETED", 
 "total"         : discount + labour_charges
 
}

stock 
{
 "stock_id" : ,  
 "item_name" : "", 
 "price"  : ,   
 "quantity" :   
}


{
   
 "item_name" : "gear", 
 "price"  : 1000,   
 "quantity" : 2  
}