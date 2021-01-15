package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	public VendorController() {
		System.out.println("in ctor of " + getClass().getName());
	}

	// ---------------------------------------------------------------------------
	// Signin vendor
	// ---------------------------------------------------------------------------

	@PostMapping("/signin")
	public Vendor authenticateVendor(@Valid @RequestBody Vendor vendor) {

		//System.out.println(email + password);
		Vendor v = vendorDao.findByEmailAndPassword(vendor.getEmail(),vendor.getPassword());

		if (v != null)
			return v;
		else
			return null;
	}

	// ---------------------------------------------------------------------------
	// List of all vendor
	// ---------------------------------------------------------------------------
	@GetMapping("/list")
	public ResponseEntity<?> fetchAllVendors() {
		System.out.println("in fetch all vendor");

		List<Vendor> vendors = vendorDao.findAll();

		if (vendors.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		// non empty list
		return new ResponseEntity<>(vendors, HttpStatus.OK);
	}

	// --------------------------------------------------------------------------------------------------------------
	// ******************************Employee-Management***********************************************************
	// ---------------------------------------------------------------------------------------------------------------

	// ---------------------------------------------------------------------------
	// List of all Employee
	// ---------------------------------------------------------------------------
	@GetMapping("/Employeelist")
	public ResponseEntity<?> fetchAllEmployees() {
		System.out.println("in fetch all vendor");

		List<Employee> employees = employeeDao.findAll();

		if (employees.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		// non empty list
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}

	// ---------------------------------------------------------------------------
	// Add Employee
	// ---------------------------------------------------------------------------
	@PostMapping("/addEmployee")
	public Employee createEmployee(@Valid @RequestBody Employee employee) {
		return employeeDao.save(employee);
	}

	// ---------------------------------------------------------------------------
	// Delete Employee
	// ---------------------------------------------------------------------------

	@DeleteMapping("/deleteEmployee/{id}")
	public Map<String, Boolean> deleteEmployee(@PathVariable(value = "id") int employee_id) throws Exception {
		Employee employee = employeeDao.findById(employee_id)
				.orElseThrow(() -> new Exception("Employee not found for this id :: " + employee_id));

		employeeDao.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	// ---------------------------------------------------------------------------
	// Edit Employee
	// ---------------------------------------------------------------------------

	@PutMapping("/editEmployee/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable(value = "id") int employee_id,
			@Valid @RequestBody Employee employeeDetails) throws Exception {
		Employee employee = employeeDao.findById(employee_id)
				.orElseThrow(() -> new Exception("Employee not found for this id :: " + employee_id));

		employee.setEmail(employeeDetails.getEmail());
		employee.setPassword(employeeDetails.getPassword());
		final Employee updatedEmployee = employeeDao.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}

	// --------------------------------------------------------------------------------------------------------------
	// *************************Customer-Management****************************************************************
	// ---------------------------------------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------
	// List of all Customer
	// ---------------------------------------------------------------------------
	@GetMapping("/Customerlist")
	public ResponseEntity<?> fetchAllCustomers() {
		System.out.println("in fetch all Customer");

		List<Customer> customers = customerDao.findAll();

		if (customers.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		// non empty list
		return new ResponseEntity<>(customers, HttpStatus.OK);
	}

	// ---------------------------------------------------------------------------
	// Add Customer
	// ---------------------------------------------------------------------------
	@PostMapping("/addCustomer")
	public Customer createCustomer(@Valid @RequestBody Customer customer) {
		return customerDao.save(customer);
	}

	// ---------------------------------------------------------------------------
	// Delete Customer
	// ---------------------------------------------------------------------------

	@DeleteMapping("/deleteCustomer/{id}")
	public Map<String, Boolean> deleteCustomer(@PathVariable(value = "id") int employee_id) throws Exception {
		Customer customer = customerDao.findById(employee_id)
				.orElseThrow(() -> new Exception("Customer not found for this id :: " + employee_id));

		customerDao.delete(customer);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	// ---------------------------------------------------------------------------
	// Edit Customer
	// ---------------------------------------------------------------------------

	@PutMapping("/editCustomer/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable(value = "id") int employee_id,
			@Valid @RequestBody Customer customerDetails) throws Exception {
		Customer customer = customerDao.findById(employee_id)
				.orElseThrow(() -> new Exception("Customer not found for this id :: " + employee_id));

		customer.setEmail(customerDetails.getEmail());
		customer.setPassword(customerDetails.getPassword());
		final Customer updatedCustomer = customerDao.save(customer);
		return ResponseEntity.ok(updatedCustomer);
	}

	// --------------------------------------------------------------------------------------------------------------
	// *************************Feedback-Management****************************************************************
	// ---------------------------------------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------
	// List of all Feedback
	// ---------------------------------------------------------------------------
	@GetMapping("/Feedbacklist")
	public ResponseEntity<?> fetchAllFeedbacks() {
		System.out.println("in fetch all Feedback");

		List<Feedback> feedbacks = feedbackDao.findAll();

		if (feedbacks.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		// non empty list
		return new ResponseEntity<>(feedbacks, HttpStatus.OK);
	}
	// ---------------------------------------------------------------------------
	// Delete Feedback
	// ---------------------------------------------------------------------------

	@DeleteMapping("/deleteFeedback/{id}")
	public Map<String, Boolean> deleteFeedback(@PathVariable(value = "id") int id) throws Exception {
		Feedback feedback = feedbackDao.findById(id)
				.orElseThrow(() -> new Exception("Feedback not found for this id :: " + id));

		feedbackDao.delete(feedback);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

}
