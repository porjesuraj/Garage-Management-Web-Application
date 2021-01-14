package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Admin;

public interface AdminDao extends JpaRepository<Admin, Integer> {

}
