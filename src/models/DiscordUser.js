const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  id_user: { type: String, required: true },
});

const DiscordUser = module.exports = mongoose.model('User', userSchema);
