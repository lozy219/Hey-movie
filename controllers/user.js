'use strict';

var path = require('path');
var fs = require('fs');
var page = fs.readFileSync(path.join(__dirname, '../views/index.ejs'), 'utf8');
var co = require('co');
var views = require('co-views');
var mysql = require('co-mysql');

var result;
var render = views(__dirname + '/../views', {ext: 'ejs' });

co(function*() {
	var pool = mysql.createPool({
		host     : 'localhost',
		user     : 'root',
		password : 'password',
		database : 'hey_movie'
	});
	pool.end();
})();

// render
exports.show_login = function* (){
	this.body = yield render('login');
};

exports.show_signup = function* (){
	this.body = yield render('signup');
};

exports.signup = function* (){
	this.body = this.request.body;
};