'use strict';

var db = require('./db.js');

exports.insert = function* (customer) {
	if (yield db.customer_existence(customer)){
		return false;
	} else {
		return yield db.add_customer(customer);
	}
};