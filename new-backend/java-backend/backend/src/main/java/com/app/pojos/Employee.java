package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Past;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "employee")
@JsonInclude(value = Include.NON_DEFAULT)
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private int id;
	
	
	@Column(length = 45)
	@JsonProperty("name")
	private String name;


	@Column(length = 200)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Past
	@JsonProperty("birth_date")
	private LocalDate birthDate;

	@Column(length = 45)
	@JsonProperty("email")
	private String email;

	@Column(length = 50)
	@JsonProperty("password")
	private String password;

	@JsonProperty("vendor_id")
	private int vendor_id;
	
	@OneToMany(mappedBy = "employee_id", cascade = CascadeType.PERSIST)
	private List<Customer> customers = new ArrayList<>();
	

	/* ============================== Constructor ============================== */
	public Employee() {
		super();
	}

	public Employee(int id, String name, LocalDate birthDate, String email, String password, int vendor_id) {
		super();
		this.id = id;
		this.name = name;
		this.birthDate = birthDate;
		this.email = email;
		this.password = password;
		this.vendor_id = vendor_id;
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

	public int getVendor_id() {
		return vendor_id;
	}

	public void setVendor_id(int vendor_id) {
		this.vendor_id = vendor_id;
	}


	/* ================================ toString =============================== */
	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", birthDate=" + birthDate + ", email=" + email + ", password="
				+ password + ", vendor_id=" + vendor_id + "]";
	}


	

	

}
