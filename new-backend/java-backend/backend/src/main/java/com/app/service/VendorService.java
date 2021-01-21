package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customException.RecordNotFoundException;
import com.app.dao.VendorDao;
import com.app.pojos.Admin;
import com.app.pojos.Vendor;

@Service
public class VendorService implements IVendorService{


	@Autowired
	private VendorDao vendorDao; 
	
	
	public VendorService() {
		System.out.println("In Constructor of " + this.getClass().getName());
	}
	
	@Override
	public Vendor findById(int id) {	
		Optional<Vendor> vendor = vendorDao.findById(id); 
		if (vendor.isPresent())
			return vendor.get();
		else
			
			return null;
		 
	      
		
	}

	@Override
	public Vendor addVendor(Vendor newVendor) {
		return vendorDao.save(newVendor);
	}

	@Override
	public void deleteVendor(int id) {
		
		// chk if product exists : yes : delete , otherwise throw exc.
		
		
		
		Optional<Vendor> optional = vendorDao.findById(id);
		if (optional.isPresent())
		vendorDao.deleteById(id);
		else
		{
	   // if product is not found : throw custom exception
	    System.out.println("Not Founded");
	   
		throw new RecordNotFoundException("vendor not found"); 
		}
	}
	
	
}
