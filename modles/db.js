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

exports.update_profile = function* (info) {
	console.log(info);
	if (info.contact != null){
		var query1 = 'UPDATE customer SET contact="' + info.contact + '" WHERE email="' + info.email + '"';
	} else {
		console.log("query1 false");
		return false;
	}
	if (info.dob != null) {
		var query2 = 'UPDATE customer SET DOB="' + info.dob + '" WHERE email="' + info.email + '"';
	} else {
		console.log("query2 false");
		return false;
	}
	console.log(query1);
	var result1 = yield pool.query(query1);
	console.log(query2);
	var result2 = yield pool.query(query2);
	
	return result1 && result2;
}

exports.get_DOB_year = function* (customer) {
	var query = 'SELECT EXTRACT (YEAR FROM DOB) FROM customer WHERE email="' + email + '"';
	return (yield pool.query(query))[0];
}

exports.get_DOB_month = function* (customer) {
	var query = 'SELECT EXTRACT (MONTH FROM DOB) FROM customer WHERE email="' + email + '"';
	return (yield pool.query(query))[0];
}

exports.get_DOB_day = function* (customer) {
	var query = 'SELECT EXTRACT (DAY FROM DOB) FROM customer WHERE email="' + email + '"';
	return (yield pool.query(query))[0];
}

// movie

exports.add_movie = function* (movie) {
	var query = 'INSERT INTO movie (IMDB_link, IMDB_rating, language, length, genre, year, title, poster_link) VALUES ("' +
				movie.IMDB_link + '","' + 
				movie.IMDB_rating + '","' + 
				movie.language + '","' +
				movie.length + '","' +
				movie.genre + '","' +
				movie.year + '","' +
				movie.title + '","' +
				movie.poster_link + '");';
	return yield pool.query(query);
};

exports.get_all_movie = function* () {
	var query = 'SELECT * FROM movie';
	return (yield pool.query(query))[0];
};

exports.get_movie_by_title = function* (title) {
	var query = 'SELECT * FROM movie WHERE title="' + title + '"';
	return (yield pool.query(query))[0];
};

exports.get_movie_by_IMDB_link = function* (link) {
	var query = 'SELECT * FROM movie WHERE IMDB_link="' + IMDB_link + '"';
	return (yield pool.query(query))[0];
};


exports.get_movie_by_title_keyword = function* (title_keyword) {
	var query = 'SELECT * FROM movie WHERE title like  "%' + title_keyword + '%"';
	return (yield pool.query(query))[0];
};

exports.get_all_onshow_movie = function* (){
	var query = 'SELECT * FROM movie WHERE showing_status = "on show" ';
	console.log((yield pool.query(query))[0]);
	return (yield pool.query(query))[0];
};

exports.get_ranking_movie = function* (){
	var query = 'SELECT * FROM movie ORDER BY IMDB_rating DESC';
	console.log((yield pool.query(query))[0]);
	return (yield pool.query(query))[0];
};

exports.get_movie_by_id = function* (id) {
	var query = 'SELECT * FROM movie WHERE movie_id="' + id + '"';
	return (yield pool.query(query))[0];
};

exports.delete_movie_by_id = function* (id) {
	var query = 'DELETE FROM movie WHERE movie_id=' + id;
	console.log(query);
	return yield pool.query(query);
};

// theatre
exports.add_theatre = function* (theatre) {
	var query = 'INSERT INTO theatre (name, location, postal_code, contact, operator_id) VALUES ("' +
				theatre.name + '","' + 
				theatre.location + '","' + 
				theatre.postal_code + '",' +
				theatre.contact + ',' +
				theatre.operator_id + ');';
	console.log(query);
	return yield pool.query(query);
};

exports.get_all_theatre = function* () {
	var query = 'SELECT * FROM theatre';
	return (yield pool.query(query))[0];
};

exports.delete_theatre_by_id = function* (id) {
	var query = 'DELETE FROM theatre WHERE theatre_id=' + id;
	console.log(query);
	return yield pool.query(query);
};

// operator
exports.add_operator = function* (operator) {
	var query = 'INSERT INTO cinema_operator (country, operator_name) VALUES ("' +
				operator.country + '","' + 
				operator.name + '");';
	return yield pool.query(query);
};

exports.get_all_operator = function* () {
	var query = 'SELECT * FROM cinema_operator';
	return (yield pool.query(query))[0];
};

exports.get_operator_by_id = function* (id) {
	var query = 'SELECT * FROM cinema_operator WHERE operator_id =' + id;
	return (yield pool.query(query))[0];	
}

exports.delete_operator_by_id = function* (id) {
	var query = 'DELETE FROM cinema_operator WHERE operator_id=' + id;
	console.log(query);
	return yield pool.query(query);
};

// director

exports.get_all_director = function* () {
	var query = 'SELECT * FROM director';
	return (yield pool.query(query))[0];
}

exports.get_director_by_name = function* (name) {
	var query = 'SELECT * FROM director WHERE name="' + name + '"';
	return (yield pool.query(query))[0];
};

exports.add_director = function* (director) {
	var query = 'INSERT INTO director (name, nationality, gender, profile_pic) VALUES ("' +
				director.director_name + '","' + 
				director.director_nationality + '","' + 
				director.director_gender + '","' +
				null + '");';
	return yield pool.query(query);
};

exports.delete_director_by_id = function* (id) {
	var query = 'DELETE FROM director WHERE director_id=' + id;
	console.log(query);
	return yield pool.query(query);
};

// actor

exports.get_all_actor = function* () {
	var query = 'SELECT * FROM actor';
	return (yield pool.query(query))[0];
}


