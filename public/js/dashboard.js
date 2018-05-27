$(function() {
  window.Dashboard = {}
  let rawDashboard = ""
  let totalHashrate = 0

  Dashboard.main = function() {
    // first time

    if (localStorage.getItem('worker-address')) {
      // has not ben set
      $(".worker-address").val(localStorage.getItem('worker-address'))

      Wae.getMiner(localStorage.getItem('worker-address'))
      .then(function (response) {
        Dashboard.setMinerData(response.data)
      })

      Wae.getMinerPayments(localStorage.getItem('worker-address'))
      .then(function (response) {
        Dashboard.setMinerPayments(response.data)
      })

      // flip buttons
      $('.track-worker').hide()
      $('.reset-dashboard').show()
    }

    Dashboard.inputHawk()
  }

  Dashboard.inputHawk = function() {
    $(".track-worker").click(function() {
      if ($(".worker-address").val().length != 0) {
        localStorage.setItem('worker-address', $(".worker-address").val())
        Dashboard.getMiner($(".worker-address").val())
        
        // flip buttons
        $('.track-worker').hide()
        $('.reset-dashboard').show()
      }
    });

    $(".reset-dashboard").click(function() {

      $(".worker-address").val("")

      // flip buttons
      $('.reset-dashboard').hide()
      $('.track-worker').show()

      localStorage.removeItem('worker-address')
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

  Dashboard.setMinerData = function(data) {
    $('.miner-pending-shares').html(Wae.hashFormat(data.pendingShares, 0, 'S', false))
    $('.miner-total-earning').html(data.totalPaid)
    $('.miner-last-payment').html(moment(Date.parse(data.lastPayment)).fromNow()) // .format("MM/DD/YYYY")

    if (data.hasOwnProperty('performance')) {
      $('.appear-hh-worker').hide()
      Dashboard.setWorkers(data.performance.workers)
    } else {
      $('.appear-hh-worker').html("No active worker")
    }    
  }

  Dashboard.setMinerPayments = function(payments) {
    if (payments.length == 0) {
      $('.appear-hh-payments').html("No payments have been made")
    } else {
      $('.appear-hh-payments').hide()

      $.each(payments, function(index, payment) {
        $('.miner-payments-table tbody').append([
            '<tr>',
              '<td>'+payment.created+'</td>',
              '<td><a href="'+payment.addressInfoLink+'" target="_blank">'+payment.address+'</a></td>',
              '<td><a href="'+payment.transactionInfoLink+'" target="_blank">'+payment.amount+'</a></td>',
            '</tr>'
          ].join(''))
      })
    }
    
  }

  Dashboard.main()
})