$(function() {
  window.Payments = {}
  let rawPayments = ""

  Wae.getPayments()

  Payments.main = function(payments) {
    rawPayments = payments

    Payments.setHistory()
  }

  Payments.setHistory = function() {
    $.each(rawPayments, function(index, payment) {
      $('.payments-history-table tbody').append([
          '<tr>',
            '<td>'+payment.created+'</td>',
            '<td><a href="'+payment.addressInfoLink+'" target="_blank">'+payment.address+'</a></td>',
            '<td><a href="'+payment.transactionInfoLink+'" target="_blank">'+payment.amount+'</a></td>',
          '</tr>'
        ].join(''))
    })
  }

})