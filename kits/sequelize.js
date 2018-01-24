'use strict';

var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');


var sequelize = new Sequelize(
	'test',
	'mysqladmin',
	'Fi8vHmeyxrKMrXk2',
	{
		dialect: 'mysql',
		host: '172.16.36.72',
		port: 17332
	}
);

module.exports = sequelize;