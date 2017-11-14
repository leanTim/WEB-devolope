$(function () {
  var detailHTML = window.localStorage.getItem('detailData')
  var productId = $('.slider-box').data('id')
  console.log(productId)
  $('.lt-detail').html(detailHTML)

  $('.add-cart').on('singleTap', function () {
    $.ajax({
      url: ' /cart/addCart',
      type: 'post',
      data: {
        
      }
    })


  })

})