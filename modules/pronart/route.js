var pronart = require('./controller');

module.exports = function(app, route) {

	console.log("pronart");

    route.get('/api/getpronlist',pronart.getpronlist());
    // route.post('/api/getpiclist',album.getpiclist());
    

    app.use(route.routes(), route.allowedMethods());
};
