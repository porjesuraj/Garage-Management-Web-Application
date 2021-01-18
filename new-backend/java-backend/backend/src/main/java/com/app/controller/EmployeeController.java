package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.app.pojos.Employee;
import com.app.pojos.Feedback;
@CrossOrigin
@RestController // @Controller + @ResponseBody
@RequestMapping("/employee")
public class EmployeeController {

	@Autowired
	private EmployeeDao employeeDao;

	@Autowired
	private FeedbackDao feedbackDao;

	public EmployeeController() {
		System.out.println("in ctor of " + getClass().getName());
	}

	// ---------------------------------------------------------------------------
	// Signin vendor
	// ---------------------------------------------------------------------------

	@PostMapping("/signin")
	public Employee authenticateEmployee(@Valid @RequestBody Employee employee) {

		// System.out.println(email + password);
		Employee v = employeeDao.findByEmailAndPassword(employee.getEmail(), employee.getPassword());

		if (v != null)
			return v;
		else
			return null;
	}
	
	// ---------------------------------------------------------------------------
	// Get Profile
	// ---------------------------------------------------------------------------
	@GetMapping("/{emp_id}")
	public ResponseEntity<?> getProfile(@PathVariable(value = "emp_id") int emp_id) {
		System.out.println("in get employee profile");

		Employee emp = employeeDao.findById(emp_id).get();

		if (emp.equals(null))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		// non empty list
		return new ResponseEntity<>(emp, HttpStatus.OK);
	}


	// ---------------------------------------------------------------------------
	// Update Profile Profile
	// ---------------------------------------------------------------------------
	@PutMapping("/editEmployee/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable(value = "id") int employee_id,
			@Valid @RequestBody Employee employeeDetails) throws Exception {

		System.out.println("in update employee profile");

		Employee employee = employeeDao.findById(employee_id)
				.orElseThrow(() -> new Exception("Employee not found for this id :: " + employee_id));

		employee.setEmail(employeeDetails.getEmail());
		employee.setPassword(employeeDetails.getPassword());
		final Employee updatedEmployee = employeeDao.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}


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
}
