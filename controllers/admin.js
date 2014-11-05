'use strict';

var path     = require('path');
var fs       = require('fs');
var page     = fs.readFileSync(path.join(__dirname, '../views/index/index.ejs'), 'utf8');
var co       = require('co');
var views    = require('co-views');
var mysql    = require('co-mysql');
var customer = require('../modles/customer.js');
var movie 	 = require('../modles/movie.js');
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

exports.show_movie = function* (){
	var all_movie = yield movie.get_all_movie();
	this.session.admin_all_movie = all_movie;
	this.session.admin_mode = "show_movie";
	this.response.redirect('/admin');
};

exports.show_director = function* (){
	var all_director = yield director.get_all_director();
	this.session.admin_all_director = all_director;
	this.session.admin_mode = "show_director";
	this.response.redirect('/admin');
};

exports.show_actor = function* (){
	var all_actor = yield actor.get_all_actor();
	this.session.admin_all_actor = all_actor;
	this.session.admin_mode = "show_actor";
	this.response.redirect('/admin');
};