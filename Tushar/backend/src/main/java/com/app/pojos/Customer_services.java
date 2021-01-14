package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "customer_services")
public class Customer_services {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("customer_services_id")
	private int customer_services_id;

	@JsonProperty("customer_id")
	private int customer_id;

	@JsonProperty("totalAmount")
	private double totalAmount;

	@JsonProperty("tax")
	private double tax;

	@Column(length = 15)
	@JsonProperty("serviceStatus")
	private String serviceStatus;

	@Column(length = 15)
	@JsonProperty("paymentType")
	private String paymentType;

	/* ============================== Constructor ============================== */
	public Customer_services() {
		super();
	}

	public Customer_services(int customer_services_id, int customer_id, double totalAmount, double tax,
			String serviceStatus, String paymentType) {
		super();
		this.customer_services_id = customer_services_id;
		this.customer_id = customer_id;
		this.totalAmount = totalAmount;
		this.tax = tax;
		this.serviceStatus = serviceStatus;
		this.paymentType = paymentType;
	}

	/* =========================== Getters & Setters =========================== */

	public int getCustomer_services_id() {
		return customer_services_id;
	}

	public void setCustomer_services_id(int customer_services_id) {
		this.customer_services_id = customer_services_id;
	}

	public int getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public double getTax() {
		return tax;
	}

	public void setTax(double tax) {
		this.tax = tax;
	}

	public String getServiceStatus() {
		return serviceStatus;
	}

	public void setServiceStatus(String serviceStatus) {
		this.serviceStatus = serviceStatus;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	/* ================================ toString =============================== */
	@Override
	public String toString() {
		return "Customer_services [customer_services_id=" + customer_services_id + ", customer_id=" + customer_id + ", totalAmount=" + totalAmount
				+ ", tax=" + tax + ", serviceStatus=" + serviceStatus + ", paymentType=" + paymentType + "]";
	}

}
