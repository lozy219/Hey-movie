'use strict';

var db = require('./db.js');

exports.get_all_ticket = function* (){
	var ticket = yield db.get_all_ticket();
	return ticket;
};

exports.delete = function* (id) {
	var result = yield db.delete_ticket_by_id(id);
};