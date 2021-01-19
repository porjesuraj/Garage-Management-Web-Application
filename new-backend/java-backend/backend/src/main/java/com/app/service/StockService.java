package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.StockDao;
import com.app.pojos.Stock;

@Service
public class StockService implements IStockService {

	
	@Autowired
	private StockDao stockDao; 
	
	
	@Override
	public Stock getById(int stock_id) {
		

		Optional<Stock> stock = stockDao.findById(stock_id); 
		 
		 if(stock.isPresent())
			 return stock.get(); 
		 else
		  return null;	
	}

	@Override
	public Stock addStock(Stock newStock) {
		// TODO Auto-generated method stub
		return stockDao.save(newStock);
	}

}
