package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "stock")
@JsonInclude(value = Include.NON_DEFAULT)
public class Stock {

	@Id //PK 
	@GeneratedValue(strategy = GenerationType.IDENTITY) //strategy = AUTO will be replaced : auto_increment
	@Column(name = "stock_id")
	@JsonProperty("stock_id")
	private int stockId;
	
	@Column(name = "item_name",length = 30,unique = true)
	@JsonProperty("item_name")
	private String itemName;
	
	@JsonProperty("price")
	private double price; 
	
	@JsonProperty("quantity")
	private int quantity;
	
	@Column(name="item_type",length = 20)
	@JsonProperty("item_type")
	private String itemType; 
	
	//-------------------------------------------------------------------------
	// constructor
	//--------------------------------------------------------------------------
	
	public Stock() {
		System.out.println("in product and service constructor");
	}


	
	public Stock(int stockId, String itemName, double price, int quantity, String itemType) {
		super();
		this.stockId = stockId;
		this.itemName = itemName;
		this.price = price;
		this.quantity = quantity;
		this.itemType = itemType;
	}



	//-------------------------------------------------------------
	//getter and setter
	//-----------------------------------------------------------------
	
	
	





	public int getStockId() {
		return stockId;
	}


	public void setStockId(int stockId) {
		this.stockId = stockId;
	}


	public String getItemName() {
		return itemName;
	}


	public void setItemName(String itemName) {
		this.itemName = itemName;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public String getItemType() {
		return itemType;
	}


	public void setItemType(String itemType) {
		this.itemType = itemType;
	}


	public int getQuantity() {
		return quantity;
	}



	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	//-------------------------------------------------------------
    //to string
	//-----------------------------------------------------------------
	@Override
	public String toString() {
		return "Stock [stockId=" + stockId + ", itemName=" + itemName + ", price=" + price + ", quantity=" + quantity
				+ ", itemType=" + itemType + "]";
	}



		

		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
