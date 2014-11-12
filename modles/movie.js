
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

exports.get_movie_by_ranking = function* (ranking_option){
	var ranking_movie = yield db.get_movie_by_ranking(ranking_option);

	if (ranking_movie.length != 0) {
		return ranking_movie;
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
};