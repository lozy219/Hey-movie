'use strict';

var db = require('./db.js');

exports.get_all_ticket = function* (){
	var ticket = yield db.get_all_ticket();
	return ticket;
};

exports.delete = function* (id) {
	var result = yield db.delete_ticket_by_id(id);
};

exports.update = function* (ticket) {
	var seat = ticket.seat;
	var a = yield db.get_ticket_by_seat(seat);
	console.log(a);
	if (a[0].length !== 0) {
		return false;
	} else {
		var result = yield db.update_ticket(ticket);
		return result;
	}
};