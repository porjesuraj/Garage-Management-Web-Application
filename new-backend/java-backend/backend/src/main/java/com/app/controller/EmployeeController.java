package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.CustomerDao;
import com.app.dao.EmployeeDao;
import com.app.dao.FeedbackDao;
import com.app.dao.StockDao;
import com.app.pojos.Customer;
import com.app.pojos.Employee;
import com.app.pojos.Feedback;
import com.app.pojos.ServiceRequest;
import com.app.pojos.Stock;
import com.app.pojos.User;
import com.app.service.CustomerService;
import com.app.service.ServiceRequestService;
import com.app.service.StockService;
import com.app.service.UserService;
@CrossOrigin
@RestController // @Controller + @ResponseBody
@RequestMapping("/employee")
public class EmployeeController {

	@Autowired
	private EmployeeDao employeeDao;

	@Autowired
	private FeedbackDao feedbackDao;
	
	
	@Autowired
	private CustomerDao customerDao;

	
	@Autowired
	private StockDao stockDao; 
	
	
	@Autowired
	private UserService userService;
	@Autowired
	private CustomerService customerService; 
	
	@Autowired
	private ServiceRequestService serviceRequestService;
	
	@Autowired
	private StockService stockService; 

	public EmployeeController() {
		System.out.println("in ctor of " + getClass().getName());
	}

	
	// ---------------------------------------------------------------------------
	// Get Profile
	// ---------------------------------------------------------------------------
	@GetMapping("/{emp_id}")
	public ResponseEntity<?> getProfile(@PathVariable(value = "emp_id") int emp_id) {
		
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("in get employee profile");

		Optional<Employee>  emp = employeeDao.findById(emp_id);
 
		if(emp.isPresent())
		{
			map.put("status", "success"); 
			map.put("data", emp.get()); 
			resp = new ResponseEntity<>(map, HttpStatus.OK);
			
		}else
		{
			map.put("status", "error");
			map.put("error", "employee not found");
			resp = new ResponseEntity<>(map, HttpStatus.NO_CONTENT);
			
		}
		return resp; 
	}


	// ---------------------------------------------------------------------------
	// Update Profile Profile
	// ---------------------------------------------------------------------------
	
	
	@PutMapping("/editEmployee/{id}")
	public ResponseEntity<?> updateEmployee(@PathVariable(value = "id") int employee_id,
			@Valid @RequestBody Employee employeeDetails) throws Exception {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("in update employee profile");

		employeeDetails.setId(employee_id);
		
		
		if(employeeDao.save(employeeDetails) != null)
		{
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
			
		}else
		{
			map.put("status", "error");
			map.put("error", "Employee Not Found");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		return resp;
	}


	// ---------------------------------------------------------------------------
	// Signup Customer
	// ---------------------------------------------------------------------------

	@PostMapping("/customer/signup")
	public ResponseEntity<?> customerSignup(@RequestBody Customer newCustomer)  throws AuthenticationException {
		
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		System.out.println("New Customer : "+ newCustomer);
		
		if (userService
				.addUser(new User(newCustomer.getEmail(), newCustomer.getPassword(),"CUSTOMER",1)) != null && customerService.addCustomer(newCustomer) != null) {
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} else {
			map.put("status", "error");
			map.put("error", "Can't Add Customer");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return resp;
	}
	
	//----------------------------------------------------------------------------
	// Customer list
	//----------------------------------------------------------------------------
	 @GetMapping("/customerList/{employeeId}") public ResponseEntity<?>
	  fetchAllCustomer(@PathVariable int employeeId) { ResponseEntity<?> resp =
	 null; Map<String, Object> map = new HashMap<String, Object>();
	  
	 System.out.println("in fetch all customer");
	 
	 
	 
	 try { List<Customer> customer = customerDao.findAllByEmployeeId(employeeId);
	  map.put("status", "success");
	  map.put("data",  customer); 
	  resp = new ResponseEntity<>(map, HttpStatus.OK); } catch (Exception e) {
	  System.err.println("Exception : " + e.getMessage()); map.put("status",
	 "error"); resp = new ResponseEntity<>(map, HttpStatus.NO_CONTENT); }
	  
	  return resp; }
	 
	
	
	
	// ---------------------------------------------------------------------------
		// Customer by id
		// ---------------------------------------------------------------------------
	@GetMapping("/customer/{id}")
	public ResponseEntity<?> getCustomerById(@PathVariable int id) {
		
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		
		System.out.println("in fetch all Customer");

		try {
			Customer customer = customerService.findById(id);
			map.put("status", "success");
			map.put("data", customer);
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			map.put("error", "Customers Not Found");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
           return resp; 
		
	}

	
	// ---------------------------------------------------------------------------
	// Get Service Request ny Customer id
	// ---------------------------------------------------------------------------
@GetMapping("/service/{customer_id}")
public ResponseEntity<?> getCustomerServiceRequestById(@PathVariable int customer_id) {
	
	ResponseEntity<?> resp = null;
	Map<String, Object> map = new HashMap<String, Object>();
	
	System.out.println("in fetch all Customer service request");

	try {
		ServiceRequest service = serviceRequestService.getByCustomerIdAndStatus(customer_id,"PENDING");
		map.put("status", "success");
		map.put("data", service);
		System.out.println("get servicing");
		System.out.println(service);
		resp = new ResponseEntity<>(map, HttpStatus.OK);
	} catch (Exception e) {
		System.err.println("Exception : " + e.getMessage());
		map.put("status", "error");
		map.put("error", "Customers Not Found");
		resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
       return resp; 
	
}
	
	//------------------------------------------------------------------------
			// Add Service Request
			//------------------------------------------------------------------
			@PostMapping("/customer/addService/{customer_id}")
			public ResponseEntity<?> createService(@Valid @RequestBody ServiceRequest serviceRequest,@PathVariable int customer_id) {
				
				ResponseEntity<?> resp = null;
				Map<String, Object> map = new HashMap<String, Object>();
				
		         serviceRequest.setCustomerId(customer_id);
				
				if(serviceRequestService.addServiceRequest(serviceRequest) != null )
				{
					map.put("status", "success");
					resp = new ResponseEntity<>(map, HttpStatus.OK);
				}else
				{
					map.put("status", "error");
					map.put("error", "Can't Add service request");
					resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
				}
				return resp; 
			}
			
			
	//------------------------------------------------------------------
	// update Service Status
	//-----------------------------------------------------------------
			@PutMapping("/customer/service/acceptServiceRequest/{customer_id}")
			public ResponseEntity<?> updateStatus( @PathVariable int customer_id) throws Exception {
				ResponseEntity<?> resp = null;
				Map<String, Object> map = new HashMap<String, Object>();
				System.out.println("in update customer service status");

				  ServiceRequest request = null;
				  request =  serviceRequestService.getByCustomerIdAndStatus(customer_id, "REQUESTED");
				
				
				
				if(request != null)
				{
					request.setStatus("PENDING");
					map.put("status", "success");
					resp = new ResponseEntity<>(map, HttpStatus.OK);
					
				}else
				{
					map.put("status", "error");
					map.put("error", "Customer Service  Not Found");
					resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
				}
				
				
				return resp;
			}
			
			@PutMapping("/customer/service/createInvoice/{customer_id}")
			public ResponseEntity<?> makeInvoiceFromServiceRequest( @PathVariable int customer_id,@RequestBody ServiceRequest serviceRequest) throws Exception {
				ResponseEntity<?> resp = null;
				Map<String, Object> map = new HashMap<String, Object>();
				System.out.println("in create invoice");

				  ServiceRequest request = null;
				  request =  serviceRequestService.getByCustomerIdAndStatus(customer_id, "PENDING");
				
			
				
				if(request != null)
				{
					request.setOutDate(serviceRequest.getOutDate());
					request.setDiscount(serviceRequest.getDiscount()*100);
					request.setStatus("COMPLETED");
					request.setLabourCharges(serviceRequest.getLabourCharges());
					 request.setProductCharges(serviceRequest.getProductCharges());
					double discount = 1 - serviceRequest.getDiscount(); 
					
					request.setTotal((serviceRequest.getProductCharges() + serviceRequest.getLabourCharges()) * discount);
					
					 serviceRequestService.addServiceRequest(request); 
					map.put("status", "success");
					
					
					resp = new ResponseEntity<>(map, HttpStatus.OK);
					
				}else
				{
					map.put("status", "error");
					map.put("error", "Customer Service  Not Found");
					resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
				}
				
				
				return resp;
			}
			
			// ---------------------------------------------------------------------------
			// List of all Customer
			// ---------------------------------------------------------------------------
			@GetMapping("/Customerlist")
			public ResponseEntity<?> fetchAllCustomers() {
				
				ResponseEntity<?> resp = null;
				Map<String, Object> map = new HashMap<String, Object>();
				
				System.out.println("in fetch all Customer");

				try {
					List<Customer> customers = customerDao.findAll();
					map.put("status", "success");
					map.put("data", customers);
					resp = new ResponseEntity<>(map, HttpStatus.OK);
				} catch (Exception e) {
					System.err.println("Exception : " + e.getMessage());
					map.put("status", "error");
					map.put("error", "Customers Not Found");
					resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
				}
				
		           return resp; 
				
			}
			
			// ---------------------------------------------------------------------------
			// List of all Customer by employee id
			// ---------------------------------------------------------------------------
			@GetMapping("/Customerlist/{employee_id}")
			public ResponseEntity<?> fetchAllCustomers(@PathVariable int employee_id) {
				ResponseEntity<?> resp = null;
				Map<String, Object> map = new HashMap<String, Object>();
							
				System.out.println("in fetch all Customer");

							try {
								List<Customer> customers = customerDao.findAllByEmployeeId(employee_id);
								map.put("status", "success");
								map.put("data", customers);
								resp = new ResponseEntity<>(map, HttpStatus.OK);
							} catch (Exception e) {
								System.err.println("Exception : " + e.getMessage());
								map.put("status", "error");
								map.put("error", "Customers Not Found");
								resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
							}
							
					           return resp; 
							
						}
			
		
		// ---------------------------------------------------------------------------
		// Delete Customer
		// ---------------------------------------------------------------------------

		@DeleteMapping("/deleteCustomer/{id}")
		public ResponseEntity<?> deleteCustomer(@PathVariable(value = "id") int employee_id) throws Exception {
			
			ResponseEntity<?> resp = null;
			Map<String, Object> map = new HashMap<String, Object>();
			
			
			Customer customer = null;
			customer = customerDao.findById(employee_id)
					.orElseThrow(() -> new Exception("Customer not found for this id :: " + employee_id));

			if(customer != null)
			{
				userService.deleteUser(customer.getEmail());
				customerDao.delete(customer);
				map.put("status", "success");
				resp = new ResponseEntity<>(map, HttpStatus.OK);
			}else
			{
				map.put("status", "error");
				map.put("error", "Customer Not Found");
				resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			
			return resp;
		}

		// ---------------------------------------------------------------------------
		// Edit Customer
		// ---------------------------------------------------------------------------

		
		
		@PutMapping("/editCustomer/{id}")
		public ResponseEntity<?> updateCustomer(@PathVariable(value = "id") int customer_id,
		@Valid @RequestBody Customer customerDetails) throws Exception {

		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();


		Customer customer = null; 
		customer = customerDao.findById(customer_id)
		.orElseThrow(() -> new Exception("Customer not found for this id :: " + customer_id));

		if(customer != null)
		{
		//customer.setEmail(employeeDetails.getEmail());
		//customer.setPassword(employeeDetails.getPassword());
		customer.setName(customerDetails.getName());
		customer.setBirthDate(customerDetails.getBirthDate());
		customer.setAddress(customerDetails.getAddress());
		customer.setContact(customerDetails.getContact());

		final Customer updatedCustomer = customerDao.save(customer);
		map.put("status", "success");
		resp = new ResponseEntity<>(map, HttpStatus.OK);
		}else
		{
		map.put("status", "error");
		map.put("error", "customer Not Found");
		resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return resp; 



		} 

		// --------------------------------------------------------------------------------------------------------------
		
		// ---------------------------------------------------------------------------
			// Block/Unblock customer
			// ---------------------------------------------------------------------------
			
			  @PutMapping("/blockCustomer/{id}") 
			  public ResponseEntity<?> BlockCustomer(@PathVariable(value = "id") int customer_Id) throws Exception { 
				 Customer customer =   customerService.findById(customer_Id); 
				  ResponseEntity<?> resp = null;
					Map<String, Object> map = new HashMap<String, Object>();
				  if(userService.deactivateUser(customer.getEmail()) != null)
				  {
						map.put("status", "success");
						resp = new ResponseEntity<>(map, HttpStatus.OK);
					  
				  }else
				  {
					  map.put("status", "error");
						map.put("error", "Customer Not Found");
						resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
					  
				  }
				  return resp; 
			  
			  
			  
			  }
			  
			   
			  @PutMapping("/unblockCustomer/{id}") 
			  public ResponseEntity<?> UnBlockCustomer(@PathVariable(value = "id") int customer_Id) throws Exception { 
				 Customer customer =   customerService.findById(customer_Id); 
				  ResponseEntity<?> resp = null;
					Map<String, Object> map = new HashMap<String, Object>();
				  if(userService.activateUser(customer.getEmail()) != null)
				  {
						map.put("status", "success");
						resp = new ResponseEntity<>(map, HttpStatus.OK);
					  
				  }else
				  {
					  map.put("status", "error");
						map.put("error", "Customer Not Found");
						resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
					  
				  }
				  return resp; 	  
			  }
			// --------------------------------------------------------------------------------------------------------------
		
			
	// ---------------------------------------------------------------------------
	// List of all Feedback
	// ---------------------------------------------------------------------------
	@GetMapping("/Feedbacklist")
	public ResponseEntity<?> fetchAllFeedbacks() {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("in fetch all Feedback");
         
		try {
			List<Feedback> feedbacks = feedbackDao.findAll();
			map.put("status", "success");
			map.put("data", feedbacks);
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	
		
		return resp;
	}
	
	//------------------------------------------------------------------------
	// Add stock
	//------------------------------------------------------------------
	@PostMapping("/addStock")
	public ResponseEntity<?> addStock(@Valid @RequestBody Stock newStock) {
		
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		
         
		
		if(stockService.addStock(newStock) != null )
		{
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		}else
		{
			map.put("status", "error");
			map.put("error", "Can't Add service request");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return resp; 
	}
	
//------------------------------------------------------------------------------------------------
// Get All Stock
//--------------------------------------------------------------------------------------------------
	@GetMapping("/AllStock")
	public ResponseEntity<?> getAllStock() 		
	{
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();	
		System.out.println("in vendor count");	
		try {	
			List<Stock> stocks = stockDao.findAll();
			

			map.put("status", "success");
			map.put("data", stocks);
			resp = new ResponseEntity<>(map, HttpStatus.OK);					
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			map.put("error", e.getMessage());
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		return resp;
		
		
	}	
	
	//------------------------------------------------------------------------------------------------
	// Get stock details by id
	//--------------------------------------------------------------------------------------------------
		@GetMapping("/stockDetails/{stock_id}")
		public ResponseEntity<?> getStockDetails(@PathVariable int stock_id) 		
		{
			ResponseEntity<?> resp = null;
			Map<String, Object> map = new HashMap<String, Object>();	
			System.out.println("in vendor count");	
			try {	
				Optional<Stock> stocks = stockDao.findById(stock_id);
				
				if(stocks.isPresent())
				{
					map.put("status", "success");
					map.put("data", stocks.get());
					resp = new ResponseEntity<>(map, HttpStatus.OK);	
				}else
				{
					
				}

								
			} catch (Exception e) {
				System.err.println("Exception : " + e.getMessage());
				map.put("status", "error");
				map.put("error", e.getMessage());
				resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
			}	
			return resp;
			
			
		}	
	
	
//------------------------------------------------------------------
// update stock
//-----------------------------------------------------------------
	@PutMapping("/updateStock/{stock_id}")
	public ResponseEntity<?> updateStock( @PathVariable int stock_id,@RequestBody Stock updatedStock) throws Exception {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("in update customer service status");

		              Stock newStock = null; 
		              newStock =  stockService.getById(stock_id); 
		  
		
		if(newStock != null)
		{
			newStock.setQuantity(updatedStock.getQuantity());
			newStock.setPrice(updatedStock.getPrice());
			newStock.setItemName(updatedStock.getItemName());
			
			stockService.addStock(newStock); 
			
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
			
		}else
		{
			map.put("status", "error");
			map.put("error", "Customer Service  Not Found");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		return resp;
	}
	
	
	
	// ---------------------------------------------------------------------------
			// Delete Customer
			// ---------------------------------------------------------------------------

			@DeleteMapping("/deleteStock/{id}")
			public ResponseEntity<?> deleteStock(@PathVariable(value = "id") int stock_id) throws Exception {
				
				ResponseEntity<?> resp = null;
				Map<String, Object> map = new HashMap<String, Object>();
				
				
				Stock stock = null;
				stock = stockDao.findById(stock_id) 
						.orElseThrow(() -> new Exception("stock not found for this id :: " + stock_id));

				if(stock != null)
				{
					stockDao.delete(stock);
					
					map.put("status", "success");
					resp = new ResponseEntity<>(map, HttpStatus.OK);
				}else
				{
					map.put("status", "error");
					map.put("error", "Customer Not Found");
					resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
				}
				
				
				return resp;
			}

	
	//------------------------------------------------------------------
	// count
	//-----------------------------------------------------------------
	@GetMapping("/AllCount")
	public ResponseEntity<?> getAllCount() 		
	{
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();	
		System.out.println("in vendor count");	
		try {	
			long stocks = stockDao.count();
			long employees = employeeDao.count();
			long customers = customerDao.count();
			long feedbacks = feedbackDao.count();

			map.put("status", "success");
			map.put("stocks", stocks);
			map.put("employees", employees);
			map.put("customers", customers);
			map.put("feedbacks", feedbacks); 
			resp = new ResponseEntity<>(map, HttpStatus.OK);					
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			map.put("error", e.getMessage());
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		return resp;
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
