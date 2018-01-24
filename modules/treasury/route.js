var treas = require('./controller');

module.exports = function(app, route) {

	console.log("gettreasurytotal");

    route.get('/api/gettreas',treas.gettreasurytotal());

    app.use(route.routes(), route.allowedMethods());
};