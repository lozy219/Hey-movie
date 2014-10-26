'use strict';

var mysql  = require('co-mysql');
var config = require('../config.js');

var pool = mysql.createPool({
	host     : config.db_host,
	user     : config.db_user,
	password : config.db_password,
	database : config.database
});

// customer
exports.add_customer = function* (customer) {
	var query = 'INSERT INTO customer (name, email, password) VALUES ("' +
				customer.name + '","' + 
				customer.email + '","' + 
				customer.password + '");';
	return yield pool.query(query);
};

exports.get_customer_by_username = function* (username) {
	var query = 'SELECT * FROM customer WHERE name="' + username + '"';
	return (yield pool.query(query))[0];
};

exports.get_customer_by_email = function* (email) {
	var query = 'SELECT * FROM customer WHERE email="' + email + '"';
	return (yield pool.query(query))[0];
};

// movie
exports.add_movie = function* (movie) {
	var query = 'INSERT INTO movie (IMDB_link, IMDB_rating, language, length, genre, year, title) VALUES ("' +
				movie.IMDB_link + '","' + 
				movie.IMDB_rating + '","' + 
				movie.language + '","' +
				movie.length + '","' +
				movie.genre + '","' +
				movie.year + '","' +
				movie.title + '");';
	return yield pool.query(query);
}

exports.get_movie_by_title = function* (title) {
	var query = 'SELECT * FROM movie WHERE title="' + title + '"';
	return (yield pool.query(query))[0];
}

exports.et_movie_by_IMDB_link = function* (link) {
	var query = 'SELECT * FROM movie WHERE IMDB_link="' + IMDB_link + '"';
	return (yield pool.query(query))[0];
}