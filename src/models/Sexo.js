const mongoose = require('mongoose');

const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const sexoSchema = new Schema({
  id_sexo: {
    type: Number,
  },
  nome: {
    type: String,
    required: true,
  },
});

// Export the model
sexoSchema.plugin(AutoIncrement, { inc_field: 'id_sexo' });
// mongoose.model("Genero", generoSchema).counterReset('id_genero', function (err) {

// });


module.exports = mongoose.model('Sexo', sexoSchema);
