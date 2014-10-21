'use strict';

var db = require('./db.js');

exports.insert = function* (customer) {
	var name = yield db.get_customer_by_username(customer.name);
	var email = yield db.get_customer_by_email(customer.email);

	if (name.length == 0 && name.length == 0){
		return yield db.add_customer(customer);
	} else {
		return false;
	}
};

exports.get_customer_password = function* (customer_email){

	return yield db.return_customer_password(customer_email);
};