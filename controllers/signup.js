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
	result = yield pool.query('SELECT count(*) AS count FROM movie');
	pool.end();
})();

// render
module.exports = function* home(next) {
	var ans = {
		table : 'customer',
		count : result[0][0].count
	};
	this.body = yield render('index', {ans : ans});
};