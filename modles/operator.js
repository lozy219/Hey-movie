'use strict';

var db = require('./db.js');

exports.get_all_operator = function* (){
	var operator = yield db.get_all_operator();

	return operator;
}

exports.insert = function* (operator) {
	return yield db.add_operator(operator);
};

exports.delete = function* (id) {
	var result = yield db.delete_operator_by_id(id);
};