const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

const Event = require('../models/Event');
const Actor = require('../models/Actor');
const Repo = require('../models/Repo');

Event.destroy({
  where: {},
  truncate: true,
});
Actor.destroy({
  where: {},
  truncate: true,
});
Repo.destroy({
  where: {},
  truncate: true,
});


module.exports = router;
