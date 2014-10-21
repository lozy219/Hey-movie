'use strict';

var mysql = require('co-mysql');

var pool = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'hey_movie'
});

exports.add_customer = function* (customer) {
	var query = 'INSERT INTO customer (name, email, password) VALUES ("' +
				customer.name + '","' + 
				customer.email + '","' + 
				customer.password + '");';
	// console.log(query);
	console.log(yield pool.query(query));
	return 1;
};

// check both username and email existence
exports.customer_existence = function* (customer) {
	var query_username = 'SELECT EXISTS(SELECT * FROM users WHERE name="'+customer.name+'")';
	console.log(yield pool.query(query_username));
	var query_username_exists = yield pool.query(query_username);
	var username_number = query_username_exists.length;

	var query_email = 'SELECT EXISTS(SELECT * FROM users WHERE email="'+customer.email+'")';
	console.log(yield pool.query(query_email));
	var query_email_exists = yield pool.query(query_email);
	var email_number = query_email_exists.length;
	return (username_number == 0 && email_number == 0);
}

exports.get_customer_by_username = function* (username) {
	var query = 'SELECT * FROM customer WHERE name="' + username + '"';
	return yield pool.query(query);
}

exports.get_customer_by_email = function* (email) {
	var query = 'SELECT * FROM customer WHERE email="' + email + '"';
	return yield pool.query(query);
}








