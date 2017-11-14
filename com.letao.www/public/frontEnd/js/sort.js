$(function(){
  // url: /category/queryTopCategory

  // 1.声明一个获取一级分类的方法
  var getFirstData = function(){
    $.ajax({
      type: 'get',
      url:'/category/queryTopCategory',
      data: {},
      success:function(data){
        // console.log(data);
        var firstResult = template('firstTemplate',data);
        $('.lt-sort-left ul').html(firstResult);

        // 当页面一进入 那么我们就需要请求数据 数据的接口 我们知道 需要传id
        // 当页面一进入  id时 data.rows[0].id
        getSecondData(data.rows[0].id);
      }
    })
  }

  // 调用getFirstData
  getFirstData();

  // 2.二级分类的数据
  var getSecondData = function(id){
    $.ajax({
      type: 'get',
      url: ' /category/querySecondCategory',
      data: {
        id: id
      },
      success:function(data){
        // console.log(data);
        var secondResult = template('secondTemplate',data);
        $('.brand-list').html(secondResult);

      }
    })
  }

  // 3.点击某一个一级分类 动态显示二级分类
  $('.lt-sort-left ul').on('tap','a',function(){

    $('.lt-sort-left').find('a').removeClass('active');
    $(this).addClass('active');
    // console.log(1);
    var id = $(this).attr('data-id');

    // console.log(id);

    getSecondData(id);

    // $('.fa.fa-arrow-left').click(finction)({
    //   history.back();
    // })
  })
})

