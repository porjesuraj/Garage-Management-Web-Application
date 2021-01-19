package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "service_details")
public class Service_details {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("service_details_id")
	private int service_details_id;

	@JsonProperty("customer_id")
	private int customer_id;

	@JsonProperty("customerServices_id")
	private int customerServices_id;

	@JsonProperty("ps_id")
	private int ps_id;

	@JsonProperty("price")
	private double price;

	@JsonProperty("quantity")
	private int quantity;

	@JsonProperty("totalAmount")
	private double totalAmount;

	/* ============================== Constructor ============================== */
	public Service_details() {
		super();
	}

	

	/* =========================== Getters & Setters =========================== */
	public int getService_details_id() {
		return service_details_id;
	}

	public void setService_details_id(int service_details_id) {
		this.service_details_id = service_details_id;
	}

	public int getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}

	public int getCustomerServices_id() {
		return customerServices_id;
	}

	public void setCustomerServices_id(int customerServices_id) {
		this.customerServices_id = customerServices_id;
	}

	

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	/* ================================ toString =============================== */
	

}
