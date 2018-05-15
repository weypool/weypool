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
    $('.our-hashrate').html(Wae.hashFormat(rawPool.pool.poolStats.poolHashrate, 0))
    $('.queens-hashrate').html(Wae.hashFormat(rawPool.pool.networkStats.networkHashrate, 0))
    $('.difficulty').html(Wae.hashFormat(rawPool.pool.networkStats.networkDifficulty, 0, ""))
  }

  Pool.setTopDiggers = function() {
    $.each(rawPool.pool.topMiners, function(index, miner) {
      $('.top-diggers-table tbody').append([
          '<tr>',
            '<td>'+miner.miner+'</td>',
            '<td>'+Wae.hashFormat(miner.hashrate, 0)+'</td>',
            '<td>'+Wae.hashFormat(miner.sharesPerSecond, 0, 's')+'</td>',
          '</tr>'
        ].join(''))
    })
  }

  Pool.setRecentHashRate = function(performance) {
    let stats = performance.stats
    let hash = ['Our Hashrate']
    let time = ['time']

    $.each(stats, function(index, stat) {
      hash.push(stat.poolHashrate)
      time.push(new Date(stat.created))
    })

    let hashData = {
        x: 'time',
        xFormat: '%Y-%m-%d %H:%M:%S',
        columns: [
            time,
            hash
        ]
    }

    let c3LineChart = c3.generate({
      bindto: '#c3-recent-hash-rate',
      data: hashData,
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            fit: true,
            format: '%H:%M:%S'
          }
        },
        y: {
          tick: {
            format: function (d) {
              return Wae.hashFormat(d, 0)
            }
          }
        }
      }
    })
  }

})