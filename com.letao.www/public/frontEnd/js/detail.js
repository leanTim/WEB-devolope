$(function () {
  var url = new URLSearchParams(window.location.search)
  var URLParams = url.get('id')
  //将数据渲染在页面上
  getDetailData(URLParams)

  //调用改变数量的函数
  changeCartNum()

  //调用点击尺码变色的函数
  changeSizeColor()


  //获取添加到购物车需要的参数
  // var procuctSize = $('.lt-detail').find('.now').text()
  // console.log(procuctSize)

  //添加到购物车
  addToCart()

})


//获取页面的数据并展示在页面上的函数
var getDetailData = function (id) {
  
  $.ajax({
    url: '/product/queryProductDetail',
    type: 'get',
    data: {
      id: id
    },
    success: function (data) {
      // console.log(data)
      var sizeArr = data.size.split('-')
      var largeSize = parseInt(sizeArr[1])
      var smallSize = parseInt(sizeArr[0])

      data.smallSize = smallSize
      data.largeSize = largeSize
      
      var detailData = template('templateOne', data)
      $('.lt-detail').html(detailData)

    }
  })
  

}


//设置改变添加到购物车商品数量的功能
var changeCartNum = function () {
  var currentNum = $('.lt-detail').find('.current-num').html()

  $('.lt-detail').on('singleTap', '.less-num', function () {
    currentNum--
    if (currentNum < 0) {
      currentNum = 0
    }
    $('.current-num').html(currentNum)
  })

  $('.lt-detail').on('singleTap', '.more-num', function () {
    currentNum++
    $('.current-num').html(currentNum)
    $('body').append('')
  })


}

//<button class="prompt-msg">最多购买五件哦</button>
//获取添加到购物车需要的参数
// var getNessParams = function (product) {
  
//   //获取点击选中的尺寸
//   $('.lt-detail').on('singleTap', '.size-box', function () { 
//     var size = $(this).text()
//     product.size = size
//   })
//   //获取商品数量
//   $('.lt-detail').on('singleTap', '.change-num', function () {
//     var num = $('.lt-detail').find('.current-num').text()
//     product.num = num
//   })

//   // return product

// }


//设置选择尺码点击按钮变色功能
var changeSizeColor = function () {
  $('.lt-detail').on('singleTap', '.size-box', function () {
    var _this = $(this)
    _this.siblings().removeClass('now')
    _this.toggleClass('now')

  })
}

//点击添加到购物车的功能函数
var addToCart = function () {
  $('.add-cart').on('singleTap', function () {
    //最终参数为对象
    var nessParams = {}
    //获取选择的储存
    var size = $('.lt-detail').find('.now').text()
    // 获取选择的数量
    var num = $('.lt-detail').find('.current-num').text()

    var id = $('.lt-detail').find('.current-num').data('id')
    // console.log(id)
    if (!size) {
      $('body').append('<button class="prompt-msg">请选择尺码</button>')
      window.setTimeout(function() {
        $('body').find('.prompt-msg').remove()
        // console.log(1)
      }, 2000)
      return false

    }

    if (num == 0) {
      $('body').append('<button class="prompt-msg">请选择数量</button>')

      window.setTimeout(function() {
        $('body').find('.prompt-msg').remove()
        // console.log(1)
      }, 2000)
      return false
    }

    nessParams.size = size
    nessParams.num = num
    nessParams.productId = id

    // var cartParams = $.serialize(nessParams)
    // console.log(cartParams)

    $.ajax({
      url: '/cart/addCart',
      type: 'post',
      data: nessParams,
      success: function (data) {
        console.log(data)
        //如果染回数据失败 则跳转到登录页面
        
        if (data.error) {
          //把当前页面的url当做 参数传给login，用来下次跳转回来
          var gobackURL = window.location.href
          console.log(gobackURL)
          window.location.href = '/frontEnd/user/login.html?gobackURL' + gobackURL
        } else {
          window.location.href = '/frontEnd/cart.html?productId=' + id + '&size=' + size + '&num=' + num
        }



      }
    })
    
    

  })



}
