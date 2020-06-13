const express = require('express');

const router = express.Router();
const passport = require('passport');
const properties = require('../../config/properties');
const helper = require('../helper');

router.get('/', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord', {
  failureRedirect: '/forbidden',
  successRedirect: `${properties.URL_FRONT}/dashboard`,
}), (req, res) => {
  console.log(req.params);
  console.log(req.user);
  res.send(req.user);
});

router.get('/login', helper.isAuthorizedFront, (req, res, next) => res.send(req.user));


// s%3A9tJGaNgaYF8es-vW9_B4hh-jcikY8lXx.Dp6Oe2KVvV1sQ7DhT964gxPv1G%2FW2TkyN%2FrzqNNFKWw
module.exports = router;
