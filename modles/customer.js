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

exports.get_password_by_email = function* (customer) {
	var customer = yield db.get_customer_by_email(customer.email);

	if(customer.length == 1) {
		 return customer[0].password;
		}
	else {
		 return null;
		}
};