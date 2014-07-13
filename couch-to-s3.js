var knox  = require('knox');
var path  = require('path');
var cred  = require('./lib/cred.js');
var couch = require('./lib/couch.js');

module.exports = function copy(options, callback) {

	options.dbUrl = options.dbUrl || "http://localhost:5984";
	options.dbName = options.dbName || "database";
	options.s3BucketName = options.s3BucketName || "bucket";
	options.awsCredentialsPath = options.awsCredentialsPath || ".aws/credentials";

	var dbSettings   = couch(options.dbUrl);
	var dbName       = options.dbName;

	var awsCred      = cred(options.awsCredentialsPath);
	var s3BucketName = options.s3BucketName;

	dbSettings.getDatabaseDir(function (err, dbDir) {
		if (err) {
			var error = {};
			error.message = "Could not connect to CouchDB."
			error.error = err;
			return callback(error);
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
				var error = {};
				error.statusCode = "400";
				error.message = "Knox error";
				error.error = err;
				return callback(error);
			}

			if (res.statusCode === 200) {
				var body = {};
				body.ok = true;
				body.response = res;
				return callback(null, body);
			}
			else {
				var error = {};
				error.statusCode = res.statusCode;
				error.message = "Error connecting to Amazon S3";
				error.error = res;
				return callback(error);
			}
		});
	});
};




