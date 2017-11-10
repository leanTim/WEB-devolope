$(function() {
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



});
