$(function () {
  var flag = true
  var result = true
  //将localstrage本地存储的数据渲染到页面上
  // var html = window.localStorage.getItem('ltSearchResult')
  // $('.search-result-list').html(html)

  var url = new URLSearchParams(window.location.search)
  var URLParams = url.get('proName')
  getSearchResult(URLParams)



  //升序降序功能
  //默认price默认值为2 降序  price值为1 表示升序
  var priceReorder = function (proName) {
    var keyword = proName
    $('#price-reorder').on('singleTap', function() {
      var $this = $(this)
      $this.css({color: 'red'})
      //把销量的按钮回复原样
      $('#sell-reorder').css({color: '#666'})
      if (!$('#sell-reorder').children('i').hasClass('fa-angle-down')) {
        $('#sell-reorder').children('i').removeClass('fa-angle-up')
        $('#sell-reorder').children('i').addClass('fa-angle-down')
      }

      if (flag) {
        $this.children('i').toggleClass('fa-angle-down')
        $this.children('i').toggleClass('fa-angle-up')
        getSearchResult(keyword, 1, null)
        flag = false
        console.log(1)
      } else {
        $this.children('i').toggleClass('fa-angle-down')
        $this.children('i').toggleClass('fa-angle-up')
        getSearchResult(keyword, 2, null)
        flag = true
        console.log(2)
      }

    })


  }

  // 调用价格排序函数
  priceReorder(URLParams)


  //销量的增降序功能
  var sellReorder = function (proName) {
    var keyword = proName
    $('#sell-reorder').on('singleTap', function() {
      var $this = $(this)
      $this.css({color: 'red'})
      //把价格的按钮回复原样
      $('#price-reorder').css({color: '#666'})
      if (!$('#price-reorder').children('i').hasClass('fa-angle-down')) {
        $('#price-reorder').children('i').removeClass('fa-angle-up')
        $('#price-reorder').children('i').addClass('fa-angle-down')
      }
      

      if (result) {
        $this.children('i').toggleClass('fa-angle-down')
        $this.children('i').toggleClass('fa-angle-up')
        getSearchResult(keyword, null, 1)
        result = false
        console.log(1)
      } else {
        $this.children('i').toggleClass('fa-angle-down')
        $this.children('i').toggleClass('fa-angle-up')
        getSearchResult(keyword, null, 2)
        result = true
        console.log(2)
      }

    })

  }

  //调用销量的增降序功能的函数
  sellReorder(URLParams)


  //调用mui的下拉刷新插件
  mui.init({
    pullRefresh : {
      container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
        height:'50px',//可选,默认50px.下拉刷新控件的高度,
        range:'100px', //可选 默认100px,控件可下拉拖拽的范围
        offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
        auto: false,//可选,默认false.首次加载自动上拉刷新一次
        callback : function() {
          getSearchResult(URLParams)
        } 
      }
    }
  });






  //
  $('.search-result-list').on('singleTap', '.item', function () {
    var id = $(this).data('id')
    window.location.href = '/frontEnd/detail.html?id=' + id

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
 
      }
    })
    
  })



})


//从服务端获取数据并且渲染在页面上

var getSearchResult = function (proName, price, num, page) {
  // var proName = $('.search-box input').val()
  $.ajax({
    url: '/product/queryProduct',
    type: 'get',
    data: {
      page: page || 1,
      pageSize: 16,
      proName: proName,
      price: price || 2,
      num: num || 2
    },
    success: function (data) {
      var html = template('template-one', data)
      console.log(data)
      $('.search-result-list').html(html)

    }
  })
}

