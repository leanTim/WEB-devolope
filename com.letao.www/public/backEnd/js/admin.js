// 该文件的功能是用来写首页的js交互的
//点击侧边栏隐藏
$('.menu').on('click', function () {
  $('.lt_aside').toggle()
  $('.lt_main').toggleClass('move_right')
})             