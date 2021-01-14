package com.app.pojos;

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
	@JsonProperty("customer_id")
	private int customer_id;

	@Column(length = 45)
	@JsonProperty("first_name")
	private String firstName;

	@Column(length = 45)
	@JsonProperty("middle_name")
	private String middleName;

	@Column(length = 45)
	@JsonProperty("last_name")
	private String lastName;

	@Column(length = 200)
	@JsonProperty("birth_date")
	private Date birthDate;

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

	@JsonProperty("active")
	private boolean active;

	@OneToMany(mappedBy = "customer",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Customer_services> customer_services=new ArrayList<>();
	
	
	/* ============================== Constructor ============================== */

	public Customer() {
		super();
	}

 
	public Customer( String firstName, String middleName, String lastName, Date birthDate,
			String contact, String address, String email, String password, boolean active) {
		super();
		
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.birthDate = birthDate;
		this.contact = contact;
		this.address = address;
		this.email = email;
		this.password = password;
		this.active = active;
	}

	/* =========================== Getters & Setters =========================== */





	public int getCustomerId() {
		return customer_id;
	}

	public void setCustomerId(int customer_id) {
		this.customer_id = customer_id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
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

	
	
	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
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

	@Override
	public String toString() {
		return "Customer [firstName=" + firstName + ", middleName=" + middleName + ", lastName=" + lastName
				+ ", birthDate=" + birthDate + ", contact=" + contact + ", address=" + address + ", email=" + email
				+ ", password=" + password + ", active=" + active + "]";
	}

	

}
