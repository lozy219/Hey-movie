'use strict';

/**
 * Module dependencies.
 */

var index = require('./controllers/index');

module.exports = function routes(app) {
  app.get('/', index);
};