'use strict';

var path = require('path');
var fs = require('fs');
var page = fs.readFileSync(path.join(__dirname, '../views/index.ejs'), 'utf8');
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
	this.body = yield render('index'/*, {ans : ans}*/);
};