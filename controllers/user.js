'use strict';

var path     = require('path');
var fs       = require('fs');
var page     = fs.readFileSync(path.join(__dirname, '../views/index/index.ejs'), 'utf8');
var co       = require('co');
var views    = require('co-views');
var mysql    = require('co-mysql');
var customer = require('../modles/customer.js');
var movie 	 = require('../modles/movie.js');
var error 	 = require('../modles/error.js');
var ticket    = require('../modles/ticket.js');
var db       = require('../modles/db.js');
var config   = require('../config.js');

var result;
var render = views(__dirname + '/../views', {ext: 'ejs' });

// render
exports.show_login = function* (){
	// this.body = yield render('login', {user : this.session.customer});
	this.session.index_mode = "show_login";
	this.response.redirect('/');
};

exports.show_signup = function* (){
	// this.body = yield render('signup', {user : this.session.customer});
	this.session.index_mode = "show_signup";
	this.response.redirect('/');
};

exports.show_profile = function* (){
	this.session.index_mode = "show_profile";
	this.response.redirect('/');
};

exports.show_profile_edit = function* (){
	this.body = yield render('index/profile_edit', {user : this.session.customer});
};

exports.show_ranking = function* (){
	var ranking_search_result   = yield movie.get_ranking_movie();
	this.session.ranking_movie = ranking_search_result;
	this.session.index_mode = "show_ranking";
	this.response.redirect('/');
};

exports.signup = function* (){
	var result = yield customer.insert(this.request.body);
	if (result == false){
		this.session.index_mode = "show_error";
		this.session.error = "Signup failed";
		this.response.redirect('/');
	} else {
		this.session.customer = (yield db.get_customer_by_email(this.request.body.email))[0];
		if (config.admin_id.indexOf(this.session.customer.customer_id) !== -1) {
			this.session.customer.is_admin = true;
		} else {
			this.session.customer.is_admin = false;
		}
		this.response.redirect('/');
	}
};

exports.check_username = function* (){
	var result = yield db.get_customer_by_username(this.request.body.username);
	this.body = result;
};

exports.login = function* (){
	console.log(this.request);
	var password = yield customer.get_password_by_email(this.request.body.email);
	if (password == null) {
		this.session.index_mode = "show_error";
		this.session.error = "Login failed";
		this.response.redirect('/');
	} else if (password === this.request.body.password) {
		console.log('Login Successfully');
		var current_customer = yield db.get_customer_by_email(this.request.body.email);
		if (current_customer !== undefined) {
			current_customer = current_customer[0];
			if (config.admin_id.indexOf(current_customer.customer_id) !== -1) {
				current_customer.is_admin = true;
			} else {
				current_customer.is_admin = false;
			}
		}
		this.session.customer = current_customer;
		this.response.redirect('/');
	} else {
		this.session.index_mode = "show_error";
		this.session.error = "Login failed";
		this.response.redirect('/');
	}
};

exports.profile = function* (){
	this.response.redirect('/profile/edit');
};

exports.profile_edit = function* (){
	var result = yield customer.edit_profile(this.request.body);
	if (result == false){
		this.session.index_mode = "show_error";
		this.session.error = "Update failed";
		this.response.redirect('/');
	} else {
		var current_customer = yield db.get_customer_by_email(this.request.body.email);
		this.session.customer = current_customer[0];
		if (config.admin_id.indexOf(this.session.customer.customer_id) !== -1) {
			this.session.customer.is_admin = true;
		} else {
			this.session.customer.is_admin = false;
		}
		this.response.redirect('/profile');
	}
}

exports.logout = function* (){
	this.session = null;
	this.response.redirect('/');
};

exports.movie_search = function* (){
	var movie_result = yield movie.get_movie_by_title_keyword(this.request.body);
};

exports.advanced_search_movie = function* (){
	var movie_search_result = yield movie.get_movie_by_advanced_search(this.request.body);
	this.session.advanced_search_movie = movie_search_result;
	this.session.index_mode = "show_advanced_search_result";
	this.response.redirect('/');
}

exports.show_ticket = function* (){
	var all_ticket                = yield ticket.get_all_ticket();
	this.session.user_all_ticket = all_ticket;
	this.session.index_mode         = "user_show_ticket";
	this.response.redirect('/');
};
