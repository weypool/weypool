const express = require('express')
const axios = require('axios')
const router = express.Router()

let API_HOST = "https://miningcore-usa-00.weypool.com/api"

// Pools
router.get('/pools', function(req, res, next) {
  axios.get(API_HOST+'/pools')
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    res.json({error: error})
  });  
});

// Pool by ID
router.get('/pools/:poolID', function(req, res, next) {
  axios.get(API_HOST+'/pools/'+req.params.poolID)
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    res.json({error: error})
  });  
});

// Pool performance
router.get('/pools/:poolID/performance', function(req, res, next) {
  axios.get(API_HOST+'/pools/'+req.params.poolID+'/performance')
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    res.json({error: error})
  });  
});

// Pool blocks
router.get('/pools/:poolID/blocks/:page/:pageSize', function(req, res, next) {
  axios.get(API_HOST+'/pools/'+req.params.poolID+'/blocks', {
    params: {
      page: req.params.page,
      pageSize: req.params.pageSize
    }
  })
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    res.json({error: error})
  });  
});

// Pool payments
router.get('/pools/:poolID/payments/:page/:pageSize', function(req, res, next) {
  axios.get(API_HOST+'/pools/'+req.params.poolID+'/payments', {
    params: {
      page: req.params.page,
      pageSize: req.params.pageSize
    }
  })
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    res.json({error: error})
  });  
});

// Get miner by address
router.get('/pools/:poolID/miners/:address', function(req, res, next) {
  axios.get(API_HOST+'/pools/'+req.params.poolID+'/miners/'+req.params.address)
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    res.json({error: error})
  });  
});

// Get miner payment
router.get('/pools/:poolID/miners/:address/payments', function(req, res, next) {
  axios.get(API_HOST+'/pools/'+req.params.poolID+'/miners/'+req.params.address+'/payments')
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    res.json({error: error})
  });  
});

// Get miner performance
router.get('/pools/:poolID/miners/:address/performance', function(req, res, next) {
  axios.get(API_HOST+'/pools/'+req.params.poolID+'/miners/'+req.params.address+'/performance')
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    res.json({error: error})
  });  
});

module.exports = router