'use strict' ;

var middlewares = require('koa-middlewares');
var routes = require('./routes');
var path = require('path');
var http = require('http');
var koa = require('koa');
var serve = require('koa-static');

var app = koa();
/**
 * ignore favicon
 */
app.use(middlewares.favicon());

/**
 * response time header
 */
app.use(middlewares.rt());

/**
 * router
 */
app.use(middlewares.router(app));
routes(app);

/**
 * static
 */
app.use(serve(__dirname + '/static'));

app = module.exports = http.createServer(app.callback());

app.listen(8888);
console.log('$ open http://127.0.0.1:8888');