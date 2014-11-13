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
	if (info.contact != ''){
		var query1 = 'UPDATE customer SET contact="' + info.contact + '" WHERE email="' + info.email + '"';
		var result1 = yield pool.query(query1);
	} else {
		var result1 = true;
	}
	if (info.dob != '') {
		var query2 = 'UPDATE customer SET DOB="' + info.dob + '" WHERE email="' + info.email + '"';
		var result2 = yield pool.query(query2);
	} else {
		var result2 = true;
	}
	return result1 && result2;
};

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

exports.update_movie = function* (info) {
	var query = 'UPDATE movie SET length="' + info.length + 
	'", language="' + info.language +
	'", genre="' + info.genre + 
	'", year="' + info.year + 
	'", showing_status="' + info.status + 
	'", IMDB_rating="' + info.IMDB_rating + 
	'", IMDB_link="' + info.IMDB_link + 
	'", poster_link="' + info.poster_link + 
	'" WHERE movie_id="' + info.id + '"';
	console.log(query);
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
	return (yield pool.query(query))[0];
};

exports.get_ranking_movie = function* (){
	var query = 'SELECT * FROM movie ORDER BY IMDB_rating DESC';
	return (yield pool.query(query))[0];
};

exports.get_movie_by_advanced_search = function* (search_option){

	if(search_option.genre == "" && search_option.year != ""){
		var query = 'SELECT * FROM movie WHERE year="' + search_option.year + '" ORDER BY IMDB_rating DESC ';
		console.log("aaaaa:"+query);
	}
	else if(search_option.genre != "" && search_option.year == ""){
		var query = 'SELECT * FROM movie WHERE genre="' + search_option.genre + '"ORDER BY IMDB_rating DESC';
	}
	else if(search_option.genre != "" && search_option.year != ""){
		var query = 'SELECT * FROM movie WHERE genre="' + search_option.genre + '" AND year="' + search_option.year+ '"ORDER BY IMDB_rating DESC ';
	}

	return (yield pool.query(query))[0];
};

exports.get_movie_by_id = function* (id) {
	var query = 'SELECT * FROM movie WHERE movie_id="' + id + '"';
	return (yield pool.query(query))[0];
};

exports.delete_movie_by_id = function* (id) {
	var query = 'DELETE FROM movie WHERE movie_id=' + id;
	// console.log(query);
	return yield pool.query(query);
};

exports.get_seats_by_show_id = function* (id) {
	var query = 'SELECT * FROM ticket WHERE show_id=' + id;
	return yield pool.query(query);	
}

// show
exports.add_show = function* (show) {
	var query = 'INSERT INTO shows (movie_id, subtitle, start_time, end_time, theatre_id) VALUES ("' +
				show.movie_id + '","' + 
				show.subtitle + '","' + 
				show.start_time + '","' +
				show.end_time + '",' +
				show.theatre_id + ');';
	return yield pool.query(query);
};

exports.get_all_ongoing_shows = function* () {
	var query = 'SELECT * FROM shows WHERE start_time > NOW()';
	var result = yield pool.query(query);
	return result[0];
};

exports.add_booking = function* (booking) {
	console.log(booking);
	var seat_string = booking.seat;
	var seat = seat_string.split(',');
	if (seat.length !== 0) {
		for (var i = 0; i < seat.length - 1; i ++) {
			var query = 'INSERT INTO ticket (customer_id, booking_time, seat_no, show_id) VALUES (' +
						booking.user_id + ', NOW(), "' +
						seat[i] + '",' +
						booking.show + ');';
			console.log(query);
			yield pool.query(query);
		}
	}
	return true;
}
// theatre
exports.add_theatre = function* (theatre) {
	var query = 'INSERT INTO theatre (name, location, postal_code, contact, operator_id) VALUES ("' +
				theatre.name + '","' + 
				theatre.location + '","' + 
				theatre.postal_code + '",' +
				theatre.contact + ',' +
				theatre.operator_id + ');';
	return yield pool.query(query);
};

exports.get_all_theatre = function* () {
	var query = 'SELECT * FROM theatre';
	return (yield pool.query(query))[0];
};

exports.delete_theatre_by_id = function* (id) {
	var query = 'DELETE FROM theatre WHERE theatre_id=' + id;
	return yield pool.query(query);
};

exports.get_theatre_by_id = function* (id) {
	var query = 'SELECT * FROM theatre WHERE theatre_id = ' + id ;
	return (yield pool.query(query))[0];
}

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

//Ticket
exports.get_all_ticket = function* () {
	var query = 'SELECT ticket_id, m.title AS movie_title, th.name AS theatre_name, s.start_time, s.end_time, c.name, t.seat_no, t.booking_time FROM ticket t, customer c, shows s, movie m, theatre th WHERE t.show_id = s.show_id AND s.movie_id = m.movie_id AND s.theatre_id = th.theatre_id AND t.customer_id = c.customer_id';

	return (yield pool.query(query))[0];
};

exports.delete_ticket_by_id = function* (id) {
	var query = 'DELETE FROM ticket WHERE ticket_id=' + id;
	// console.log(query);
	return yield pool.query(query);
};

// // director

// exports.get_all_director = function* () {
// 	var query = 'SELECT * FROM director';
// 	return (yield pool.query(query))[0];
// }

// exports.get_director_by_name = function* (name) {
// 	var query = 'SELECT * FROM director WHERE name="' + name + '"';
// 	return (yield pool.query(query))[0];
// };

// exports.add_director = function* (director) {
// 	var query = 'INSERT INTO director (name, nationality, gender, profile_pic) VALUES ("' +
// 				director.director_name + '","' + 
// 				director.director_nationality + '","' + 
// 				director.director_gender + '","' +
// 				null + '");';
// 	return yield pool.query(query);
// };

// exports.delete_director_by_id = function* (id) {
// 	var query = 'DELETE FROM director WHERE director_id=' + id;
// 	console.log(query);
// 	return yield pool.query(query);
// };

// // actor

// exports.get_all_actor = function* () {
// 	var query = 'SELECT * FROM actor';
// 	return (yield pool.query(query))[0];
// }


