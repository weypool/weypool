$(function() {
  window.Dashboard = {}
  let rawDashboard = ""
  let totalHashrate = 0

  

  Dashboard.main = function() {
    // first time

    if (localStorage.getItem('worker-address')) {
      // has not ben set
      console.log(localStorage.getItem('worker-address'))
      Dashboard.getMiner(localStorage.getItem('worker-address'))
      // $('.set-worker').hide()
    }

    Dashboard.inputHawk()
  }

  Dashboard.inputHawk = function() {
    $(".track-worker").click(function() {
      if ($(".worker-address").val().length != 0) {
        localStorage.setItem('worker-address', $(".worker-address").val())
        Dashboard.getMiner($(".worker-address").val())
        // $('.set-worker').hide()
      }
    });
  }

  Dashboard.setWorkers = function(workers) {
    $.each(workers, function(index, worker) {
      $('.miner-worker-table tbody').append([
          '<tr>',
            '<td>'+index+'</td>',
            '<td>'+Wae.hashFormat(worker.hashrate, 0)+'</td>',
            '<td>'+Wae.hashFormat(worker.sharesPerSecond, 0, 'S/s')+'</td>',
          '</tr>'
        ].join(''))

      totalHashrate += worker.hashrate
    })

    $('.miner-my-hashrate').html(Wae.hashFormat(totalHashrate, 0))
  }

  Dashboard.setMinerDate = function(data) {
    $('.miner-pending-shares').html(Wae.hashFormat(data.pendingShares, 0, 'S', false))
    $('.miner-total-earning').html(data.totalPaid)
    $('.miner-last-payment').html(data.lastPayment)

    Dashboard.setWorkers(data.performance.workers)
  }

  Dashboard.getMiner = function(address) {
    axios.get("https://miningcore-usa-00.weypool.com/api/pools/wae/miners/"+address)
    .then(function (response) {
      Dashboard.setMinerDate(response.data)
    })
    .catch(function (err) {
      console.log(err)
    });
  }


  Dashboard.main()

})