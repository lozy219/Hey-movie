'use strict';

/**
 * Module dependencies.
 */

var index = require('./controllers/index');
var user  = require('./controllers/user');
var movie = require('./controllers/movie');
var admin = require('./controllers/admin');

module.exports = function routes(app) {
	app.get('/', index);

	// user
	app.get('/login', user.show_login);
	app.get('/signup', user.show_signup);
	app.get('/logout', user.logout);
	app.get('/profile', user.show_profile);
	app.get('/ranking', user.show_ranking);
	app.get('/profile/edit', user.show_profile_edit);
	app.get('/movie', movie.show_movie);

	app.post('/user/signup', user.signup);
	app.post('/user/login', user.login);
	app.post('/user/profile', user.profile);
	app.post('/profile/edit', user.profile_edit);
	app.post('/user/advanced_search_movie', user.advanced_search_movie);

	// admin
	app.get('/admin', admin.show);
	app.get('/admin/movie', admin.show_movie);
	app.post('/admin/movie/add_movie', admin.add_movie);
	app.get('/admin/movie/delete_movie', admin.delete_movie);
	app.post('/admin/movie/add_show', admin.add_show);

	app.get('/admin/operator', admin.show_operator);
	app.post('/admin/operator/add_operator', admin.add_operator);
	app.get('/admin/operator/delete_operator', admin.delete_operator);

	app.get('/admin/theatre', admin.show_theatre);
	app.post('/admin/theatre/add_theatre', admin.add_theatre);
	app.get('/admin/theatre/delete_theatre', admin.delete_theatre);

	app.get('/admin/director', admin.show_director);
	app.post('/admin/director/add_director', admin.add_director);
	app.get('/admin/director/delete_director', admin.delete_director);

	app.get('/admin/actor', admin.show_actor);

	app.post('/movie/homepage_movie_search',movie.homepage_movie_search);
	app.post('/admin/add_director', admin.add_director);
	app.post('/admin/delete_director', admin.delete_director);
	
	app.post('/ajax/check_username', user.check_username);
	app.post('/ajax/store_selected_movie', admin.store_selected_movie);
	app.post('/ajax/get_selected_movie', admin.get_selected_movie);
	
};