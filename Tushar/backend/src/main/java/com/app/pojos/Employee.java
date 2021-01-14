package com.app.pojos;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "employee")
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("employee_id")
	private int employee_id;

	@JsonProperty("vendor_id")
	private int vendor_id;

	@Column(length = 45)
	@JsonProperty("firstName")
	private String firstName;

	@Column(length = 45)
	@JsonProperty("lastName")
	private String lastName;

	@Column(length = 200)
	@JsonProperty("birthDate")
	private Date birthDate;

	@Column(length = 45)
	@JsonProperty("email")
	private String email;

	@Column(length = 50)
	@JsonProperty("password")
	private String password;

	@JsonProperty("active")
	private int active;

	/* ============================== Constructor ============================== */
	public Employee() {
		super();
	}

	public Employee(int employee_id, int vendor_id, String firstName, String lastName, Date birthDate, String email,
			String password) {
		super();
		this.employee_id = employee_id;
		this.vendor_id = vendor_id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = birthDate;
		this.email = email;
		this.password = password;
		this.active = 1;
	}

	/* =========================== Getters & Setters =========================== */
	public int getEmployeeId() {
		return employee_id;
	}

	public void setEmployeeId(int employee_id) {
		this.employee_id = employee_id;
	}

	public int getVendor_id() {
		return vendor_id;
	}

	public void setVendor_id(int vendor_id) {
		this.vendor_id = vendor_id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
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
		return "Employee [employee_id=" + employee_id + ", vendor_id=" + vendor_id + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", birthDate=" + birthDate + ", email=" + email + ", password=" + password + ", active=" + active
				+ "]";
	}

}
