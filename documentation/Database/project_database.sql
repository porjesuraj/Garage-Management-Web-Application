


create table user (
	email VARCHAR(45) NOT NULL,
	password VARCHAR(150) NOT NULL,
	userType VARCHAR(45) NOT NULL,
	createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	active INTEGER DEFAULT 0,
	activationToken VARCHAR(200),
	PRIMARY KEY (`email`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table services (
	service_id integer(11) NOT NULL,
	serviceName VARCHAR(120) NOT NULL,
	servicePrice FLOAT NOT NULL,
	PRIMARY KEY (`service_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;





create table products (
	product_id integer(11) NOT NULL,
	productName VARCHAR(120) NOT NULL,
	productPrice FLOAT NOT NULL,
	PRIMARY KEY (`product_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;




create table question (
	question_id integer(11) NOT NULL,
	questions VARCHAR(120) NOT NULL,
	PRIMARY KEY (`question_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table admin (
	admin_id integer(11) auto_increment, 
	firstName VARCHAR(45) NOT NULL,
	lastName VARCHAR(45) NOT NULL, 
	email VARCHAR(45) NOT NULL,
	password VARCHAR(150) NOT NULL,
	createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`admin_id`),
  	CONSTRAINT `adminemail` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table vendor (
	vendor_id integer(11) auto_increment, 
	name VARCHAR(45) NOT NULL,
	address VARCHAR(200) NOT NULL,
	contact integer(11) NOT NULL, 
	email VARCHAR(45) NOT NULL,
	password VARCHAR(150) NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`vendor_id`),
  	CONSTRAINT `vendoremail` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;




create table employee (
	emp_id integer(11) auto_increment, 
	vendor_id integer(11) NOT NULL,
	firstName VARCHAR(45) NOT NULL,
	lastName VARCHAR(45) NOT NULL,
	birthDate DATE NOT NULL, 
	email VARCHAR(45) NOT NULL,
	password VARCHAR(100) NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`emp_id`),
  	CONSTRAINT `empemail` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `emp_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;




create table customer (
	customer_id integer(11) auto_increment, 
	firstName VARCHAR(45)  NOT NULL,
	middleName VARCHAR(45)  NOT NULL,
	lastName VARCHAR(45)  NOT NULL,
	birthDate DATE  NOT NULL,
	contact integer(11)  NOT NULL,
	email VARCHAR(45)  NOT NULL,
	address VARCHAR(200)  NOT NULL, 
	password VARCHAR(100)  NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`customer_id`),
  	CONSTRAINT `customeremail` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;





create table service_details (
	service_details_id integer(11) auto_increment, 
	date DATE NOT NULL,
	status VARCHAR(15) NOT NULL, 
	service_id integer(11) NOT NULL,
	product_id integer(11) NOT NULL,
	customer_id integer(11) NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`service_details_id`),
  	CONSTRAINT `service_details_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `service_details_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,  
	CONSTRAINT `service_details_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;






create table feedback (
	feedback_id integer(11) auto_increment, 
	emp_id integer(11) NOT NULL,
	customer_id integer(11) NOT NULL,
	vendor_id integer(11) NOT NULL,
	question_id integer(11) NOT NULL,
	answer VARCHAR(45),
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`feedback_id`),
  	CONSTRAINT `feedback_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `feedback_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,  
	CONSTRAINT `feedback_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `feedback_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;





create table invoice (
	invoice_id integer(11) auto_increment, 
	totalBill float,
	date DATE NOT NULL, 
	service_details_id integer(11) NOT NULL,
	customer_id integer(11) NOT NULL,
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`invoice_id`),
  	CONSTRAINT `invoice_service_details_id` FOREIGN KEY (`service_details_id`) REFERENCES `service_details` (`service_details_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `invoice_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE 
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;



