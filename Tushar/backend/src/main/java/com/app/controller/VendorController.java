package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Vendor;
import com.app.service.IVendorService;

@RestController // @Controller + @ResponseBody
@RequestMapping("/vendor")
public class VendorController {

	@Autowired
	private IVendorService vendorService;

	public VendorController() {
		System.out.println("in ctor of " + getClass().getName());
	}

	@GetMapping("/list")
	public ResponseEntity<?> fetchAllVendors() {
		System.out.println("in fetch all vendor");

		List<Vendor> vendors = vendorService.getAllVendors();

		if (vendors.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		// non empty list
		return new ResponseEntity<>(vendors, HttpStatus.OK);
	}
}
