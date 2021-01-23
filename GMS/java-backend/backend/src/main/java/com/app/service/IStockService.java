package com.app.service;

import java.util.Optional;

import com.app.pojos.Stock;

public interface IStockService {

	
	Stock getById(int stock_id); 
	
	Stock addStock(Stock newStock); 
	
	
}
