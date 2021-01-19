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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.EmployeeDao;
import com.app.dao.FeedbackDao;
import com.app.pojos.Customer;
import com.app.pojos.Employee;
import com.app.pojos.Feedback;
import com.app.pojos.User;
import com.app.service.CustomerService;
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
	private UserService userService;
	@Autowired
	private CustomerService customerService; 

	public EmployeeController() {
		System.out.println("in ctor of " + getClass().getName());
	}

	// ---------------------------------------------------------------------------
	// Signin vendor
	// ---------------------------------------------------------------------------

	/*
	 * @PostMapping("/signin") public Employee
	 * authenticateEmployee(@Valid @RequestBody Employee employee) {
	 * 
	 * // System.out.println(email + password); Employee v =
	 * employeeDao.findByEmailAndPassword(employee.getEmail(),
	 * employee.getPassword());
	 * 
	 * if (v != null) return v; else return null; }
	 */
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
	/*@PutMapping("/editEmployee/{id}")
	public ResponseEntity<?> updateEmployee(@PathVariable(value = "id") int employee_id,
			@Valid @RequestBody Employee employeeDetails) throws Exception {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("in update employee profile");

		Employee employee = employeeDao.findById(employee_id)
				.orElseThrow(() -> new Exception("Employee not found for this id :: " + employee_id));

		employee.setEmail(employeeDetails.getEmail());
		employee.setPassword(employeeDetails.getPassword());
		final Employee updatedEmployee = employeeDao.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}*/
	
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
}
