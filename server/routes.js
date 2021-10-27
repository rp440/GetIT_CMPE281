var express = require("express");
var router = express.Router();
var aws = require("aws-sdk"); //change aws to AWS
var multer = require("multer");
var multerS3 = require("multer-s3");
var registerController = require("./controller/register");
var authenticateController = require("./controller/authentication");
var awsCloudFront =require("aws-cloudfront-sign")

aws.config.update({
  region: "us-east-1",
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

s3 = new aws.S3({
  apiVersion: "2006-03-01",
});

var bucketParams = {
  Bucket: "filesbuk",
};

router.get("/", (req, res) => {});

/* route to handle login and registration */
router.post("/register", registerController.register);
router.post("/authenticate", authenticateController.authenticate);

//Get filenames
router.get("/getContent/:uname", (req, res) => {
  var params = { ...bucketParams};
  if (req.params["uname"] == "allusers"){ //admin
    s3.listObjects(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        let files = [];
        data.Contents.map((k, i) => {
          if (k.Key != folderName) {
            files.push(k);
          }
        });
        res.json(files);
      }
    });
  }  else {
  var folderName = req.params["uname"] + "/";
  var params = { ...bucketParams, Prefix: folderName };
  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
      let files = [];
      data.Contents.map((k, i) => {
        if (k.Key != folderName) {
          k.Key = k.Key.replace(folderName, "");
          files.push(k);
        }
      });
      res.json(files);
    }
  });
}
});

// for upload
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketParams.Bucket,
    key: function (req, file, cb) {
      cb(null, req.params.uname + "/" + file.originalname); //use Date.now() for unique file keys
    },
  }),
});
router.post("/uploadFile/:uname", upload.any(), function (req, res, next) {
  res.status(200).json({
    success: true,
  });
});


//to get filename for download
function getFileLink(filename) {
  return new Promise(function (resolve, reject) {
    var options = {
      keypairId: process.env.CLOUDFRONT_ACCESS_KEY_ID,
      privateKeyPath: process.env.CLOUDFRONT_PRIVATE_KEY_PATH,
    };
    var signedUrl = awsCloudFront.getSignedUrl(
      process.env.CLOUDFRONT_URL + "/" + filename,
      options
    );
    console.log(signedUrl);
    resolve(signedUrl);
  });
}

//download
router.get("/downloadFile/:uname/:fileName", async function (req, res) {
  console.log("in get");
  if (req.params["uname"] == "allusers") //admin
  {
    var file = await getFileLink(req.params.fileName);
    console.log("all users download")
    console.log(file);
    res.send(file);
    res.end();
  }
  else {
  var file = await getFileLink(req.params.uname + "/" + req.params.fileName);
  console.log(file);
  res.send(file);
  res.end();
}
});

//for delete
router.get("/deleteFile/:uname/:fileName", function (req, res) {
  // console.log("delete node 1");
  console.log(req);
  if (req.params["uname"] == "allusers") //admin
  {
    var params = {
      Bucket: "filesbuk",
      Key:req.params.fileName,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) {
        // console.log("node delete ===")
        console.log(err);
      } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(data);
      }
    })
  }
  else {
    var params = {
      Bucket: "filesbuk",
      Key: req.params.uname + "/" + req.params.fileName,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log("node delete ===")
        console.log(err);
      } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(data);
      }
  });
}
});


module.exports = router;
