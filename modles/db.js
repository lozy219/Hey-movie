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
	return 1;
};

exports.get_customer_by_username = function* (username) {
	var query = 'SELECT * FROM customer WHERE name="' + username + '"';
	return (yield pool.query(query))[0];
}

exports.get_customer_by_email = function* (email) {
	var query = 'SELECT * FROM customer WHERE email="' + email + '"';
	return (yield pool.query(query))[0];
}

exports.return_customer_password = function* (customer_email){
	var query_customers = 'SELECT * FROM customer WHERE email="' + customer_email + '"';
	var customer_returned = yield pool.query(query_customers);
	var password = null;
	if(customer_returned[0].length == 1) return customer_returned[0].password;
	else return password;
};
