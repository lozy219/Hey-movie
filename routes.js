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
	app.get('/profile/edit', user.show_profile_edit);
	app.get('/movie', movie.show_movie);

	app.post('/user/signup', user.signup);
	app.post('/user/login', user.login);
	app.post('/user/profile', user.profile);
	app.post('/profile/edit', user.profile_edit)

	// admin
	app.get('/admin', admin.show);
	app.get('/admin/movie', admin.show_movie);
	app.post('/admin/movie/add_movie', admin.add_movie);
	app.get('/admin/movie/delete_movie', admin.delete_movie);
	app.get('/admin/movie/add_show', admin.add_show);

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