$(function() {
  /* 文档加载，执行一个函数*/
  $("#defaultForm")
    .bootstrapValidator({
      message: "This value is not valid",
      feedbackIcons: {
        /*input状态样式图片*/
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
      },
      fields: {
        /*验证：规则*/
        username: {
          //验证input项：验证规则
          message: "用户名不存在",

          validators: {
            notEmpty: {
              //非空验证：提示消息
              message: "用户名不能为空"
            },
            stringLength: {
              min: 4,
              max: 10,
              message: "用户名长度必须在4到10之间"
            },
            callback: {
              message: "用户名不存在"
            }
          }
        },
        password: {
          message: "密码无效",
          validators: {
            notEmpty: {
              message: "密码不能为空"
            },
            stringLength: {
              min: 6,
              max: 10,
              message: "用户名长度必须在6到10之间"
            },
            callback: {
              message: "密码不正确"
            }
          }
        }
      }
    })
    .on("success.form.bv", function(e) {
      //点击提交之后
      // Prevent form submission
      e.preventDefault();
      // console.log(1);
      // Get the form instance
      var $form = $(e.target);

      // Get the BootstrapValidator instance
      var bv = $form.data("bootstrapValidator");

      // Use Ajax to submit form data 提交至form标签中的action，result自定义
      $.ajax({
        url: "/employee/employeeLogin",
        type: "post",
        dataType: "json",
        data: $form.serialize(),
        success: function(res) {
          if (res.success) {
            window.location.href = "/backEnd/index.html";
          } else if (res.error === 1000) {
            console.log(1)
            $('#defaultForm').data("bootstrapValidator").updateStatus("username", "INVALID", 'callback')
          } else if (res.error === 1001) {
            console.log(2)
            $('#defaultForm').data("bootstrapValidator").updateStatus("password", "INVALID", 'callback')
          }
        }
      });
    });
});
