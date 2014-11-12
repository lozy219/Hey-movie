'use strict';

var db = require('./db.js');

exports.insert = function* (show) {
	return yield db.add_show(show);
};

exports.get_all_ongoing_shows = function* () {
	return yield db.get_all_ongoing_shows();
};