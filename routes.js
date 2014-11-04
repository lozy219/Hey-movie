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

	app.post('/user/signup', user.signup);
	app.post('/user/login', user.login);
	app.post('/user/profile', user.profile);

	// admin
	app.get('/admin', admin.show);

	app.post('/movie/homepage_movie_search',movie.homepage_movie_search);
	
	app.post('/ajax/check_username', user.check_username);
};