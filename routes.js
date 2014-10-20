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

	app.post('/user/signup', user.signup);
};