const express = require('express');

const router = express.Router();
const Caracteristicas = require('../models/Caracteristicas');
const helper = require('../helper');

const upload = require('../services/file-upload.js');

router.get('/', (req, res) => {
  // Caracteristicas
  Caracteristicas.find().populate('sexo').populate('genero').then((doc) => {
    console.log(doc);
    res.json(doc);
  });
});

router.get('/:id_user', async (req, res) => {
  const { id_user } = req.params;
  const { ficha } = req.query;

  try {
    // TODAS AS FICHAS
    if (!ficha) {
      const Caracteristica = await Caracteristicas.find({ id_user }).populate('sexo').populate('genero');

      const newCaracteristica = Caracteristica.map((item) => ({
        ...item._doc, nome_genero: item.genero[0].nome, nome_sexo: item.sexo[0].nome,
      }));

      if (newCaracteristica.length > 0) {
        return res.json(newCaracteristica);
      }
      return res.send(Caracteristica);
    }
    // FICHA ESPECÍFICA
    const Caracteristica = await Caracteristicas.find({
      id_user, ficha: { $regex: new RegExp(`^${ficha}$`), $options: 'i' },
    }).populate('sexo').populate('genero');

    const newCaracteristica = Caracteristica.map((item) => ({
      ...item._doc, nome_genero: item.genero[0].nome, nome_sexo: item.sexo[0].nome,
    }));

    if (newCaracteristica.length > 0) {
      return res.json(newCaracteristica);
    }
    return res.send(`Você não tem uma ficha com o nome "${ficha}"`);
  } catch (e) {
    return res.send(e);
  }
});


router.put('/:id_user', async (req, res) => {
  const { id_user } = req.params;
  const { ficha } = req.query;

  console.log(id_user, ficha);
  // try {
  //     // TODAS AS FICHAS
  //     if (!ficha) {
  //         const Caracteristica = await Caracteristicas.find({ id_user }).populate("sexo").populate("genero");

  //         const newCaracteristica = Caracteristica.map(item => ({
  //             ...item._doc, nome_genero: item.genero[0].nome, nome_sexo: item.sexo[0].nome
  //         }))

  //         if (newCaracteristica.length > 0) {
  //             return res.json(newCaracteristica);
  //         } else {
  //             return res.send(`Você ainda não possui nenhuma ficha`)
  //         }
  //     }
  //     // FICHA ESPECÍFICA
  //     const Caracteristica = await Caracteristicas.find({
  //         id_user, "ficha": { $regex: new RegExp(`^${ficha}$`), $options: 'i' }
  //     }).populate("sexo").populate("genero");

  //     const newCaracteristica = Caracteristica.map(item => ({
  //         ...item._doc, nome_genero: item.genero[0].nome, nome_sexo: item.sexo[0].nome
  //     }))

  //     if (newCaracteristica.length > 0) {
  //         return res.json(newCaracteristica);
  //     } else {
  //         return res.send(`Você não tem uma ficha com o nome "${ficha}"`)
  //     }

  // } catch (e) {
  //     return res.send(e)
  // }
});

// deleta tudo e fds
router.delete('/delete', async (req, res) => {
  try {
    await Caracteristicas.deleteMany({});

    const response = {
      message: 'Caracteristicas successfully deleted',
      id: req.params.id,
    };
    return res.status(200).send(response);
  } catch (e) { res.send(e); }
});

module.exports = router;
