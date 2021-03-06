$(function() {
  // 全局监听 当页面中某一个ajax请求发起的时候  让进图条开始
  $(window).ajaxStart(function(){
    NProgress.start();
  })

  // 当ajax请求完成的时候 让进度条完成
  $(window).ajaxComplete(function(){
    NProgress.done();
  })
  // 该文件的功能是用来写首页的js交互的
  //点击侧边栏隐藏
  $(".menu").on("click", function() {
    $(".lt_aside").toggle();
    $(".lt_main").toggleClass("move_right");
  });

  //点击用户管理的效果
  $('.manage-li').on('click', function () {
    // $('.manage_button').removeClass('link')
    $(this).siblings().children('a').removeClass('link')
    $(this).children('a').addClass('link')
    $('.breadcrumb').children().eq(2).hide()
  })
  //切换路径导航的显示
  $('.manage_button').on('click', 'li', function () {
    var $txt = $(this).children('a').text()
    $('.breadcrumb').find('a').eq(1).html($txt)
  })

  $('#sort-two').on('click', 'li', function () {
    var $txt = $(this).find('a').text()
    // console.log(txt)
    $('.breadcrumb').children().eq(2).show().html($txt)

  })

  $('.web_name').on('click', function () {
    $('.breadcrumb').find('a').eq(1).html('首页')
    $('.manage-li').children('a').removeClass('link')
  })


  //点击遮罩层的的确定按钮 发送ajax请求 跳转回login页面
  $('.logout').on('click', function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      data: {},
      dataType: 'json',
      success: function (res) {
        // console.log(res.success)
        if (res.success) {
          $('#modal-hide').modal('hide')
          window.location.href = './login.html'
        }
      }
    })
  })


});
