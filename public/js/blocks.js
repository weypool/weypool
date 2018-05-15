$(function() {
  window.Blocks = {}
  let rawBlocks = ""

  Wae.getBlocks()

  Blocks.main = function(blocks) {
    rawBlocks = blocks

    Blocks.setHistory()
  }

  Blocks.setHistory = function() {
    $.each(rawBlocks, function(index, block) {
      $('.block-history-table tbody').append([
          '<tr>',
            '<td><a href="'+block.infoLink+'" target="_blank">'+block.blockHeight+'</a></td>',
            '<td>'+block.created+'</td>',
            '<td>'+Math.round(block.confirmationProgress * 100)+'%</td>',
            '<td>'+Math.round(block.effort * 100)+'%</td>',
            '<td>'+block.reward+'</td>',
            '<td>'+Wae.hashFormat(block.networkDifficulty, 0, "")+'</td>',
          '</tr>'
        ].join(''))
    })
  }

})