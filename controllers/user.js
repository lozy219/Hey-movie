'use strict';

var path     = require('path');
var fs       = require('fs');
var page     = fs.readFileSync(path.join(__dirname, '../views/index.ejs'), 'utf8');
var co       = require('co');
var views    = require('co-views');
var mysql    = require('co-mysql');
var customer = require('../modles/customer.js');
var db       = require('../modles/db.js');
var config   = require('../config.js');

var result;
var render = views(__dirname + '/../views', {ext: 'ejs' });

// render
exports.show_login = function* (){
	this.body = yield render('login', {user : this.session.customer});
};

exports.show_signup = function* (){
	this.body = yield render('signup', {user : this.session.customer});
};

exports.signup = function* (){
	var result = yield customer.insert(this.request.body);
	if (result == false){
		console.log('signup failed');
	} else {
		this.session.customer = yield db.get_customer_by_email(this.request.body.email);
		this.response.redirect('/');
	}
};

exports.check_username = function* (){
	var result = yield db.get_customer_by_username(this.request.body.username);
	this.body = result;
};

exports.login = function* (){
	var password = yield customer.get_password_by_email(this.request.body.email);
	if (password == null) {
		console.log('No such user'); 
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
		console.log('Password is incorrect');
	}
};

exports.logout = function* (){
	this.session = null;
	this.response.redirect('/');
};