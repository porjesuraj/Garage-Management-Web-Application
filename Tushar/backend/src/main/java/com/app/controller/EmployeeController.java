package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.EmployeeDao;
import com.app.dao.FeedbackDao;
import com.app.pojos.Employee;
import com.app.pojos.Feedback;

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
