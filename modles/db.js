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
	console.log("test");
	var query_username = 'SELECT count(*) FROM customer WHERE name="'+customer.name+'"';
	console.log(yield pool.query(query_username));
	var username_number = yield pool.query(query_username);

	var query_email = 'SELECT count(*) FROM customer WHERE email="'+customer.email+'"';
	console.log(yield pool.query(query_email));
	var email_number = yield pool.query(query_email);

	return (username_number == 0 && email_number == 0);
}