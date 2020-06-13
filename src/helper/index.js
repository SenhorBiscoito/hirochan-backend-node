const aws = require('aws-sdk');
const properties = require('../../config/properties');

module.exports = {
  isAuthorized: function isAuthorized(req, res, next) {
    if (req.user) {
      console.log('User is logged in');
      next();
    } else {
      console.log('User is not logged in');
      res.redirect('/forbidden');
    }
  },
  isAuthorizedFront: function isAuthorizedFront(req, res, next) {
    if (req.user) {
      console.log('User is logged in');
      next();
    } else {
      console.log('User is not logged in');
      return res.status(403).send('Não autorizado maninho');
    }
  },
  deleteS3Object: function deleteS3Object(Bucket, Key) {
    aws.config.update({
      accessKeyId: properties.AWS.ACCESS_KEY_ID,
      secretAccessKey: properties.AWS.SECRET_ACCESS_KEY,
      region: 'sa-east-1',
    });

    const s3 = new aws.S3();
    const params = { Bucket, Key };

    s3.deleteObject(params, (err, data) => {
      if (err) console.log(err, err.stack); // error
      else console.log('deletada com sucesso', data); // deleted
    });
  },
};
