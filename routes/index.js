const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/pool')
});

router.get('/dashboard', function(req, res, next) {
  res.render('pages/dashboard')
});

router.get('/blocks', function(req, res, next) {
  res.render('pages/blocks')
});

router.get('/payments', function(req, res, next) {
  res.render('pages/payments')
});

router.get('/getting-started', function(req, res, next) {
  res.render('pages/getting_started')
});

router.get('/faq', function(req, res, next) {
  res.render('pages/faq')
});

module.exports = router;