'use strict';

var db = require('./db.js');

exports.insert = function* (customer) {
	// console.log('a');
	if (db.customer_existence(customer)){
		return false;
	} else {
		return yield db.add_customer(customer);
	}
};