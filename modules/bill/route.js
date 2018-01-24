var bill = require('./controller');

module.exports = function(app, route) {

	console.log("postbill");

    route.post('/api/postbill',bill.postbill());

    app.use(route.routes(), route.allowedMethods());
};