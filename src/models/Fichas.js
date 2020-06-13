const mongoose = require('mongoose');

const { Schema } = mongoose;


const fichasSchema = new Schema({
  id_user: {
    unique: true,
    type: String,
    required: true,
  },
  ficha: [{ type: Schema.Types.ObjectId, ref: 'Caracteristicas' }],
});

// Export the model
module.exports = mongoose.model('Fichas', fichasSchema);
