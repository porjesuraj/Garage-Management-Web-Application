package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Past;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
@Entity
@Table(name = "service_request")
@JsonInclude(value = Include.NON_DEFAULT)
public class ServiceRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("request_id")
	private int requestId;
	
	//[CAR or BIKE]
	@Column(length = 45)
	@JsonProperty("vehicle_type")
	private String vehicleType;
	
	@Column(length = 45)
	@JsonProperty("vehicle_model")
	private String vehicleModel;
	
	@Column(length = 45)
	@JsonProperty("vehicle_brand")
	private String vehicleBrand;
	
	@Column(length = 45)
	@JsonProperty("vehicle_license_plate_no")
	private String vehicle_license_plate_no; 
	
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonProperty("service_date")
	private LocalDate serviceDate =  LocalDate.now();
	
	//[PICKUP or DROP]
	private String deliveryType; 
	
	@JsonProperty("customer_Id")
	private int customerId;
	//[PENDING or COMPLETE]
	private String status = "PENDING"; 
	//-----------------------------------------
	// Constructor
	//------------------------------------------
	
	public ServiceRequest() {
		super(); 
	}

	
	public ServiceRequest(int requestId, String vehicleType, String vehicleModel, String vehicleBrand,
			String vehicle_license_plate_no, LocalDate serviceDate, String deliveryType, String status) {
		super();
		this.requestId = requestId;
		this.vehicleType = vehicleType;
		this.vehicleModel = vehicleModel;
		this.vehicleBrand = vehicleBrand;
		this.vehicle_license_plate_no = vehicle_license_plate_no;
		this.serviceDate = serviceDate;
		this.deliveryType = deliveryType;
		this.status = status;
	}







	//-----------------------------------------
	// getter and setter
	//------------------------------------------
		
	
	public int getRequestId() {
		return requestId;
	}


	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}


	public String getVehicleType() {
		return vehicleType;
	}


	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}


	public String getVehicleModel() {
		return vehicleModel;
	}


	public void setVehicleModel(String vehicleModel) {
		this.vehicleModel = vehicleModel;
	}


	public String getVehicleBrand() {
		return vehicleBrand;
	}


	public void setVehicleBrand(String vehicleBrand) {
		this.vehicleBrand = vehicleBrand;
	}


	public String getVehicle_license_plate_no() {
		return vehicle_license_plate_no;
	}


	public void setVehicle_license_plate_no(String vehicle_license_plate_no) {
		this.vehicle_license_plate_no = vehicle_license_plate_no;
	}


	public LocalDate getServiceDate() {
		return serviceDate;
	}


	public void setServiceDate(LocalDate serviceDate) {
		this.serviceDate = serviceDate;
	}


	public String getDeliveryType() {
		return deliveryType;
	}


	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}


	public int getCustomerId() {
		return customerId;
	}


	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	//--------------------------------------
	// to string
	//-----------------------------------
	
	@Override
	public String toString() {
		return "ServiceRequest [requestId=" + requestId + ", vehicleType=" + vehicleType + ", vehicleModel="
				+ vehicleModel + ", vehicleBrand=" + vehicleBrand + ", vehicle_license_plate_no="
				+ vehicle_license_plate_no + ", serviceDate=" + serviceDate + ", deliveryType=" + deliveryType
				+ ", customerId=" + customerId + ", status=" + status + "]";
	}
	




	
	
	
	
	
}
