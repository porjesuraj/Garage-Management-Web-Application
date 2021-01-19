package com.app.service;

import com.app.pojos.Admin;
import com.app.pojos.Vendor;

public interface IVendorService {

	
	Vendor addVendor(Vendor newVendor);
	
Vendor findById(int id);
	
void deleteVendor(int id);
	
}
