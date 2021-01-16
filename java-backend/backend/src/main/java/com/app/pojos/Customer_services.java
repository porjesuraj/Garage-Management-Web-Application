package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "customer_services")
public class Customer_services {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("customer_services_id")
	private int customer_services_id;

	

	@JsonProperty("total_amount")
	private double totalAmount;

	@JsonProperty("tax")
	private double tax;

	@Column(length = 15)
	@JsonProperty("serviceStatus")
	private StatusType serviceStatus;

	@Enumerated(EnumType.STRING)
	@Column(name="payment_type",length = 20)
	@JsonProperty("payment_type")
	private PaymentType paymentType;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="customer_id")
	@JsonProperty("customer")
	private Customer customer;
	/* ============================== Constructor ============================== */
	public Customer_services() {
		super();
	}

	

	public Customer_services(int customer_services_id, double totalAmount, double tax, StatusType serviceStatus,
			PaymentType paymentType) {
		super();
		this.customer_services_id = customer_services_id;
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

	
	
	
	
	public StatusType getServiceStatus() {
		return serviceStatus;
	}



	public void setServiceStatus(StatusType serviceStatus) {
		this.serviceStatus = serviceStatus;
	}



	public PaymentType getPaymentType() {
		return paymentType;
	}



	public void setPaymentType(PaymentType paymentType) {
		this.paymentType = paymentType;
	}



	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}



	
	

	/* ================================ toString =============================== */
	@Override
	public String toString() {
		return "Customer_services [totalAmount=" + totalAmount + ", tax=" + tax + ", serviceStatus=" + serviceStatus
				+ ", paymentType=" + paymentType + "]";
	}

	

}
