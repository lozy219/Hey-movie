'use strict';

var db = require('./db.js');

exports.get_all_director = function* (){
	var director = yield db.get_all_director());

	return director;
}