'use strict';

var path     = require('path');
var fs       = require('fs');
var page     = fs.readFileSync(path.join(__dirname, '../views/index/index.ejs'), 'utf8');
var co       = require('co');
var views    = require('co-views');
var mysql    = require('co-mysql');
var customer = require('../modles/customer.js');
var movie 	 = require('../modles/movie.js');
var theatre  = require('../modles/theatre.js');
var operator  = require('../modles/operator.js');
var director = require('../modles/director.js');
var actor 	 = require('../modles/actor.js');
var db       = require('../modles/db.js');
var config   = require('../config.js');

var result;
var render = views(__dirname + '/../views', {ext: 'ejs' });

// render
exports.show = function* (){
	switch (this.session.admin_mode) {
		case "show_movie":
			this.session.admin_mode = undefined;
			this.body = yield render('admin/admin', {user : this.session.customer, all_movie : this.session.admin_all_movie, render_html : 'admin-movie.ejs'});
			break;

		case "show_theatre":
			this.session.admin_mode = undefined;
			console.log(this.session);
			this.body = yield render('admin/admin', {user : this.session.customer, all_theatre : this.session.admin_all_theatre, all_operator : this.session.admin_all_operator, render_html : 'admin-theatre.ejs'});
			break;

		case "show_operator":
			this.session.admin_mode = undefined;
			this.body = yield render('admin/admin', {user : this.session.customer, all_operator : this.session.admin_all_operator, render_html : 'admin-operator.ejs'});
			break;

		case "show_director":
			this.session.admin_mode = undefined;
			this.body = yield render('admin/admin', {user : this.session.customer, all_director : this.session.admin_all_director, render_html : 'admin-director.ejs'});
			break;

		case "show_actor":
			this.session.admin_mode = undefined;
			this.body = yield render('admin/admin', {user : this.session.customer, all_actor : this.session.admin_all_actor, render_html : 'admin-actor.ejs'});
			break;

		default:
			this.body = yield render('admin/admin', {user : this.session.customer, render_html : '../empty.ejs'});
	}
};

exports.store_selected_movie = function* (){
	this.session.stored_movie = this.request.body.movie_id;
	this.body = this.session.stored_movie;
};

exports.get_selected_movie = function* (){
	var body = {};
	body.movie_id = this.session.stored_movie;
	var movie = (yield db.get_movie_by_id(body.movie_id));
	body.title = movie[0].title;
	this.body = JSON.stringify(body);
};

exports.show_movie = function* (){
	var all_movie                = yield movie.get_all_movie();
	this.session.admin_all_movie = all_movie;
	this.session.admin_mode      = "show_movie";
	this.response.redirect('/admin');
};

exports.add_movie = function* (){
	var result = yield movie.insert(this.request.body);
	if (result == false){
		console.log('add failed');
	} else {
		console.log('add successfully');
	}
	this.response.redirect('/admin');
};

exports.delete_movie = function* (){
	var result = yield movie.delete(this.request.querystring);
	if (result == false){
		console.log('delete failed');
	} else {
		console.log('delete successfully');
	}
	this.response.redirect('/admin');
};

exports.add_show = function* (){
	this.response.redirect('/admin');
};

//Theatre
exports.show_theatre = function* (){
	var all_theatre = yield theatre.get_all_theatre();
	for (var i = 0; i < all_theatre.length; i ++) {
		all_theatre[i].operator = (yield operator.get_operator_by_id(all_theatre[i].theatre_id))[0];
	}

	var all_operator = yield operator.get_all_operator();
	this.session.admin_all_theatre  = all_theatre;
	this.session.admin_all_operator = all_operator;
	this.session.admin_mode         = "show_theatre";
	this.response.redirect('/admin');
};

exports.add_theatre = function* (){
	var result = yield theatre.insert(this.request.body);
	if (result == false) {
		console.log('add failed');
	} else {
		console.log('add successfully');
	}
	this.response.redirect('/admin');
};

exports.delete_theatre = function* (){
	var result = yield theatre.delete(this.request.querystring);
	if (result == false) {
		console.log('delete failed');
	} else {
		console.log('delete successfully');
	}
	this.response.redirect('/admin');
};

//Operator
exports.show_operator = function* (){
	var all_operator                = yield operator.get_all_operator();
	this.session.admin_all_operator = all_operator;
	this.session.admin_mode         = "show_operator";
	this.response.redirect('/admin');
};

exports.add_operator = function* (){
	var result = yield operator.insert(this.request.body);
	if (result == false) {
		console.log('add failed');
	} else {
		console.log('add successfully');
	}
	this.response.redirect('/admin');
};

exports.delete_operator = function* (){
	var result = yield operator.delete(this.request.querystring);
	if (result == false){
		console.log('delete failed');
	} else {
		console.log('delete successfully');
	}
	this.response.redirect('/admin');
};


//Director-unused

exports.show_director = function* (){
	var all_director                = yield director.get_all_director();
	this.session.admin_all_director = all_director;
	this.session.admin_mode         = "show_director";
	this.response.redirect('/admin');
};


exports.add_director = function* (){
	var result = yield director.insert(this.request.body);
	if (result == false){
		console.log('add failed');
	} else {
		console.log('add successfully');
	}
	this.response.redirect('/admin');
};

exports.delete_director = function* (){
	var result = yield director.delete(this.request.querystring);
	if (result == false){
		console.log('delete failed');
	} else {
		console.log('delete successfully');
	}
	this.response.redirect('/admin');
};

//Actor

exports.show_actor = function* (){
	var all_actor                = yield actor.get_all_actor();
	this.session.admin_all_actor = all_actor;
	this.session.admin_mode      = "show_actor";
	this.response.redirect('/admin');
};