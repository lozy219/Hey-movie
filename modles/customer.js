'use strict';

var db = require('./db.js');

exports.insert = function* (customer) {
	console.log('a');
	return yield db.add_customer(customer);
};