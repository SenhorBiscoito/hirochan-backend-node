const express = require('express');

const router = express.Router();
const Genero = require('../models/Genero');


router.get('/', (req, res) => {
  // Genero
  Genero.find().then((doc) => {
    res.json(doc);
  });
});

router.post('/', (req, res) => {
  const { nome } = req.body;
  const item = {
    nome,
  };

  const data = new Genero(item);
  try {
    data.save();
    res.json(data);
  } catch (e) {
    console.log(e);
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { nome } = req.body;
  const item = {
    nome,
  };
  Genero.findByIdAndUpdate(
    id,
    item,
    { new: true },
    // the callback function
    (err, todo) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.json(todo);
    },
  );
});


module.exports = router;
