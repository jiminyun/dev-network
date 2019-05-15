const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const config = require("config");

const s3 = new aws.S3({
  accessKeyId: config.get("accessKeyId"),
  secretAccessKey: config.get("secretAccessKey"),
  region: "ap-northeast-1"
});

const multerImage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "j-profile/dev-profile"
  })
});

// const uploadAvatar = multerImage.single("avatar");
// const uploadFiles = multerImage.single("thumbnail");

//module.exports = uploadAvatar;
module.exports = multerImage;
