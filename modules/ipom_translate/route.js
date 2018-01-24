var piccrew = require('./controller');

module.exports = function(app, route) {

	//console.log("postbill");

    //route.get('/api/piccrew',piccrew.showpic());

    app.use(route.routes(), route.allowedMethods());
};