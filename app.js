var knox  = require('knox');
var nconf = require('nconf');
var path  = require('path');
var cred  = require('./lib/cred.js');
var couch = require('./lib/couch.js');

nconf.file('dev', 'config-dev.json').argv().env().file('config.json');
nconf.defaults({
	"dbUrl": "http://localhost:5984",
	"dbName": "database",
	"s3BucketName": "bucket",
	"awsCredentialsPath": ".aws/credentials"
});

var dbSettings   = couch(nconf.get('dbUrl'));
var dbName       = nconf.get('dbName');

var awsCred      = cred(nconf.get('awsCredentialsPath'));
var s3BucketName = nconf.get('s3BucketName');

dbSettings.getDatabaseDir(function (err, dbDir) {
	if (err) {
		console.log("Could not connect to CouchDB.");
		console.log(err);
		return;
	}

	var client = knox.createClient({
		key: awsCred.aws_access_key_id,
		secret: awsCred.aws_secret_access_key,
		bucket: s3BucketName
	});

	var dbFileExt = ".couch";
	var dbFilePath = path.join(dbDir, dbName + dbFileExt);

	console.log("Backing up database ");
	console.log("    at " + dbFilePath + "...");

	var s3FilePath = "/" + dbName + "-backup" + dbFileExt;

	client.putFile(dbFilePath, s3FilePath, function (err, res) {
		if (err) {
			console.log("KNOX ERROR");
			console.log(err);
			return; 
		}

		if (res.statusCode === 200) {
			console.log("SUCCESS");
			console.log(res.statusCode);
			console.log(res.headers);			
		}
		else {
			console.log("FAILURE");
			console.log(res.statusCode);
			console.log(res.headers);
		}
	});
});
