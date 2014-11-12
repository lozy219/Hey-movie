'use strict';

var db = require('./db.js');

exports.get_all_ticket = function* (){
	var ticket = yield db.get_all_ticket();

	return ticket;
};