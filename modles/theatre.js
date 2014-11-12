'use strict';

var db = require('./db.js');

exports.get_all_theatre = function* (){
	var theatre = yield db.theatree();

	return theatre;
}

exports.insert = function* (theatre) {
	return yield db.add_theatre(theatre);
};

exports.delete = function* (id) {
	var result = yield db.delete_theatre_by_id(id);
};