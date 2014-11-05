'use strict';

var db = require('./db.js');

exports.get_all_actor = function* (){
	var actor = yield db.get_all_actor();

	return actor;
}