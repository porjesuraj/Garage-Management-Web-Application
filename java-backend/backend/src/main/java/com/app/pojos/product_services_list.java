package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product_services_list_tbl")

public class product_services_list {

	@Id //PK 
	@GeneratedValue(strategy = GenerationType.IDENTITY) //strategy = AUTO will be replaced : auto_increment
	@Column(name = "ps_id")
	private int psId;
	
	@Column(name = "ps_name",length = 30,unique = true)
	private String psName;
	
	private double price; 
	
	@Enumerated(EnumType.STRING)
	@Column(name="ps_type",length = 20)
	private PS_TYPE psType; 
	
	
	public product_services_list() {
		System.out.println("in product and service constructor");
	}


	public product_services_list(int psId, String psName, double price, PS_TYPE psType) {
		super();
		this.psId = psId;
		this.psName = psName;
		this.price = price;
		this.psType = psType;
	}


	public int getPsId() {
		return psId;
	}


	public void setPsId(int psId) {
		this.psId = psId;
	}


	public String getPsName() {
		return psName;
	}


	public void setPsName(String psName) {
		this.psName = psName;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public PS_TYPE getPsType() {
		return psType;
	}


	public void setPsType(PS_TYPE psType) {
		this.psType = psType;
	}


	@Override
	public String toString() {
		return "product_services_list [psId=" + psId + ", psName=" + psName + ", price=" + price + ", psType=" + psType
				+ "]";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
