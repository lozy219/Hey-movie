'use strict';

var path = require('path');
var fs = require('fs');

var page = fs.readFileSync(path.join(__dirname, '../views/index.html'), 'utf8');

module.exports = function* home(next) {
  this.body = page;
};