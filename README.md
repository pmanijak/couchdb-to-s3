couch-to-s3
===========
Copy your CouchDB database files to Amazon's S3 service.

    npm install couch-to-s3

Usage
-----------

    var toS3 = require('couch-to-S3');
    var options = {
	    "dbUrl": "http://localhost:5984",
	    "dbName": "the name of your database",
	    "s3BucketName": "your S3 bucket",
	    "awsCredentialsPath": ".aws/credentials"
    };

    toS3(options, function (err, body) {
        // ...
    });

License
-------
BSD.