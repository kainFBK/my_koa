const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
var path = require('path');
var route = require('koa-router')();
var cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')
var walkRoutes = require('./kits/walkfiles');

//cors
app.use(cors());

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

	/******************************************************
	 * Initialize Sequelize
	 ******************************************************/
	//var sequelize = require('./kits/sequelize');

	/******************************************************
	 * Bootstrap routes/api
	 * Scan all directory /routes and add to app
	 ******************************************************/
	walkRoutes(__dirname + '/modules', /route\.js$/).forEach(function(routePath) {
	    require(path.resolve(routePath))(app, route);
	});

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

module.exports = app
