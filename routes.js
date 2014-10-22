'use strict';

/**
 * Module dependencies.
 */

var index = require('./controllers/index');
var user = require('./controllers/user');

module.exports = function routes(app) {
	app.get('/', index);
	app.get('/login', user.show_login);
	app.get('/signup', user.show_signup);
	app.get('/logout', user.logout);

	app.post('/user/signup', user.signup);
	app.post('/user/login', user.login);
	

	app.post('/ajax/check_username', user.check_username);
};