package com.app.pojos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "invoice")
public class Invoice {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("invoice_id")
	private int invoice_id;

	@JsonProperty("total_bill")
	private double totalBill;

	@JsonProperty("service_details_id")
	private int service_details_id;

	@JsonProperty("customer_id")
	private int customer_id;

	@JsonProperty("customerServices_id")
	private int customerServices_id;

	@JsonProperty("offer_id")
	private int offer_id;

	/* ============================== Constructor ============================== */
	public Invoice() {
		super();
	}

	public Invoice(int invoice_id, double totalBill, int service_details_id, int customer_id, int customerServices_id,
			int offer_id) {
		super();
		this.invoice_id = invoice_id;
		this.totalBill = totalBill;
		this.service_details_id = service_details_id;
		this.customer_id = customer_id;
		this.customerServices_id = customerServices_id;
		this.offer_id = offer_id;
	}

	/* =========================== Getters & Setters =========================== */

	public int getInvoiceId() {
		return invoice_id;
	}

	public void setInvoiceId(int invoice_id) {
		this.invoice_id = invoice_id;
	}

	public double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(double totalBill) {
		this.totalBill = totalBill;
	}

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

	public int getOffer_id() {
		return offer_id;
	}

	public void setOffer_id(int offer_id) {
		this.offer_id = offer_id;
	}

	/* ================================ toString =============================== */
	@Override
	public String toString() {
		return "Invoice [invoice_id=" + invoice_id + ", totalBill=" + totalBill + ", service_details_id="
				+ service_details_id + ", customer_id=" + customer_id + ", customerServices_id=" + customerServices_id
				+ ", offer_id=" + offer_id + "]";
	}

}
