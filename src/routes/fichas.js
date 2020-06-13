
const express = require('express');

// Models
const Fichas = require('../models/Fichas');
const Generos = require('../models/Genero');
const Sexos = require('../models/Sexo');
const Caracteristicas = require('../models/Caracteristicas');

const fileUpload = require('../services/file-upload.js');

const helper = require('../helper');

const router = express.Router();
router.get('/', async (req, res) => {
  // Fichas
  const ficha = await Fichas.find().populate({
    path: 'ficha',
    populate: [{
      path: 'sexo',
      model: 'Sexo',
    }, {
      path: 'genero',
      model: 'Genero',
    }],
  });

  if (ficha) {
    return res.json(ficha);
  }
});

router.get('/:id_user', async (req, res) => {
  const { id_user } = req.params;

  const ficha = await Fichas.find({ id_user }).populate({
    path: 'ficha',
    populate: [{
      path: 'sexo',
      model: 'Sexo',
    }, {
      path: 'genero',
      model: 'Genero',
    }],
  });

  if (ficha) {
    return res.json(ficha);
  }

  return res.status(404).send(`Ficha do usuário <@${id_user}> não encontrada`);
});

router.post('/', async (req, res) => {
  const image = fileUpload.upload.single('image');

  await image(req, res, async (err) => {
    if (err) {
      return res.status(404).end('Error uploading file.');
    }


    // // peganso valores do body
    let {
      ficha,
      id_sexo,
      id_genero,
      nome,
      gosta_de,
      historia,
      idade,
      nao_gosta_de,
      personalidade,
      poderes,
      id_user,
    } = req.body;
    id_sexo = Number(id_sexo);
    id_genero = Number(id_genero);

    // tratando os dados
    try {
      id_genero = parseInt(id_genero);
      id_sexo = parseInt(id_sexo);

      if (isNaN(id_genero)) {
        throw 'id_genero inválido';
      }

      if (isNaN(id_sexo)) {
        throw 'sexo inválido';
      }
    } catch (err) {
      helper.deleteS3Object('hirochan-fichas', req.file.key);
      return res.send(err);
    }

    const genero = await Generos.find({ id_genero });
    const sexo = await Sexos.find({ id_sexo });

    genero.length === 0 ? res.status(400).send('Genero não encontrado') : null;
    sexo.length === 0 ? res.status(400).send('Sexo não encontrado') : null;

    console.log('aaaa', req.file);
    const caracteristicaModel = {
      id_user,
      ficha,
      nome,
      gosta_de,
      historia,
      idade,
      nao_gosta_de,
      personalidade,
      poderes,
      genero,
      sexo,

    };


    if (req.file) {
      caracteristicaModel.image = req.file.location;
      caracteristicaModel.aws_key = req.file.key;
    }

    // CRIANDO UMA CARACTERISTICA
    const Caracteristica = new Caracteristicas(caracteristicaModel);
    const Ficha = new Fichas({
      ficha: Caracteristica,
      id_user,
    });

    // FICHA DO USUÁRIO
    const fichaObj = await Fichas.find({ id_user });

    // JÁ EXISTE USUÁRIO
    if (fichaObj.length > 0) {
      const caracteristicaObj = await Caracteristicas.find({ id_user, ficha });

      // NÃO EXISTE FICHA COM ESSE NOME
      if (caracteristicaObj.length === 0) {
        // CRIA FICHA E CARACTERISTICA
        try {
          const newCaracteristica = await Caracteristica.save();
          const Ficha = new Fichas(fichaObj[0]);

          Ficha.ficha.push(newCaracteristica);
          await Ficha.save();

          return res.json(Ficha);
        } catch (err) {
          console.log(err);
          helper.deleteS3Object('hirochan-fichas', req.file.key);
          return res.send(err);
        }
      }

      try {
        // ATUALIZA CARACTERISTICA QUE EXISTE
        const newCaracteristica = await Caracteristicas.findByIdAndUpdate(caracteristicaObj[0]._id, caracteristicaModel, { new: true });

        return res.json(newCaracteristica);
      } catch (err) {
        helper.deleteS3Object('hirochan-fichas', req.file.key);
        res.send(err);
      }
    }

    // USUÁRIO NÃO EXISTE CRIA A FICHA ENTÃO
    try {
      await Caracteristica.save();
      const newFicha = await Ficha.save();

      res.json(newFicha);
    } catch (e) {
      helper.deleteS3Object('hirochan-fichas', req.file.key);
      res.status(500).send(e);
    }
  });
});

// DELETAR
// DELETAR
router.delete('/', async (req, res) => {
  const { id_user, ficha } = req.body;

  const fichaObj = await Fichas.find({ id_user });

  if (fichaObj.length > 0) {
    if (fichaObj[0].ficha.length >= 1) {
      const caracteristicaObj = await Caracteristicas.find({ id_user, ficha });

      if (caracteristicaObj.length > 0) {
        const ficha_nome = caracteristicaObj[0].ficha;

        // DELETAR CARACTERISTICA
        try {
          const newFicha = await Fichas.findByIdAndUpdate(
            fichaObj[0].id,
            { $pullAll: { ficha: [caracteristicaObj[0].id] } },
            { new: true },
          );

          await Caracteristicas.findByIdAndDelete(caracteristicaObj[0].id);

          helper.deleteS3Object('hirochan-fichas', caracteristicaObj[0].aws_key);

          if (newFicha.ficha.length == 0) {
            await Fichas.findByIdAndDelete(fichaObj[0].id);
            helper.deleteS3Object('hirochan-fichas', caracteristicaObj[0].aws_key);

            return res.status(202).send('Você não possui mais nenhuma ficha');
          }

          return res.status(202).send(`A ficha "${ficha_nome}" foi deletada com sucesso`);
        } catch (err) {
          return res.send(err);
        }
      }

      return res.status(404).json({ message: `Não achei nenhuma ficha procurando por ${ficha}, olha direitinho se você digitou certo`, params: req.body });
    }
  } else {
    return res.status(404).send('Você ainda não possui nenhuma ficha');
  }
});

module.exports = router;
