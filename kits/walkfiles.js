var fs = require('fs');

var _walk = function(root, includeRegex, excludeRegex, removePath) {
	var output = [];
	var directories = [];

	fs.readdirSync(root).forEach(function(file) {
		var newPath = root + '/' + file;
		var stat = fs.statSync(newPath);

		if (stat.isFile()) {
			if (includeRegex.test(file) && (!excludeRegex || !excludeRegex.test(file))) {
				output.push(newPath.replace(removePath, ''));
			}
		} else if (stat.isDirectory()) {
			directories.push(newPath);
		}
	});

	directories.forEach(function(directory) {
		output = output.concat(_walk(directory, includeRegex, excludeRegex, removePath));
	});

	return output;
};

module.exports = _walk;