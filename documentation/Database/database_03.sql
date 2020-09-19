create table services (
	service_id INTEGER NOT NULL AUTO_INCREMENT,
	serviceName VARCHAR(120) NOT NULL,
	servicePrice FLOAT NOT NULL,
	createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`service_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table products (
	product_id INTEGER NOT NULL AUTO_INCREMENT,
	productName VARCHAR(120) NOT NULL,
	productPrice FLOAT NOT NULL,
	createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`product_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



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
	contact INTEGER NOT NULL, 
	email VARCHAR(45) NOT NULL,
	password VARCHAR(150) NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	active INTEGER DEFAULT 0,
	activationToken VARCHAR(200),
	PRIMARY KEY (`vendor_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table employee (
	emp_id INTEGER AUTO_INCREMENT, 
	vendor_id INTEGER NOT NULL,
	firstName VARCHAR(45) NOT NULL,
	lastName VARCHAR(45) NOT NULL,
	birthDate DATE DEFAULT CURRENT_DATE, 
	email VARCHAR(45) NOT NULL,
	password VARCHAR(100) NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	active INTEGER DEFAULT 0,
	activationToken VARCHAR(200),
	PRIMARY KEY (`emp_id`),
	CONSTRAINT `emp_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table customer (
	customer_id INTEGER AUTO_INCREMENT, 
	firstName VARCHAR(45) NOT NULL,
	middleName VARCHAR(45) NOT NULL,
	lastName VARCHAR(45)  NOT NULL,
	birthDate DATE DEFAULT CURRENT_DATE,
	contact INTEGER NOT NULL,
	email VARCHAR(45) NOT NULL,
	address VARCHAR(200) NOT NULL, 
	password VARCHAR(100) NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	active INTEGER DEFAULT 0,
	activationToken VARCHAR(200),
	PRIMARY KEY (`customer_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;


create table customer_services(
	customerServices_id INTEGER AUTO_INCREMENT, 
	customer_id INTEGER,
	totalAmount DECIMAL(10,0),
	tax DECIMAL(10,0),
	serviceStatus VARCHAR(15) DEFAULT '', 
	paymentType VARCHAR(15) DEFAULT '', 
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`customerServices_id`),
  	CONSTRAINT `service_details_service_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;


create table service_details (
	service_details_id INTEGER AUTO_INCREMENT, 
	customer_id INTEGER NOT NULL,
	customerSerives_id INTEGER NOT NULL, 
	service_id INTEGER NOT NULL,
	product_id INTEGER NOT NULL,
	quantity INTEGER DEFAULT 1,
	totalAmount DECIMAL(10,0),
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`service_details_id`),
CONSTRAINT `service_details_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `service_details_customerServices_id` FOREIGN KEY (`customerServices_id`) REFERENCES `customerServices` (`customerServices_id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `service_details_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `service_details_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE

	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table feedback (
	feedback_id INTEGER AUTO_INCREMENT,
	customer_id INTEGER NOT NULL,
	feedback VARCHAR(45),
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`feedback_id`),
  	CONSTRAINT `feedback_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `feedback_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,  
	CONSTRAINT `feedback_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `feedback_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table invoice (
	invoice_id INTEGER AUTO_INCREMENT, 
	totalBill float,
	service_details_id INTEGER NOT NULL,
	customer_id INTEGER NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`invoice_id`),
  	CONSTRAINT `invoice_service_details_id` FOREIGN KEY (`service_details_id`) REFERENCES `service_details` (`service_details_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `invoice_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE 
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



