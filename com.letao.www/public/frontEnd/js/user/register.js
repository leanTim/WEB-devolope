$(function () {
  //
  // var code = getCode()
  // console.log(code)
  $('.btn_getCode').on('singleTap', function () {
    var code = getCode()
    window.code = code
  })
  
  $('.cz_container').on('singleTap', '.btn_register', function () {
    
    formVaildate()
    //所有验证都完成以后，发送注册新用户的请求
    data.mobile = data.username
    console.log(data)
    $.ajax({
      url: '/user/register',
      type: 'post',
      data: data,
      dataType: 'json',
      success: function (data) {
        console.log(data)
      }
    })

  })
  



})


//获取验证码的函数
var getCode = function () {

  //点击按钮 获取验证码
  // $('.btn_getCode').on('singleTap', function () {
    var code = '' + Math.floor(Math.random()*9) + Math.floor(Math.random()*9)
    + Math.floor(Math.random()*9) + Math.floor(Math.random()*9) + Math.floor(Math.random()*9)
    + Math.floor(Math.random()*9)
    console.log(code)
    return code
  // })
}

//进行表单验证的函数
var formVaildate = function () {
  // code = code || ''
  var data = {
    username: $('[name=mobile]').val(),
    password: $('[name=pass]').val(),
    rePass: $('[name=rePass]').val(),
    vCode: $('[name=code]').val()
  }
  window.data = data
  //进行表单验证
  //验证手机号码
  if(!data.username) {
    mui.toast('请输入手机号')
    return false
  }
  if(!/^1\d{10}$/.test(data.username)) {
    mui.toast('请输入正确的手机号')
    return false
  }

  if(!data.password) {
    mui.toast('请输入密码')
    return false
  }

  if(!data.rePass) {
    mui.toast('请再次确认密码')
    return false
  }
  
  if(data.rePass != data.password) {
    mui.toast('两次密码不同')
    return false
  }
  
  if (!data.vCode) {
    mui.toast('请输入验证码')
    return false
  }

  if (data.vCode != code) {
    mui.toast('验证码错误')
    return false
  }

}
