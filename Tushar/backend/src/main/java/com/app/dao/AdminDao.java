package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Admin;
import com.app.pojos.Vendor;

public interface AdminDao extends JpaRepository<Admin, Integer> {

	
}
