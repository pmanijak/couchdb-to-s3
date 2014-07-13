couchdb-to-s3
===========
Copy your CouchDB database files to Amazon's S3 service.

    npm install couchdb-to-s3

Usage
-----------
``` javascript
var copy = require('couchdb-to-S3');

var db = {
    url: "http://localhost:5984",
    name: "the name of your database"
};

var aws = {
    accessKeyId: <aws_access_key_id>,
    secretAccessKey: <aws_secret_access_key>,
    bucket: "your S3 bucket",
};

copy(db, aws, function (err, body) {
    // ...
});
```

Description
-------------
Copies the .couch file of your local database to an S3 bucket.

Uses [knox](https://www.npmjs.org/package/knox) and 
[nano](https://www.npmjs.org/package/nano).

For a command-line utility that uses this module, see 
[backup-couchdb-to-s3](https://www.npmjs.org/package/backup-couchdb-to-s3).

License
-------
BSD.