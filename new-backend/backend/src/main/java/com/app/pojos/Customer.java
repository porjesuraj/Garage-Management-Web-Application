package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
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
@Table(name = "customer")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private int id;

	@Column(length = 45)
	@JsonProperty("name")
	private String name;

	@Column(length = 200)
	@JsonProperty("birth_date")
	private LocalDate birthDate;

	@Column(length = 20)
	@JsonProperty("contact")
	private String contact;

	@Column(length = 200)
	@JsonProperty("address")
	private String address;

	@Column(length = 45)
	@JsonProperty("email")
	private String email;

	@Column(length = 50)
	@JsonProperty("password")
	private String password;

	@Column(length = 50)
	@JsonProperty("employee_id")
	private int employee_id;

	@OneToMany(mappedBy = "customer",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Customer_services> customer_services=new ArrayList<>();
	
	
	/* ============================== Constructor ============================== */

	public Customer() {
		super();
	}
	
	
	public Customer(int id, String name, LocalDate birthDate, String contact, String address, String email,
			String password) {
		super();
		this.id = id;
		this.name = name;
		this.birthDate = birthDate;
		this.contact = contact;
		this.address = address;
		this.email = email;
		this.password = password;
	}
 
	
	/* =========================== Getters & Setters =========================== */

	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public LocalDate getBirthDate() {
		return birthDate;
	}


	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}


	public String getContact() {
		return contact;
	}

	
	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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
	

	public List<Customer_services> getCustomer_services() {
		return customer_services;
	}

	public void setCustomer_services(List<Customer_services> customer_services) {
		this.customer_services = customer_services;
	}
	
	//add helper methods : 
	public void addCustomerService(Customer_services cs)
	{
	     customer_services.add(cs); 
		cs.setCustomer(this);
	}
	public void removeCustomerSerivice(Customer_services cs)
	{
		customer_services.remove(cs); 
		cs.setCustomer(null);
		
	}
	
	/* ================================ toString =============================== */

	

	

}
