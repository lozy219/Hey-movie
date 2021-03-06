'use strict' ;

var middlewares = require('koa-middlewares');
var routes      = require('./routes');
var path        = require('path');
var http        = require('http');
var koa         = require('koa');
var serve       = require('koa-static');
var bodyParser  = require('koa-body-parser');
// var session     = require('koa-session');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');



var app = koa();

// retrieve info from form request
app.use(bodyParser());

// use session
// app.keys = ['secret'];
// app.use(session());
app.keys = ['keys', 'keykeys'];
app.use(session({
	store: redisStore()
}));

// ignore favicon
app.use(middlewares.favicon());

// response time header
app.use(middlewares.rt());

// router
app.use(middlewares.router(app));
routes(app);

/**
 * static
 */
app.use(serve(__dirname + '/static'));

app = module.exports = http.createServer(app.callback());

app.listen(8888);
console.log('$ open http://127.0.0.1:8888');