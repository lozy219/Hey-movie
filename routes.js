'use strict';

/**
 * Module dependencies.
 */

var index = require('./controllers/index');
var user = require('./controllers/user');

module.exports = function routes(app) {
	app.get('/', index);
	app.get('/login', user.login);
};