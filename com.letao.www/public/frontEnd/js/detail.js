$(function () {
  var url = new URLSearchParams(window.location.search)
  var URLParams = url.get('id')
  //将数据渲染在页面上
  getDetailData(URLParams)


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

//