$(function ($) {
  //获取永不管理数据
  var userDate = function (pageNum) {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: pageNum || 1,
        pageSize: 10
      },
      dataType: 'json',
      success: function (res) {
        // console.log(res)
        var html = template('user-template', res)
        // console.log(html)
        $('tbody').html(html)

        //分页
         // 分页
         $('.pagination').bootstrapPaginator({

          bootstrapMajorVersion: 3,
          size: 'small',
          /*当前页*/
          currentPage: res.page,
          itemTexts: function (type, page, current) {  
            switch (type) {  
                case "first":  
                    return "首页";  
                case "prev":  
                    return "上一页";  
                case "next":  
                    return "下一页";  
                case "last":  
                    return "末页";  
                case "page":  
                    return page;  
            }  
          }, 
          /*一共多少页*/
          // 总页数=数据的总数/每页显示多少条数据
          totalPages: Math.ceil(res.total / res.size),
          /*点击页面事件*/
          onPageClicked: function (event, originalEvent, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            console.log(page)
            userDate(page);
          }
        });
      }
    })


  }
  //页面初始化
  userDate()

  //点击设置禁用和启用
  $('tbody').on('click', '.btn', function () {
    // console.log(1)
    var $id = $(this).data('id')
    var $name = $(this).data('name')
    // var isDelete = $(this).hasClass('btn-danger') ? 1 : 0;

    // var $isDelete = $(this).data('isdelete')
    var $isDelete = $(this).hasClass('.btn-danger') ? 1 : 0
    // console.log($isDelete)
    // console.log($id, $name)
   if ($isDelete === 1) {
    $('#toggle-able').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>您确定要启用'+name+'吗?')
   } else {
    $('#toggle-able').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>您确定要禁用'+name+'吗?')
   }
  
   $('#manage-modal').on('click', '.btn-primary', function () {
    //  console.log($id, $isDelete)
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      dataType: 'json',
      data: {
        id: $id,
        isDelete: $isDelete
      },
      success: function (data) {
        console.log(data)
        if (data.success === true) {
          $('#manage-modal').modal('hide')
          userDate()
        }
      }
    })


   })

  })

})