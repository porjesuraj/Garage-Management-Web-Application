package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AdminDao;
import com.app.pojos.Admin;

@Service
public class AdminService {

	@Autowired
	AdminDao adminDao;

	public AdminService() {
		System.out.println("In Constructor of " + this.getClass().getName());
	}

	public Admin findById(int id) {
		Optional<Admin> admin = adminDao.findById(id);
		if (admin.isPresent())
			return admin.get();
		return null;
	}
	
	public Admin addAdmin(Admin newAdmin) {
		return adminDao.save(newAdmin);
	}
}
