'use strict';

var db = require('./db.js');

exports.insert = function* (show) {
	return yield db.add_show(show);
};