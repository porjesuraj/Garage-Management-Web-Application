package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "services")
public class Services {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("service_id")
	private int service_id;

	@Column(length = 100)
	@JsonProperty("serviceName")
	private String serviceName;

	@JsonProperty("servicePrice")
	private double servicePrice;

	/* ============================== Constructor ============================== */
	public Services() {
		super();
	}

	public Services(int service_id, String serviceName, double servicePrice) {
		super();
		this.service_id = service_id;
		this.serviceName = serviceName;
		this.servicePrice = servicePrice;
	}

	/* =========================== Getters & Setters =========================== */
	public int getServiceId() {
		return service_id;
	}

	public void setServiceId(int service_id) {
		this.service_id = service_id;
	}

	public String getserviceName() {
		return serviceName;
	}

	public void setserviceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public double getservicePrice() {
		return servicePrice;
	}

	public void setservicePrice(double servicePrice) {
		this.servicePrice = servicePrice;
	}

	/* ================================ toString =============================== */
	@Override
	public String toString() {
		return "services [service_id=" + service_id + ", serviceName=" + serviceName + ", servicePrice=" + servicePrice
				+ "]";
	}

}
