$(function() {

  window.Wae = {}

  Wae.main = function() {
    // First time :)
    // console.log("hello")
  }

  Wae.getPool = function() {
    axios.get("/api/pools/wae")
    .then(function (response) {
      Pool.main(response.data)
    })
    .catch(function (err) {
      console.log(err)
    })
  }

  Wae.getPoolPerformance = function() {
    axios.get("/api/pools/wae/performance")
    .then(function (response) {
      Pool.setRecentHashRate(response.data)
    })
    .catch(function (err) {
      console.log(err)
    })
  }

  Wae.getBlocks = function() {
    axios.get("/api/pools/wae/blocks/0/15")
    .then(function (response) {
      Blocks.main(response.data)
    })
    .catch(function (err) {
      console.log(err)
    })
  }

  Wae.getPayments = function() {
    axios.get("/api/pools/wae/payments/0/15")
    .then(function (response) {
      Payments.main(response.data)
    })
    .catch(function (err) {
      console.log(err)
    })
  }

  Wae.hashFormat = function(hash, decimal, unit="H/s", symbolT=true) {
    if (hash === 0) {
        return '0 ' + unit
    } else {
        var si = [
            { hash: 1e-6, symbol: "μ" },
            { hash: 1e-3, symbol: "m" },
            { hash: 1, symbol: "" },
            { hash: 1e3, symbol: "k" },
            { hash: 1e6, symbol: "M" },
            { hash: 1e9, symbol: "G" },
            { hash: 1e12, symbol: "T" },
            { hash: 1e15, symbol: "P" },
            { hash: 1e18, symbol: "E" },
            { hash: 1e21, symbol: "Z" },
            { hash: 1e24, symbol: "Y" },
        ]
        for (var i = si.length - 1; i > 0; i--) {
            if (hash >= si[i].hash) {
                break
            }
        }
        if (symbolT) {
          return (hash / si[i].hash).toFixed(decimal).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + ' ' + si[i].symbol + unit
        } else {
          return (hash / si[i].hash).toFixed(decimal).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1")  
        }
        
    }
  }
})