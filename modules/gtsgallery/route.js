var gtsgallery = require('./controller');

module.exports = function(app, route) {

	console.log("pronart");

    route.get('/api/getgtsrandomlist', gtsgallery.getgtsrandomlist());
    route.get('/api/gtslisttest',gtsgallery.gtslisttest());
    // route.post('/api/getpiclist',album.getpiclist());
    route.post('/api/deletepicfromid',gtsgallery.deletePicFromId());
    route.post('/api/likepicfromid',gtsgallery.likePicFromId());

    app.use(route.routes(), route.allowedMethods());
};
