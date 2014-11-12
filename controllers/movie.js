'use strict';

var path    = require('path');
var fs      = require('fs');
var page    = fs.readFileSync(path.join(__dirname, '../views/index/index.ejs'), 'utf8');
var co      = require('co');
var views   = require('co-views');
var mysql   = require('co-mysql');
var movie   = require('../modles/movie.js');
var theatre = require('../modles/theatre.js');
var shows   = require('../modles/show.js');
var db      = require('../modles/db.js');
var config  = require('../config.js');

var result;
var render = views(__dirname + '/../views', {ext: 'ejs' });

exports.show_movie = function* (){
	var onshow_search_result           = yield movie.get_all_onshow_movie();
	var all_theatre                    = yield theatre.get_all_theatre();
	this.session.admin_all_theatre     = all_theatre;
	var all_shows                      = yield shows.get_all_ongoing_shows();
	this.session.all_shows             = all_shows;
	var search_result                  = yield movie.get_ranking_movie();
	this.session.advanced_search_movie = search_result;
	this.session.movie_on_show         = onshow_search_result;
	this.session.index_mode            = "show_movie";
	this.response.redirect('/');
};

exports.homepage_movie_search = function* (){
	var search_result           = yield movie.get_movie_by_title_keyword(this.request.body.title_keyword);
	this.session.movie_searched = search_result;
	this.session.index_mode     = "search_movie";
	this.response.redirect('/');
};