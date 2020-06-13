const mongoose = require('mongoose');
const properties = require('../../config/properties');

// call the database connectivity function
module.exports = mongoose.connect(properties.DB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
