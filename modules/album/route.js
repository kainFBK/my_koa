var album = require('./controller');

module.exports = function(app, route) {

	console.log("album");

    route.post('/api/getalbumlist',album.getalbumlist());
    route.post('/api/getpiclist',album.getpiclist());
    

    app.use(route.routes(), route.allowedMethods());
};