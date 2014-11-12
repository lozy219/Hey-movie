'use strict';

var path  = require('path');
var fs    = require('fs');
var page  = fs.readFileSync(path.join(__dirname, '../views/index/index.ejs'), 'utf8');
var co    = require('co');
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

	switch (this.session.index_mode) {
		case "search_movie":
			this.session.index_mode = undefined;

			if (this.session.movie_searched === "No Result") {
				this.body = yield render('index/index', {user : this.session.customer, render_html : 'index-search-no-result.ejs'});
			} else if (this.session.movie_searched != null) {
				this.body = yield render('index/index', {user : this.session.customer, movie_result: this.session.movie_searched, render_html : 'index-search-result.ejs'});
			}
			break;

		case "show_movie":
			this.session.index_mode = undefined;
			this.body = yield render('index/index', {user : this.session.customer, all_theatre : this.session.admin_all_theatre, advanced_search_movie: this.session.advanced_search_movie, onshow_movie: this.session.movie_on_show, render_html : 'index-movie.ejs'});
			break;

		case "show_advanced_search_result":
		this.session.index_mode = undefined;
		this.body = yield render('index/index', {user : this.session.customer, advanced_search_movie: this.session.advanced_search_movie, onshow_movie: this.session.movie_on_show, render_html : 'index-movie.ejs'});
		break;

		case "show_login":
			this.session.index_mode = undefined;
			this.body = yield render('index/index', {user : this.session.customer, render_html : 'index-login.ejs'});
			break;

		case "show_signup":
			this.session.index_mode = undefined;
			this.body = yield render('index/index', {user : this.session.customer, render_html : 'index-signup.ejs'});
			break;

		case "show_ranking":
			this.session.index_mode = undefined;
			this.body = yield render('index/index', {user : this.session.customer, ranking_movie: this.session.ranking_movie, onshow_movie: this.session.movie_on_show, render_html : 'index-ranking.ejs'});
			break;

		default:
			this.body = yield render('index/index', {user : this.session.customer, render_html : '../empty.ejs'});
	}

	this.session.movie_searched=null;
};