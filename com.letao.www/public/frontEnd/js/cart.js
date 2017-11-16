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
  
  getCartData(data)



})



//获取页面数据并且渲染到页面的函数
var value = ''
var getCartData = function (data) {
  $.ajax({
    url: '/cart/queryCart',
    type: 'get',
    // data: data,
    success: function (data) {
      
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
      console.log(1)
      var oldContent = $('#cart_box').html()
      console.log(oldContent)
      window.localStorage.setItem('cartContent', oldContent)
      
      
      
    }
  })



}