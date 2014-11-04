'use strict';

var path = require('path');
var fs = require('fs');
var page = fs.readFileSync(path.join(__dirname, '../views/index.ejs'), 'utf8');
var co = require('co');
var views = require('co-views');
var mysql = require('co-mysql');
var movie 	 = require('../modles/movie.js');
var db       = require('../modles/db.js');
var config   = require('../config.js');

var result;
var render = views(__dirname + '/../views', {ext: 'ejs' });

exports.movie_search = function* (){
	console.log(this.request.body);
	var movie_result = yield movie.get_movie_by_title_keyword(this.request.body);
};