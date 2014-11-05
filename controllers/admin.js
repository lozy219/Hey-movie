'use strict';

var path     = require('path');
var fs       = require('fs');
var page     = fs.readFileSync(path.join(__dirname, '../views/index/index.ejs'), 'utf8');
var co       = require('co');
var views    = require('co-views');
var mysql    = require('co-mysql');
var customer = require('../modles/customer.js');
var movie 	 = require('../modles/movie.js');
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

		default:
			this.body = yield render('admin/admin', {user : this.session.customer, render_html : '../empty.ejs'});
	}
};

exports.show_director = function* (){
	this.body = yield render('admin/admin-director', {user : this.session.customer});
};

exports.show_movie = function* (){
	var all_movie = yield movie.get_all_movie();
	this.session.admin_all_movie = all_movie;
	this.session.admin_mode = "show_movie";
	this.response.redirect('/admin');
};