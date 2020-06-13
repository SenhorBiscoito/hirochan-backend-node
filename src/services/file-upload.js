const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mime = require('mime');
const properties = require('../../config/properties');


aws.config.update({
  accessKeyId: properties.AWS.ACCESS_KEY_ID,
  secretAccessKey: properties.AWS.SECRET_ACCESS_KEY,
  region: 'sa-east-1',
});

const s3 = new aws.S3({
  apiVersion: '2006-03-01',
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'hirochan-fichas',

    key: async (req, file, cb) => {
      const { id_user, ficha } = req.body;

      console.log(req.body);
      const pathImage = `image/${id_user}/${ficha}.${mime.getExtension(file.mimetype)}`;

      if (file.fieldname == 'image') {
        cb(null, pathImage);
      }
    },
  }),
  limits: { fileSize: 1000000 }, // In bytes: 2000000 bytes = 3 MB
});

module.exports = { upload };
