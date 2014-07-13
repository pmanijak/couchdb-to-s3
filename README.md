couch-to-s3
===========
Backup your CouchDB database files to Amazon's S3 service.

    npm install couch-to-s3

Usage
-----------
Install the module, and edit the config.json file:

    {
	    "dbUrl": "http://localhost:5984",
	    "dbName": "the name of your database",
	    "s3BucketName": "your S3 bucket",
	    "awsCredentialsPath": ".aws/credentials"
    }

Then from the prompt:

    npm start

This will save your local `database-name.couch` file to your S3 bucket, as `database-name-backup.couch`. 

AWS credentials
-------
As this is an early version of couch-to-s3, it doesn't support many configuration options. Right now, you'll need to create an AWS credentials file, like so:

    [default]
    aws_access_key_id = <access-key>
    aws_secret_access_key = <secret-access-key>

Setting up S3
--------
Setting up Amazon's S3 will be the most complicated part of running this script, and might take around 15 minutes if you're not familiar with the process. Amazon's walkthrough is here: [http://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example1.html](http://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example1.html)

### Turn on S3 versioning
Turning on versioning in your S3 bucket is recommended, as couch-to-s3 writes to the same file each time.

License
-------
BSD.