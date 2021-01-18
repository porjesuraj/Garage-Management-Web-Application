package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.VendorDao;
import com.app.pojos.Admin;
import com.app.pojos.Vendor;

@Service
public class VendorService {


	@Autowired
	private VendorDao vendorDao; 
	
	
	public VendorService() {
		System.out.println("In Constructor of " + this.getClass().getName());
	}
	public Vendor findById(int id) {	
		Optional<Vendor> vendor = vendorDao.findById(id); 
		if (vendor.isPresent())
			return vendor.get();
		return null;
	}
	
	public Vendor addVendor(Vendor newVendor)
	{
		return vendorDao.save(newVendor); 
	}
	
	
}
