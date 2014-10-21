'use strict';

var path = require('path');
var fs = require('fs');
var page = fs.readFileSync(path.join(__dirname, '../views/index.ejs'), 'utf8');
var co = require('co');
var views = require('co-views');
var mysql = require('co-mysql');
var customer = require('../modles/customer.js');
var db = require('../modles/db.js');

var result;
var render = views(__dirname + '/../views', {ext: 'ejs' });

// render
exports.show_login = function* (){
	this.body = yield render('login');
};

exports.show_signup = function* (){
	this.body = yield render('signup');
};

exports.signup = function* (){
	var result = yield customer.insert(this.request.body);
	if (result == false){
		console.log('signup failed');
	} else {
		this.body = this.request.body;
	}
};

exports.check_username = function* (){
	var result = yield db.get_customer_by_username(this.request.body.username);
	this.body = result;
};

exports.login = function* (){
	var login_customer = this.request.body;
	var password_existence = yield customer.get_customer_password(login_customer.email);
	if (password_existence == null) {
		console.log('false');
	} else if (password_existence === login_customer.password) {
		console.log('success');
	} else {
		console.log('false');
	}
};