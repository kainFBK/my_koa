var piccrew = require('./controller');

module.exports = function(app, route) {

	console.log("piccrew");

    route.post('/api/picrew',piccrew.showpic());
    route.post('/api/boourcrew',piccrew.getboour());

    app.use(route.routes(), route.allowedMethods());
};