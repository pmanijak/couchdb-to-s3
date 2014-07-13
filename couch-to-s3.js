var knox  = require('knox');
var path  = require('path');
var couch = require('./lib/couch.js');

module.exports = function copy(options, callback) {

	options.db = options.db || {};
	options.db.url = options.db.url || "http://localhost:5984";
	options.db.name = options.db.name || "database";

	options.aws = options.aws || {};
	options.aws.accessKeyId = options.aws.accessKeyId || "no access key id";
	options.aws.secretAccessKey = options.aws.secretAccessKey || "no secret access key";
	options.aws.bucket = options.aws.bucket || "bucket";

	var dbSettings   = couch(options.db.url);
	var dbName       = options.db.name;
	var s3BucketName = options.aws.bucket;

	dbSettings.getDatabaseDir(function (err, dbDir) {
		if (err) {
			var error = {};
			error.message = "Could not connect to CouchDB."
			error.error = err;
			return callback(error);
		}

		var client = knox.createClient({
			key: options.aws.accessKeyId,
			secret: options.aws.secretAccessKey,
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




