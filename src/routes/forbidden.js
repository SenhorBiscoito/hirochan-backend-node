const express = require('express');

const router = express.Router();

router.get('/forbidden', (req, res) => {
  res.status(403).send('Você não tem autorização');
});


module.exports = router;
