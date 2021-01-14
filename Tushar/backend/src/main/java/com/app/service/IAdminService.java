package com.app.service;

import java.util.List;

import com.app.pojos.Admin;
import com.app.pojos.Vendor;

public interface IAdminService {

	List<Admin> getAllAdmins();
	List<Vendor> getAllVendors();
}
