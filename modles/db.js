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