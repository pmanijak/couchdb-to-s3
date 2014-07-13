var knox  = require('knox');
var couch  = require('./lib/couch.js');
var nconf = require('nconf');

couch = couch('http://localhost:5984');

couch.getDatabaseDir(function (err, dir) {
	if (err) {
		console.log(err);
		return;
	}

	console.log(dir);
});
