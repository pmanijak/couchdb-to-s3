var knox  = require('knox');
var path  = require('path');
var couch = require('./lib/couch.js');

module.exports = function copy(db, aws, callback) {

	db = db || {};
	db.url = db.url || "http://localhost:5984";
	db.name = db.name || "database";

	aws = aws || {};
	aws.accessKeyId = aws.accessKeyId || "no access key id";
	aws.secretAccessKey = aws.secretAccessKey || "no secret access key";
	aws.bucket = aws.bucket || "bucket";

	var dbSettings   = couch(db.url);
	var dbName       = db.name;
	var s3BucketName = aws.bucket;

	dbSettings.getDatabaseDir(function (err, dbDir) {
		if (err) {
			var error = {};
			error.message = "Could not connect to CouchDB."
			error.error = err;
			return callback(error);
		}

		var client = knox.createClient({
			key: aws.accessKeyId,
			secret: aws.secretAccessKey,
			bucket: s3BucketName
		});

		var dbFileExt = ".couch";
		var dbFilePath = path.join(dbDir, dbName + dbFileExt);
		var s3FilePath = "/" + dbName + dbFileExt;

		console.log("Backing up database ");
		console.log("  from " + dbFilePath);
		console.log("  to   " + s3BucketName + s3FilePath);
		console.log("  ...");

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




