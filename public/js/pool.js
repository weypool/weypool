$(function() {
  window.Pool = {}
  let rawPool = ""

  Wae.getPool()
  Wae.getPoolPerformance()

  Pool.main = function(pool) {
    rawPool = pool

    Pool.setTopStats()
    Pool.setTopDiggers()
  }

  Pool.setTopStats = function() {
    $('.diggers').html(rawPool.pool.poolStats.connectedMiners)
    $('.our-hashrate').html(Wae.hashFormat(rawPool.pool.poolStats.poolHashrate, 2))
    $('.queens-hashrate').html(Wae.hashFormat(rawPool.pool.networkStats.networkHashrate, 2))
    $('.difficulty').html(Wae.hashFormat(rawPool.pool.networkStats.networkDifficulty, 0, ""))

    $('.pool-algorithm').html(rawPool.pool.coin.algorithm)
    $('.pool-payment').html(rawPool.pool.paymentProcessing.payoutScheme)
    $('.pool-fee').html(rawPool.pool.poolFeePercent+'%')
    $('.pool-minimun-payout').html(rawPool.pool.paymentProcessing.minimumPayment + ' ' + rawPool.pool.coin.type)
  }

  Pool.setTopDiggers = function() {
    $.each(rawPool.pool.topMiners, function(index, miner) {
      $('.top-diggers-table tbody').append([
          '<tr>',
            '<td>'+miner.miner+'</td>',
            '<td>'+Wae.hashFormat(miner.hashrate, 0)+'</td>',
            '<td>'+Wae.hashFormat(miner.sharesPerSecond, 0, 'S/s')+'</td>',
          '</tr>'
        ].join(''))
    })
  }

  Pool.setRecentHashRate = function(performance) {
    let stats = performance.stats
    let hash = ['Pool Hashrate']
    let time = ['time']
    let diggers = ['Miners']

    $.each(stats, function(index, stat) {
      hash.push(stat.poolHashrate)
      time.push(new Date(stat.created))
      diggers.push(stat.connectedMiners)
    })

    let c3LineChart = c3.generate({
      bindto: '#c3-recent-hash-rate',
      data: {
        x: 'time',
        xFormat: '%Y-%m-%d %H:%M:%S',
        columns: [
            time,
            hash,
            diggers
        ],
        axes: {
          hash: 'y',
          diggers: 'y2'
        }
      },
      color: {
        pattern: ['#db2d94', '#fdd1ac']
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            fit: true,
            format: '%H:%M:%S'
          }
        },
        y: {
          label: {
            text: 'Pool Hashrate',
            position: 'outer-middle'
          }
        },
        y2: {
          show: true,
          min: 0,
          label: {
            text: 'Miners',
            position: 'outer-middle'
          }
        }
      }
    })
  }

})