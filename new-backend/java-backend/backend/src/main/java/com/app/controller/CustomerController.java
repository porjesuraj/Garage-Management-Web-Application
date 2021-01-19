package com.app.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<?> createFeedback(@Valid @RequestBody Feedback feedback) {
		
		ResponseEntity<?> resp = null;
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(feedbackDao.save(feedback) != null )
		{
			map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		}else
		{
			map.put("status", "error");
			map.put("error", "Can't Add feedback");
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
		System.out.println("in delete feedback " + id);
		
		Feedback feedback = feedbackDao.findById(id)
				.orElseThrow(() -> new Exception("Feedback not found for this id :: " + id));
        try {
        	feedbackDao.delete(feedback);
        	map.put("status", "success");
			resp = new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Exception : " + e.getMessage());
			map.put("status", "error");
			map.put("error", "Can't delete feedback");
			resp = new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		return resp;
	}
}
