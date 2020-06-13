const mongoose = require('mongoose');

const { Schema } = mongoose;

const caracteristicasSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },
  ficha: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    unique: false,
    required: true,
  },
  idade: {
    type: Number,
    unique: false,
    required: true,
    min: 10,
    max: 40,
  },
  gosta_de: {
    type: String,
    unique: false,
    required: true,
    maxlength: 500,
  },
  nao_gosta_de: {
    type: String,
    unique: false,
    required: true,
    maxlength: 500,
  },
  historia: {
    type: String,
    unique: false,
    required: true,
    maxlength: 500,
  },
  personalidade: {
    type: String,
    unique: false,
    required: true,
    maxlength: 500,
  },
  poderes: {
    type: String,
    unique: false,
    required: true,
    maxlength: 500,
  },

  image: {
    type: String,
    unique: false,
  },
  aws_key: {
    type: String,
    unique: true,
    required: true,
  },
  genero: [{ type: Schema.Types.ObjectId, ref: 'Genero' }], // aqui é feita a referencia entre os documentos
  sexo: [{ type: Schema.Types.ObjectId, ref: 'Sexo' }], // aqui é feita a referencia entre os documentos
});

module.exports = mongoose.model('Caracteristicas', caracteristicasSchema);
