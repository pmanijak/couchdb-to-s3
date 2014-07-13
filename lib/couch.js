// couch.js

var nano = require("nano");

module.exports = function (dbUrl) {

	nano = nano(dbUrl);

	var getDatabaseDir = function getDatabaseDir (callback) {
		var opts = {
			method: 'get',
			path: '_config/couchdb/database_dir'
		};
		nano.relax(opts, callback);
	};

	return {
		getDatabaseDir: getDatabaseDir
	}
};