$(function () {
  //将localstrage本地存储的数据渲染到页面上
  var html = window.localStorage.getItem('ltSearchResult')
  $('.search-result-list').html(html)

  //
  $('.search-result-list').on('singleTap', '.item', function () {
    var id = $(this).data('id')
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
        console.log(data)
        var detailData = template('templateOne', data)
        // console.log(detailData)
        window.localStorage.setItem('detailData', detailData)
        window.location.href = '/frontEnd/detail.html'


      }
    })
  })



})