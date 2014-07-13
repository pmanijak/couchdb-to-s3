couchdb-to-s3
===========
Copy your CouchDB database files to Amazon's S3 service.

    npm install couchdb-to-s3

Usage
-----------

    var toS3 = require('couchdb-to-S3');
    var db = {
        url: "http://localhost:5984",
        name: "the name of your database"
    };

    var aws = {
        accessKeyId: <aws_access_key_id>,
        secretAccessKey: <aws_secret_access_key>,
        bucket: "your S3 bucket",
    };

    toS3(db, aws, function (err, body) {
        // ...
    });

License
-------
BSD.