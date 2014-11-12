'use strict';

var db = require('./db.js');

exports.get_all_operator = function* (){
	var operator = yield db.get_all_operator();

	return operator;
}

exports.insert = function* (operator) {
	var name = yield db.get_operator_by_name(operator.operator_name);
	if (name.length == 0){
		return yield db.add_operator(operator);
	} else {
		return false;
	}
};

exports.delete = function* (id) {
	var result = yield db.delete_operator_by_id(id);
};