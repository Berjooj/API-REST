var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Olá mundo' });
});

/* GET new page. */
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Cadastro' });
});

/* POST new page. */
router.post('/new', function(req, res, next) {
  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  res.redirect("/?nome=" + nome);
});

module.exports = router;
