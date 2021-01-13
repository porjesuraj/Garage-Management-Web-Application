package com.app.pojos;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	@JsonProperty("firstName")
	private String firstName;

	@Column(length = 45)
	@JsonProperty("middleName")
	private String middleName;

	@Column(length = 45)
	@JsonProperty("lastName")
	private String lastName;

	@Column(length = 200)
	@JsonProperty("birthDate")
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
	private int active;

	/* ============================== Constructor ============================== */

	public Customer() {
		super();
	}

	public Customer(int customer_id, String firstName, String middleName, String lastName, Date birthDate, String contact,
			String address, String email, String password, int active) {
		super();
		this.customer_id = customer_id;
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

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	/* ================================ toString =============================== */

	@Override
	public String toString() {
		return "Customer [customer_id=" + customer_id + ", firstName=" + firstName + ", middleName=" + middleName + ", lastName="
				+ lastName + ", birthDate=" + birthDate + ", contact=" + contact + ", address=" + address + ", email="
				+ email + ", password=" + password + ", active=" + active + "]";
	}

}
