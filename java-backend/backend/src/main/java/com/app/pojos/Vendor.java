package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "vendor")
public class Vendor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("vendor_id")
	private int vendor_id;

	@Column(length = 45)
	@JsonProperty("name")
	private String name;

	@Column(length = 200)
	@JsonProperty("address")
	private String address;

	@Column(length = 20)
	@JsonProperty("contact")
	private String contact;

	@Column(length = 45)
	@JsonProperty("email")
	private String email;

	@Column(length = 50)
	@JsonProperty("password")
	private String password;

	@JsonProperty("active")
	private int active;

	/* ============================== Constructor ============================== */
	public Vendor() {
		super();
	}

	public Vendor(int vendor_id,String name, String address, String contact, String email, String password) {
		super();
		this.vendor_id = vendor_id;
		this.name = name;
		this.address = address;
		this.contact = contact;
		this.email = email;
		this.password = password;
		this.active = 1;
	}

	/* =========================== Getters & Setters =========================== */

	public int getVendor_Id() {
		return vendor_id;
	}

	public void setId(int vendor_id) {
		this.vendor_id = vendor_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	/* ================================ toString ================================ */
	@Override
	public String toString() {
		return "Vendor [vendor_id=" + vendor_id + ", name=" + name + ", address=" + address + ", contact=" + contact + ", email="
				+ email + ", password=" + password + ", active=" + active + "]";
	}

}
