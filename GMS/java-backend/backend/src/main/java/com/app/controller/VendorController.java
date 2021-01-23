package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.app.dao.*;
import com.app.pojos.*;
import com.app.service.CustomerService;
import com.app.service.EmployeeService;
import com.app.service.UserService;
import com.app.service.VendorService;

@CrossOrigin
@RestController // @Controller + @ResponseBody
@RequestMapping("/vendor")
public class VendorController {

	@Autowired
	private VendorDao vendorDao;

	@Autowired
	private EmployeeDao employeeDao;

	@Autowired
	private CustomerDao customerDao;

	@Autowired
	private FeedbackDao feedbackDao;

	@Autowired
	private StockDao stockDao;

	@Autowired
	private UserService userService;

	@Autowired
	private VendorService vendorService;

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private CustomerService customerService;

	public VendorController() {
		System.out.println("in ctor of " + getClass().getName());
	}

	// ---------------------------------------------------------------------------
	// vendor by id
	// ---------------------------------------------------------------------------
	@GetMapping("/{id}")
	public ResponseEntity<?> getVendorById(@PathVariable int id) {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("in fetch  vendor");
		try {
			Vendor vendor = vendorService.findById(id);

			map.put("status", "success");
			map.put("data", vendor);
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			map.put("error", e.getMessage());
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return resp;

	}

	// ---------------------------------------------------------------------------
	// vendor by id
	// ---------------------------------------------------------------------------
	@GetMapping("/byEmail/{emailId}")
	public ResponseEntity<?> getVendorByEmailId(@PathVariable String emailId) {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("in fetch  vendor");
		try {
			Vendor vendor = vendorService.getByEmailId(emailId);

			map.put("status", "success");
			map.put("data", vendor);
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			map.put("error", e.getMessage());
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return resp;

	}

	// --------------------------------------------------------------------------------------------------------------
	// ******************************Employee-Management***********************************************************
	// ---------------------------------------------------------------------------------------------------------------

	// ---------------------------------------------------------------------------
	// List of all Employee
	// ---------------------------------------------------------------------------
	@GetMapping("/employeeList")
	public ResponseEntity<?> fetchAllEmployees() {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		System.out.println("in fetch all vendor");

		try {
			List<Employee> employees = employeeDao.findAll();
			map.put("status", "success");
			map.put("data", employees);
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			resp = new ResponseEntity<>(map, HttpStatus.NO_CONTENT);
		}

		return resp;
	}

	// ---------------------------------------------------------------------------
	// List of all Employee by Vendor ID
	// ---------------------------------------------------------------------------

	@GetMapping("/employeeList/{vendorId}")
	public ResponseEntity<?> fetchAllEmployees(@PathVariable int vendorId) {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		System.out.println("in fetch all vendor");

		try {
			List<Employee> employees = employeeDao.findAllByVendorId(vendorId);
			map.put("status", "success");
			map.put("data", employees);
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			resp = new ResponseEntity<>(map, HttpStatus.NO_CONTENT);
		}

		return resp;
	}

	// ---------------------------------------------------------------------------
	// Get Employee by Vendor email
	// ---------------------------------------------------------------------------
	@GetMapping("/employeeList/byEmail/{vendorEmail}")
	public ResponseEntity<?> fetchAllEmployees(@PathVariable String vendorEmail) {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		System.out.println("in fetch all vendor");

		Vendor vendor = vendorService.getByEmailId(vendorEmail);

		try {
			List<Employee> employees = employeeDao.findAllByVendorId(vendor.getId());
			map.put("status", "success");
			map.put("data", employees);
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			resp = new ResponseEntity<>(map, HttpStatus.NO_CONTENT);
		}

		return resp;
	}

	// ---------------------------------------------------------------------------
	// Employee of id
	// ---------------------------------------------------------------------------
	@GetMapping("/employee/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable int id) {
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		System.out.println("in fetch all vendor");

		try {
			Employee employee = employeeService.findById(id);
			map.put("status", "success");
			map.put("data", employee);
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			resp = new ResponseEntity<>(map, HttpStatus.NO_CONTENT);
		}

		return resp;
	}

	// ---------------------------------------------------------------------------
	// Add Employee
	// ---------------------------------------------------------------------------

	@PostMapping("/addEmployee")
	public ResponseEntity<?> EMployeeSignup(@RequestBody Employee newEmployee) throws AuthenticationException {

		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		System.out.println("New Employee : " + newEmployee);

		if (userService.addUser(new User(newEmployee.getEmail(), newEmployee.getPassword(), "EMPLOYEE", 1)) != null
				&& employeeService.addEmployee(newEmployee) != null) {
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} else {
			map.put("status", "error");
			map.put("error", "Can't Add Employee");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return resp;
	}

	// ---------------------------------------------------------------------------
	// Delete Employee
	// ---------------------------------------------------------------------------

	@DeleteMapping("/deleteEmployee/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable(value = "id") int employee_id) throws Exception {

		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		Employee employee = employeeDao.findById(employee_id)
				.orElseThrow(() -> new Exception("Employee not found for this id :: " + employee_id));

		try {

			userService.deleteUser(employee.getEmail());
			employeeDao.delete(employee);
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			map.put("error", "Employee Not Found");
			resp = new ResponseEntity<>(map, HttpStatus.NO_CONTENT);
		}

		return resp;
	}

	// ---------------------------------------------------------------------------
	// Edit Employee
	// ---------------------------------------------------------------------------

	@PutMapping("/editEmployee/{id}")
	public ResponseEntity<?> updateEmployee(@PathVariable(value = "id") int employee_id,
			@Valid @RequestBody Employee employeeDetails) throws Exception {

		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		Employee employee = null;
		employee = employeeDao.findById(employee_id)
				.orElseThrow(() -> new Exception("Employee not found for this id :: " + employee_id));

		if (employee != null) {
			employee.setEmail(employeeDetails.getEmail());
			employee.setPassword(employeeDetails.getPassword());
			employee.setName(employeeDetails.getName());
			employee.setBirthDate(employeeDetails.getBirthDate());
			final Employee updatedEmployee = employeeDao.save(employee);
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} else {
			map.put("status", "error");
			map.put("error", "Employee Not Found");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return resp;

	}

	// ---------------------------------------------------------------------------
	// Block/Unblock employee
	// ---------------------------------------------------------------------------

	@PutMapping("/blockEmployee/{id}")
	public ResponseEntity<?> BlockEmployee(@PathVariable(value = "id") int employee_Id) throws Exception {
		Employee employee = employeeService.findById(employee_Id);
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		if (userService.deactivateUser(employee.getEmail()) != null) {
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);

		} else {
			map.put("status", "error");
			map.put("error", "Employee Not Found");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);

		}
		return resp;

	}

	@PutMapping("/unblockEmployee/{id}")
	public ResponseEntity<?> UnblockEmployee(@PathVariable(value = "id") int employee_Id) throws Exception {
		Employee employee = employeeService.findById(employee_Id);
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		if (userService.activateUser(employee.getEmail()) != null) {
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);

		} else {
			map.put("status", "error");
			map.put("error", "Employee Not Found");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);

		}
		return resp;

	}

	// --------------------------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------------------------
	// *************************Customer-Management****************************************************************
	// ---------------------------------------------------------------------------------------------------------------
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
	// Delete Customer
	// ---------------------------------------------------------------------------

	@DeleteMapping("/deleteCustomer/{id}")
	public ResponseEntity<?> deleteCustomer(@PathVariable(value = "id") int employee_id) throws Exception {

		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		Customer customer = null;
		customer = customerDao.findById(employee_id)
				.orElseThrow(() -> new Exception("Customer not found for this id :: " + employee_id));

		if (customer != null) {
			userService.deleteUser(customer.getEmail());
			customerDao.delete(customer);
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} else {
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
	public ResponseEntity<?> updateCustomer(@PathVariable(value = "id") int employee_id,
			@Valid @RequestBody Customer customerDetails) throws Exception {

		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		customerDetails.setId(employee_id);

		if (customerDao.save(customerDetails) != null) {
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} else {
			map.put("status", "error");
			map.put("error", "Student Not Found");
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
		Customer customer = customerService.findById(customer_Id);
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		if (userService.deactivateUser(customer.getEmail()) != null) {
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);

		} else {
			map.put("status", "error");
			map.put("error", "Customer Not Found");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);

		}
		return resp;

	}

	@PutMapping("/unblockCustomer/{id}")
	public ResponseEntity<?> UnBlockCustomer(@PathVariable(value = "id") int customer_Id) throws Exception {
		Customer customer = customerService.findById(customer_Id);
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		if (userService.activateUser(customer.getEmail()) != null) {
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);

		} else {
			map.put("status", "error");
			map.put("error", "Customer Not Found");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);

		}
		return resp;
	}
	// --------------------------------------------------------------------------------------------------------------

	// *************************Feedback-Management****************************************************************
	// ---------------------------------------------------------------------------------------------------------------
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
	// ---------------------------------------------------------------------------
	// Delete Feedback
	// ---------------------------------------------------------------------------

	@DeleteMapping("/deleteFeedback/{id}")
	public ResponseEntity<?> deleteFeedback(@PathVariable(value = "id") int id) throws Exception {

		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();

		Feedback feedback = feedbackDao.findById(id)
				.orElseThrow(() -> new Exception("Feedback not found for this id :: " + id));

		try {
			feedbackDao.delete(feedback);
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return resp;
	}

	// ---------------------------------------------------------------------------
	// count
	// ---------------------------------------------------------------------------
	@GetMapping("/AllCount")
	public ResponseEntity<?> getAllCount() {
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
