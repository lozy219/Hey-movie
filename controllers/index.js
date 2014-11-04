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
//	console.log("session"+this.session.movie_searched);
	this.body = yield render('index/index', {user : this.session.customer, movie_search_result : this.session.movie_searched});
	this.session.movie_searched=null;
};