'use strict';

var db = require('./db.js');

exports.insert = function* (customer) {
	var name = yield db.get_customer_by_username(customer.name);
	var email = yield db.get_customer_by_email(customer.email);
	if (name.length == 0 && email.length == 0){
		return yield db.add_customer(customer);
	} else {
		return false;
	}
};

exports.get_password_by_email = function* (email) {
	var customer = yield db.get_customer_by_email(email);

	if (customer.length == 1) {
		return customer[0].password;
	} else {
		return null;
	}
};

exports.get_customer_id_by_email = function* (email) {
	var customer = yield db.get_customer_by_email(email);

	if (customer.length == 1) {
		return customer[0].customer_id;
	} else {
		return null;
	}
};

exports.edit_profile = function* (info) {
	return yield db.update_profile(info);
};