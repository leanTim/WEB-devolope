$(function () {
  var url = new URLSearchParams(window.location.search)
  var productId = url.get('productId')
  var size = url.get('size')
  var num = url.get('num')
  console.log(productId, size, num)
  var data = {}
  data.productId = productId
  data.size = size
  data.num = num
  //调用渲染页面的函数
  
  getCartData()

  //删除功能
  deleteProduct()

})



//获取页面数据并且渲染到页面的函数
var value = ''
var getCartData = function () {
  $.ajax({
    url: '/cart/queryCart',
    type: 'get',
    // data: data,
    success: function (data) {
      // console.log(data)
      var result = data[data.length - 1]
      // console.log(result)
      //data 是一个数组，数组中的最后一条元素是需要渲染到页面中的元素
      var html = template('template-one', result)
      // var oldCartData = window.localStorage.getItem('cartContent')
      // oldCartData += html

      // var ulContent = window.localStorage.setItem('cartContent', oldCartData)
      // // $('#cart_box').append(html)
      // var cartContent = window.localStorage.getItem('cartContent')
      // console.log(cartContent)
      // $('#cart_box').append(cartContent)
      var cartContent = window.localStorage.getItem('cartContent')
      $('#cart_box').append(cartContent)

      $('#cart_box').append(html)


    },
    complete: function () {
      // console.log(1)
      var oldContent = $('#cart_box').html()
      // console.log(oldContent)
      window.localStorage.setItem('cartContent', oldContent)
      
      
      
    }
  })



}

//删除功能
var deleteProduct = function () {
  $('#cart_box').on('singleTap', '.mui-btn-red', function () {
    var id = $('#cart_box').find('.mui-btn-red').data('id')
    
    $.ajax({
      url: ' /cart/deleteCart',
      type: 'get',
      data: {id: id},
      success: function (data) {
        if (data.success) {
          getCartData()
        }
      } 
    })
  })



}