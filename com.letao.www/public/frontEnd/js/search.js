$(function () {
  //获取searchList的数据并且展示在页面上
  var liArr = []
  var getSearchResult = function (page) {
    $('.search-box').on('singleTap', 'span', function () {
      var proName = $('.search-box input').val()
      // console.log(proName)
      $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
          page: page || 1,
          pageSize: 5,
          proName: proName
        },
        success: function (data) {
          var html = template('template-one', data)
          //将searchList的数据设置为本地存储的内容
          window.localStorage.setItem('ltSearchResult', html)
          window.location.href = '/frontEnd/searchList.html'

          console.log(data)
          liArr.push(proName)
          // console.log(liArr)
          window.localStorage.setItem('searchHistory', liArr)
          var ajaxRes = window.localStorage.getItem('searchHistory')
          var ajaxArr = ajaxRes.split(',')
          // console.log(ajaxArr)
          getUlContent(ajaxArr)
          
        }
      })
  

    })
  }


  var liShow = window.localStorage.getItem('searchHistory')
  // console.log(liShow)
  var resultArr = liShow.split(',')

  var getUlContent = function (resultArr) {
    if (resultArr) {
      
    var ulContent = ''
    resultArr.forEach(function (item, i) {
      // $('.search-history-list').html(')
      // console.log(item)
      ulContent += '<li> \
      <span class="mui-pull-left">'+ item +'</span> \
      <i class="fa fa-times mui-pull-right"></i> \
      </li>'
    })
    $('.search-history-list').html(ulContent)
    } else {
      $('.search-history-list').html('') 
    }
    
  }
  getSearchResult()
  getUlContent(resultArr)
  //点击删除功能
  $('.search-history-list').on('singleTap', 'i', function () {
    var text = $(this).siblings().text()
    var liShow = window.localStorage.getItem('searchHistory')
    // console.log(liShow)
    var resultArr = liShow.split(',')



    var index = resultArr.indexOf(text)
    // console.log(resultArr)
    resultArr.splice(index, 1)
    // console.log(resultArr)
    window.localStorage.setItem('searchHistory', resultArr)
    // console.log(1)
    changeRes = window.localStorage.getItem('searchHistory')
    // console.log(liShow)
    changeArr = changeRes.split(',')
    // console.log($(this).siblings().text())
    getUlContent(changeArr)

  })

  //添加清除按钮的功能
  $('.clear').on('singleTap', function () {
    var clearArr = []
    window.localStorage.setItem('searchHistory', clearArr)
    // console.log(1)
    clearRes = window.localStorage.getItem('searchHistory')
    // console.log(liShow)
    
    // console.log($(this).siblings().text())
    getUlContent(clearArr)
  })





})