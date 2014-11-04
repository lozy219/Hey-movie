'use strict';

var path = require('path');
var fs = require('fs');
var page = fs.readFileSync(path.join(__dirname, '../views/index/index.ejs'), 'utf8');
var co = require('co');
var views = require('co-views');
var mysql = require('co-mysql');

var result;
var render = views(__dirname + '/../views', {ext: 'ejs' });

// render
module.exports = function* home(next) {
	// var ans = {
	// 	table : 'movie',
	// 	count : result[0][0].count
	// };

	if (this.session.index_mode === "search_movie") {
		this.session.index_mode = undefined;

		if (this.session.movie_searched === "No Result") {
			this.body = yield render('index/index', {user : this.session.customer, render_html : 'index-search-no-result.ejs'});
		} else if (this.session.movie_searched != null) {
			this.body = yield render('index/index', {user : this.session.customer, render_html : 'index-search-result.ejs'});
		}
	} else {
		this.body = yield render('index/index', {user : this.session.customer, render_html : 'index-empty.ejs'});
	}
	this.session.movie_searched=null;
};