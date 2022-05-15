var nvshens = require('./controller');

module.exports = function(app, route) {

	console.log("nvshens");

    route.post('/api/downloadtaotu',nvshens.downloadtaotu());
    route.get('/api/candownload',nvshens.candownload());
    route.get('/api/getalbumlist', nvshens.getalbumlist());
    app.use(route.routes(), route.allowedMethods());
};
