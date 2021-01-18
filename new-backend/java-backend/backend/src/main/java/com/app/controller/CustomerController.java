package com.app.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.CustomerDao;
import com.app.dao.FeedbackDao;
import com.app.pojos.Customer;
import com.app.pojos.Feedback;
@CrossOrigin
@RestController // @Controller + @ResponseBody
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	private CustomerDao customerDao;
	
	@Autowired
	private FeedbackDao feedbackDao;

	public CustomerController() {
		System.out.println("in ctor of " + getClass().getName());
	}
	
	// ---------------------------------------------------------------------------
	// Signup Customer
	// ---------------------------------------------------------------------------
	/*
	 * @PostMapping("/signup") public Customer createCustomer(@Valid @RequestBody
	 * Customer customer) { return customerDao.save(customer); }
	 */

	// ---------------------------------------------------------------------------
	// Signin vendor
	// ---------------------------------------------------------------------------

	/*
	 * @PostMapping("/signin") public Customer
	 * authenticateVendor(@Valid @RequestBody Customer customer) {
	 * 
	 * // System.out.println(email + password); Customer v =
	 * customerDao.findByEmailAndPassword(customer.getEmail(),
	 * customer.getPassword());
	 * 
	 * if (v != null) return v; else return null; }
	 */
	// ---------------------------------------------------------------------------
	// Add Feedback
	// ---------------------------------------------------------------------------
	@PostMapping("/addFeedback")
	public Feedback createFeedback(@Valid @RequestBody Feedback feedback) {
		return feedbackDao.save(feedback);
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
