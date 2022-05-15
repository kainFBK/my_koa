var xiangshui = require('./controller');

module.exports = function(app, route) {

	console.log("xiangshui");

    route.get('/api/capsule',xiangshui.capsule());
    app.use(route.routes(), route.allowedMethods());
};
