package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "products")
public class Products {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("product_id")
	private int product_id;

	@Column(length = 100)
	@JsonProperty("productName")
	private String productName;

	@JsonProperty("productPrice")
	private double productPrice;

	/* ============================== Constructor ============================== */
	public Products() {
		super();
	}

	public Products(int product_id, String productName, double productPrice) {
		super();
		this.product_id = product_id;
		this.productName = productName;
		this.productPrice = productPrice;
	}

	/* =========================== Getters & Setters =========================== */
	public int getProductId() {
		return product_id;
	}

	public void setProductId(int product_id) {
		this.product_id = product_id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}

	/* ================================ toString =============================== */
	@Override
	public String toString() {
		return "Products [product_id=" + product_id + ", productName=" + productName + ", productPrice=" + productPrice
				+ "]";
	}

}
