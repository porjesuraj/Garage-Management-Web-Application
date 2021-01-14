package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.VendorDao;
import com.app.pojos.Vendor;

@Service
@Transactional
public class VendorService implements IVendorService {

	@Autowired
	private VendorDao vendorDao;

	@Override
	public List<Vendor> getAllVendors() {
		// TODO Auto-generated method stub
		return vendorDao.findAll();
	}

}
