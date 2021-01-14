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

	@JsonProperty("service_id")
	private int service_id;

	@JsonProperty("product_id")
	private int product_id;

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

	public Service_details(int service_details_id, int customer_id, int customerServices_id, int service_id,
			int product_id, double price, int quantity, double totalAmount) {
		super();
		this.service_details_id = service_details_id;
		this.customer_id = customer_id;
		this.customerServices_id = customerServices_id;
		this.service_id = service_id;
		this.product_id = product_id;
		this.price = price;
		this.quantity = quantity;
		this.totalAmount = totalAmount;
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

	public int getService_id() {
		return service_id;
	}

	public void setService_id(int service_id) {
		this.service_id = service_id;
	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
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
	@Override
	public String toString() {
		return "Service_details [service_details_id=" + service_details_id + ", customer_id=" + customer_id
				+ ", customerServices_id=" + customerServices_id + ", service_id=" + service_id + ", product_id="
				+ product_id + ", price=" + price + ", quantity=" + quantity + ", totalAmount=" + totalAmount + "]";
	}

}
