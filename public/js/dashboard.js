$(function() {
  window.Dashboard = {}
  let rawDashboard = ""

  

  Dashboard.main = function() {
    // first time

    Dashboard.getMiner()
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
    })
  }

  Dashboard.setMinerDate = function(data) {
    $('.miner-pending-shares').html(Wae.hashFormat(data.pendingShares, 0, 'S', false))
    $('.miner-total-earning').html(data.totalPaid)
    $('.miner-last-payment').html(data.lastPayment)

    Dashboard.setWorkers(data.performance.workers)
  }

  Dashboard.getMiner = function() {
    axios.get("https://miningcore-usa-00.weypool.com/api/pools/wae/miners/KdJxUVKS3vNBdL3JR8WUJPvf9hzvnwB4NX")
    .then(function (response) {
      Dashboard.setMinerDate(response.data)
    })
    .catch(function (err) {
      console.log(err)
    });
  }

  // Payments.setHistory = function() {
  //   $.each(rawPayments, function(index, payment) {
  //     $('.payments-history-table tbody').append([
  //         '<tr>',
  //           '<td>'+payment.created+'</td>',
  //           '<td><a href="'+payment.addressInfoLink+'" target="_blank">'+payment.address+'</a></td>',
  //           '<td><a href="'+payment.transactionInfoLink+'" target="_blank">'+payment.amount+'</a></td>',
  //         '</tr>'
  //       ].join(''))
  //   })
  // }

  Dashboard.main()

})