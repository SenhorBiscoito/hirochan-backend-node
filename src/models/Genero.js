const mongoose = require('mongoose');

const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const generoSchema = new Schema({
  id_genero: {
    // unique: true,
    type: Number,
  },
  nome: {
    type: String,
    required: true,
  },
});

// Export the model
generoSchema.plugin(AutoIncrement, { inc_field: 'id_genero' });
// mongoose.model("Genero", generoSchema).counterReset('id_genero', function (err) {

// });


module.exports = mongoose.model('Genero', generoSchema);
