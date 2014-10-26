/*
'use strict';

var db = require('./db.js');

exports.insert = function* (movie) {
	var title = yield db.get_movie_by_title(movie.title);
	var link = yield db.get_movie_by_IMDB_link(movie.IMDB_link);

	if (title.length == 0 && link.length == 0){
		return yield db.add_movie(movie);
	} else {
		return false;
	}
};
*/