package com.app.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.CustomerDao;
import com.app.dao.FeedbackDao;
import com.app.pojos.Customer;
import com.app.pojos.Feedback;
import com.app.service.CustomerService;
@CrossOrigin
@RestController // @Controller + @ResponseBody
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	private CustomerDao customerDao;
	
	@Autowired
	private CustomerService customerService; 
	@Autowired
	private FeedbackDao feedbackDao;

	public CustomerController() {
		System.out.println("in ctor of " + getClass().getName());
	}
	
	
	// ---------------------------------------------------------------------------
	// Customer by id
	// ---------------------------------------------------------------------------
		@GetMapping("/{id}")
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
