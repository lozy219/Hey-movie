'use strict';

var db = require('./db.js');

exports.get_all_director = function* (){
	var director = yield db.get_all_director();

	return director;
}

exports.insert = function* (director) {
	console.log("11111");
	var name = yield db.get_director_by_name(director.director_name);
console.log("2222");
	if (name.length == 0){
		return yield db.add_director(director);
	} else {
		return false;
	}
};