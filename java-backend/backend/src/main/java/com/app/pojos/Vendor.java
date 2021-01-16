package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
	private boolean active;

	
	
	@OneToMany(mappedBy = "vendor",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Employee> employees = new ArrayList<>(); 
	/* ============================== Constructor ============================== */
	public Vendor() {
		super();
		System.out.println("in vendor constructor");
	}

	public Vendor(String name, String address, String contact, String email, String password, boolean active) {
		super();
		this.name = name;
		this.address = address;
		this.contact = contact;
		this.email = email;
		this.password = password;
		this.active = active;
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

	
	
	
	
	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public List<Employee> getEmployees(){
		return employees; 
	}
	
	 public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}
	 
	 
	 public void addEmployee(Employee e)
	 {
		 employees.add(e); 
		 e.setVendor(this);
		 
	 }
	 
	 public void removeEmployee(Employee e)
	 {
		 employees.remove(e); 
		 
		 e.setVendor(null);
	 }

	

	/* ================================ toString ================================ */
	 @Override
		public String toString() {
			return "Vendor [vendor_id=" + vendor_id + ", name=" + name + ", address=" + address + ", contact=" + contact
					+ ", email=" + email + ", password=" + password + ", active=" + active + ", employees=" + employees
					+ "]";
		}
}
