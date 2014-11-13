
'use strict';

var db = require('./db.js');

exports.get_movie_by_title_keyword = function* (title_keyword) {
	var movie = yield db.get_movie_by_title_keyword(title_keyword);

	if (movie.length != 0) {
		return movie;
	} else {
		return "No Result";
	}
};

exports.get_all_onshow_movie = function* (){
	var movie = yield db.get_all_onshow_movie();

	if (movie.length != 0) {
		return movie;
	} else {
		return "No Result";
	}
};

exports.get_ranking_movie = function* (){
	var movie = yield db.get_ranking_movie();

	if (movie.length != 0) {
		return movie;
	} else {
		return "No Result";
	}
}

exports.get_movie_by_advanced_search = function* (search_option){
	var advanced_search_movie = yield db.get_movie_by_advanced_search(search_option);

	if (advanced_search_movie.length != 0) {
		return advanced_search_movie;
	} else {
		return "No Result";
	}
}

exports.get_all_movie = function* (){
	var movie = yield db.get_all_movie();

	return movie;
}

exports.insert = function* (movie) {
	return yield db.add_movie(movie);
};

exports.delete = function* (id) {
	var result = yield db.delete_movie_by_id(id);
	console.log(result);
	return result;
};

exports.update = function* (movie) {
	var result = yield db.update_movie(movie);
	return result;
};

exports.add_booking = function* (booking) {
	var result = yield db.add_booking(booking);
	return result;
}