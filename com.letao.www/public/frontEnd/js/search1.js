$(function () {
  //页面加载的时候
  // setSearchLocalData('nike')
  var dataArr = getSearchLocalData()
  if (dataArr.length === 0) {
    $('#no-search-result').show()
    $('#result-list').hide()
  } else {
    $('#no-search-result').hide()
    $('#result-list').show()
    ulContent()
  }
  
  //点击搜索 出现搜索记录
  $('.search-box').on('singleTap', 'span', function () {
    var value = $(this).siblings('input').val()
    setSearchLocalData(value)
    $('#no-search-result').hide()
    $('#result-list').show()
    ulContent()
    //展现搜索结果
    var proName = $('.search-box input').val()
    getSearchResult(proName)
  })

  //清除所有的记录
  $('#clear-all').on('singleTap', function () {
    deleteAll()
    $('#no-search-result').show()
    $('#result-list').hide()
  })

  //删除单条数据功能
  $('#search-ul').on('singleTap', 'i', function () {
    var dataOne = $(this).siblings('span').html()
    // console.log(dataOne)
    deleteOne(dataOne)
  })

  //点击搜索历史的每一条内容 实现搜索功能
  $('#search-ul').on('singleTap', 'li', function () {
    var liContent = $(this).children('span').text()
    // console.log(liContent)
    getSearchResult(liContent)
  })




  
})
  //先获取localStorage中本地存储的内容 本地存储的是json的数组
  var getSearchLocalData = function () {
    var localStorageData =  window.localStorage.getItem('searchHistory')
    return JSON.parse(localStorageData) || []
  }

  //设置本地存储的内容
  //value 是搜索框输入的值
  // getSearchLocalData()
  var setSearchLocalData = function (value) {
    var localStorageArr = getSearchLocalData()
    //遍历 为了去重
    localStorageArr.forEach(function (item, i) {
      if(value == item) {
        localStorageArr.splice(i, 1)
      }
    })
    localStorageArr.push(value)

    window.localStorage.setItem('searchHistory', JSON.stringify(localStorageArr))

  }

  //根据localStorage的值 生成模板引擎 渲染到页面上
  var ulContent = function () {
    var data = getSearchLocalData()
    
    var ulHTML = template('template-two', {data: data})
    //将内容添加到ul里
    $('#search-ul').html(ulHTML) 


  }
  // ulContent()
  // ulContent()

  //删除单条数据
  var deleteOne = function (value) {
    var data =  getSearchLocalData()
    data.splice(data.indexOf(value), 1)
    window.localStorage.setItem('searchHistory', JSON.stringify(data))
    ulContent()
  }
  // deleteOne('nike')
  //清除所有数据
  var deleteAll = function () {
    window.localStorage.removeItem('searchHistory')
    ulContent()
  }

  //搜索跳转功能
  var getSearchResult = function (proName, page) {
    // var proName = $('.search-box input').val()
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

      }
    })
  }