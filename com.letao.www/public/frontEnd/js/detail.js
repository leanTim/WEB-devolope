$(function () {
  var detailHTML = window.localStorage.getItem('detailData')
  //因为页面是动态加载的 不能直接获取到id 要通过委托的方式获取id
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