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

import com.app.dao.AdminDao;
import com.app.dao.OfferDao;
import com.app.dao.VendorDao;
import com.app.pojos.Admin;
import com.app.pojos.Offer;
import com.app.pojos.Vendor;

@RestController // @Controller + @ResponseBody
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private VendorDao vendorDao;

	@Autowired
	private AdminDao adminDao;

	@Autowired
	private OfferDao offerDao;

	public AdminController() {
		System.out.println("in ctor of " + getClass().getName());
	}

	// ---------------------------------------------------------------------------
	// List of all admins
	// ---------------------------------------------------------------------------
	@GetMapping("/list")
	public ResponseEntity<?> fetchAllAdmins() {
		System.out.println("in fetch all admins");

		List<Admin> admins = adminDao.findAll();

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
	// Signin Admin
	// ---------------------------------------------------------------------------

	@PostMapping("/signin")
	public Admin authenticateVendor(@Valid @RequestBody Admin admin) {

		//System.out.println(email + password);
		Admin v = adminDao.findByEmailAndPassword(admin.getEmail(),admin.getPassword());

		if (v != null)
			return v;
		else
			return null;
	}

	// --------------------------------------------------------------------------------------------------------------
	// *************************Vendor-Management****************************************************************
	// ---------------------------------------------------------------------------------------------------------------

	// ---------------------------------------------------------------------------
	// List of all vendors
	// ---------------------------------------------------------------------------
	@GetMapping("/vendorlist")
	public ResponseEntity<?> fetchAllVendors() {
		System.out.println("in fetch all vendor");

		List<Vendor> vendors = vendorDao.findAll();

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
	public Map<String, Boolean> deleteVendor(@PathVariable(value = "id") int vendor_Id) throws Exception {
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
	public ResponseEntity<Vendor> updateVendor(@PathVariable(value = "id") int vendor_Id,
			@Valid @RequestBody Vendor vendorDetails) throws Exception {
		Vendor vendor = vendorDao.findById(vendor_Id)
				.orElseThrow(() -> new Exception("Vendor not found for this id :: " + vendor_Id));

		vendor.setEmail(vendorDetails.getEmail());
		vendor.setName(vendorDetails.getName());
		final Vendor updatedVendor = vendorDao.save(vendor);
		return ResponseEntity.ok(updatedVendor);
	}

	// ---------------------------------------------------------------------------
	// Block/Unblock vendor
	// ---------------------------------------------------------------------------
	@PutMapping("/blockVendor/{id}")
	public ResponseEntity<Vendor> blockUnblockVendor(@PathVariable(value = "id") int vendor_Id,

			@Valid @RequestBody Vendor vendorDetails) throws Exception {
		Vendor vendor = vendorDao.findById(vendor_Id)
				.orElseThrow(() -> new Exception("Vendor not found for this id :: " + vendor_Id));

		vendor.setActive(vendorDetails.isActive());
		final Vendor updatedVendor = vendorDao.save(vendor);
		return ResponseEntity.ok(updatedVendor);
	}

	// --------------------------------------------------------------------------------------------------------------
	// *************************Offer-Management****************************************************************
	// ---------------------------------------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------
	// Create Offer
	// ---------------------------------------------------------------------------
	@PostMapping("/addOffer")
	public Offer createOffer(@Valid @RequestBody Offer offer) {
		return offerDao.save(offer);
	}

	// ---------------------------------------------------------------------------
	// List of all Offers
	// ---------------------------------------------------------------------------
	@GetMapping("/offerlist")
	public ResponseEntity<?> fetchAllOffers() {
		System.out.println("in fetch all offer");

		List<Offer> offers = offerDao.findAll();

		if (offers.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		// non empty list
		return new ResponseEntity<>(offers, HttpStatus.OK);
	}

	// ---------------------------------------------------------------------------
	// Edit Offer
	// ---------------------------------------------------------------------------

	@PutMapping("/editOffer/{id}")
	public ResponseEntity<Offer> updateOffer(@PathVariable(value = "id") int offer_id,
			@Valid @RequestBody Offer offerDetails) throws Exception {
		Offer offer = offerDao.findById(offer_id)
				.orElseThrow(() -> new Exception("Vendor not found for this id :: " + offer_id));

		offer.setOffer_name(offerDetails.getOffer_name());
		offer.setOffer_discount(offerDetails.getOffer_discount());
		offer.setMin_value(offerDetails.getMin_value());
		final Offer updatedOffer = offerDao.save(offer);
		return ResponseEntity.ok(updatedOffer);
	}

	// ---------------------------------------------------------------------------
	// Delete offer
	// ---------------------------------------------------------------------------

	@DeleteMapping("/deleteOffer/{id}")
	public Map<String, Boolean> deleteOffer(@PathVariable(value = "id") int offer_id) throws Exception {
		Offer offer = offerDao.findById(offer_id)
				.orElseThrow(() -> new Exception("Offer not found for this id :: " + offer_id));

		offerDao.delete(offer);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
