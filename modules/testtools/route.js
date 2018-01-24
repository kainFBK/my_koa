var testtools = require('./controller');

module.exports = function(app, route) {

	console.log("testtools");

    route.get('/api/posttool',testtools.posttool());
    route.post('/api/pictool',testtools.pictool());
    
    app.use(route.routes(), route.allowedMethods());
};