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
import com.app.service.*;

@RestController // @Controller + @ResponseBody
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private IAdminService adminService;

	@Autowired
	private IVendorService vendorService;

	@Autowired
	private VendorDao vendorDao;

	@Autowired
	private AdminDao adminDao;

	public AdminController() {
		System.out.println("in ctor of " + getClass().getName());
	}

	// ---------------------------------------------------------------------------
	// List of all admins
	// ---------------------------------------------------------------------------
	@GetMapping("/list")
	public ResponseEntity<?> fetchAllAdmins() {
		System.out.println("in fetch all admins");

		List<Admin> admins = adminService.getAllAdmins();

		if (admins.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		// non empty list
		return new ResponseEntity<>(admins, HttpStatus.OK);
	}

	// ---------------------------------------------------------------------------
	// Signup admin
	// ---------------------------------------------------------------------------
	@PostMapping("/signup")
	public Admin createAdmin(@Valid @RequestBody Admin admin) {
		return adminDao.save(admin);
	}

	// ---------------------------------------------------------------------------
	// List of all vendors
	// ---------------------------------------------------------------------------
	@GetMapping("/vendorlist")
	public ResponseEntity<?> fetchAllVendors() {
		System.out.println("in fetch all vendor");

		List<Vendor> vendors = adminService.getAllVendors();

		if (vendors.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		// non empty list
		return new ResponseEntity<>(vendors, HttpStatus.OK);
	}

	// ---------------------------------------------------------------------------
	// Add vendor
	// ---------------------------------------------------------------------------
	@PostMapping("/addvendor")
	public Vendor createVendor(@Valid @RequestBody Vendor vendor) {
		return vendorDao.save(vendor);
	}

	// ---------------------------------------------------------------------------
	// Delete vendor
	// ---------------------------------------------------------------------------

	@DeleteMapping("/deletevendor/{id}")
	public Map<String, Boolean> deleteEmployee(@PathVariable(value = "id") int vendor_Id) throws Exception {
		Vendor vendor = vendorDao.findById(vendor_Id)
				.orElseThrow(() -> new Exception("Vendor not found for this id :: " + vendor_Id));

		vendorDao.delete(vendor);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	// ---------------------------------------------------------------------------
	// Edit vendor
	// ---------------------------------------------------------------------------

	@PutMapping("/editVendor/{id}")
	public ResponseEntity<Vendor> updateEmployee(@PathVariable(value = "id") int vendor_Id,
			@Valid @RequestBody Vendor vendorDetails) throws Exception {
		Vendor vendor = vendorDao.findById(vendor_Id)
				.orElseThrow(() -> new Exception("Vendor not found for this id :: " + vendor_Id));

		vendor.setEmail(vendorDetails.getEmail());
		vendor.setName(vendorDetails.getName());
		final Vendor updatedEmployee = vendorDao.save(vendor);
		return ResponseEntity.ok(updatedEmployee);
	}

	// ---------------------------------------------------------------------------
	// Block/Unblock vendor
	// ---------------------------------------------------------------------------
	/*
	 * @PutMapping("/blockVendor/{id}") public ResponseEntity<Vendor>
	 * blockUnblockEmployee(@PathVariable(value = "id") int vendor_Id,
	 * 
	 * @Valid @RequestBody Vendor vendorDetails) throws Exception { Vendor vendor =
	 * vendorDao.findById(vendor_Id) .orElseThrow(() -> new
	 * Exception("Vendor not found for this id :: " + vendor_Id));
	 * 
	 * vendor.setActive(vendorDetails.getActive()); final Vendor updatedEmployee =
	 * vendorDao.save(vendor); return ResponseEntity.ok(updatedEmployee); }
	 */
}
