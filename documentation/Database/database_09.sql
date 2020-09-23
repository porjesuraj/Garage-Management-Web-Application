create table services (
	service_id INTEGER NOT NULL AUTO_INCREMENT,
	serviceName VARCHAR(120) NOT NULL,
	servicePrice FLOAT NOT NULL,
	createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`service_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into services (serviceName,servicePrice) values("oil change",500);


create table products (
	product_id INTEGER NOT NULL AUTO_INCREMENT,
	productName VARCHAR(120) NOT NULL,
	productPrice FLOAT NOT NULL,
	createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`product_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into products (productName,productPrice) values('breaks',3000);

create table question (
	question_id INTEGER NOT NULL AUTO_INCREMENT,
	questions VARCHAR(120) NOT NULL,
	createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`question_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table admin (
	admin_id INTEGER AUTO_INCREMENT,
	firstName VARCHAR(45) NOT NULL,
	lastName VARCHAR(45) NOT NULL, 
	email VARCHAR(45) NOT NULL,
	password VARCHAR(150) NOT NULL,
	createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`admin_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table vendor (
	vendor_id INTEGER AUTO_INCREMENT, 
	name VARCHAR(45) NOT NULL,
	address VARCHAR(200) NOT NULL,
	contact VARCHAR(20) NULL, 
	email VARCHAR(45) NOT NULL,
	password VARCHAR(150) NOT NULL,
	active INTEGER DEFAULT 1,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`vendor_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table employee (
	emp_id INTEGER AUTO_INCREMENT, 
	vendor_id INTEGER NOT NULL,
	firstName VARCHAR(45) NOT NULL,
	lastName VARCHAR(45) NOT NULL,
	birthDate DATE , 
	email VARCHAR(45) NOT NULL,
	password VARCHAR(100) NOT NULL,
	active INTEGER DEFAULT 1,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`emp_id`),
	CONSTRAINT `emp_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table customer (
	customer_id INTEGER AUTO_INCREMENT, 
	firstName VARCHAR(45) NOT NULL,
	middleName VARCHAR(45) NOT NULL,
	lastName VARCHAR(45)  NOT NULL,
	birthDate DATE ,
	contact VARCHAR(20) NULL,
	email VARCHAR(45) NOT NULL,
	address VARCHAR(200) NOT NULL, 
	password VARCHAR(100) NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	active INTEGER DEFAULT 0,
	activationToken VARCHAR(200),
	PRIMARY KEY (`customer_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;
	
INSERT INTO customer(firstName,middleName,lastName,birthDate,contact,email,address,password,active)
values("suraj","valu","porje",'1994-01-01',9881327553,"testprojectdac@gmail.com","nasik","IndiaIsBest",1);

create table customer_services(
	customerServices_id INTEGER AUTO_INCREMENT, 
	customer_id INTEGER,
	totalAmount DECIMAL(10,0),
	tax DECIMAL(10,0),
	serviceStatus VARCHAR(15) DEFAULT '', 
	paymentType VARCHAR(15) DEFAULT '', 
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`customerServices_id`),
  	CONSTRAINT `service_detailsCustomer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE ON DELETE CASCADE 
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;
	
insert into customer_services (customer_id,totalAmount,tax,serviceStatus,paymentType)
 values(1,10000,0.05*totalAmount,'pending','cod');

create table service_details (
	service_details_id INTEGER AUTO_INCREMENT,
	customer_id INTEGER NOT NULL,
	customerServices_id INTEGER NOT NULL, 
	service_id INTEGER NULL,
	product_id INTEGER NULL,
	price DECIMAL(10,0),
	quantity INTEGER DEFAULT 1,
	totalAmount DECIMAL(10,0),
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`service_details_id`),
CONSTRAINT `service_details_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `service_details_customerServices_id` FOREIGN KEY (`customerServices_id`) REFERENCES `customer_services` (`customerServices_id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `service_details_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `service_details_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE

	) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into service_details (customer_id,customerServices_id,service_id,product_id,quantity,totalAmount)
values(1,1,1,1,1,100);


create table feedback (
	feedback_id INTEGER AUTO_INCREMENT,
	customer_id INTEGER NOT NULL,
	feedback VARCHAR(45),
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`feedback_id`),
	CONSTRAINT `feedback_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into feedback (customer_id,feedback) values(1,"work fast");

create table offer(
 offer_id INT AUTO_INCREMENT,
 offer_name  VARCHAR(150) NOT NULL, 
 offer_discount DECIMAL(10,0) NOT NULL,
offer_min_value INT(11),PRIMARY KEY (`offer_id`));

insert into offer (offer_name,offer_discount,offer_min_value) values("diwali",.50,5000);


create table invoice (
	invoice_id INTEGER AUTO_INCREMENT, 
	totalBill float,
	service_details_id INTEGER NOT NULL,
	customer_id INTEGER NOT NULL,
	customerServices_id INTEGER NOT NULL,
    offer_id INT NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`invoice_id`),
  	CONSTRAINT `invoice_service_details_id` FOREIGN KEY (`service_details_id`) REFERENCES `service_details` (`service_details_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `invoice_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `invoice_customer_service_id` FOREIGN KEY (`customerServices_id`) REFERENCES `customer_services` (`customerServices_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `invoice_offer_id` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`offer_id`) ON DELETE CASCADE ON UPDATE CASCADE 
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;


insert into invoice (totalBill,service_details_id,customer_id,customerServices_id,offer_id)
values (1000,1,1,1,1);
