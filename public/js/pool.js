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
    let hash = ['Pool Hashrate']
    let time = ['time']
    let diggers = ['Diggers']

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
          },
          tick: {
            format: function (d) {
              console.log(d)
              if (''+d+''.includes(".")) {
                return Wae.hashFormat(d, 0)
              } else {
                return d
              }
            }
          }
        },
        y2: {
          show: true,
          min: 0,
          label: {
            text: 'Diggers',
            position: 'outer-middle'
          }
        }
      }
    })
  }

})