// cred.js

var fs  = require('fs');
var ini = require('ini');

module.exports = function (credPath) {
	credPath = credPath || '.aws/credentials';
	var credFile = fs.readFileSync(credPath, 'utf8');
	var credentials = ini.decode(credFile);

	return credentials['default'];
};
