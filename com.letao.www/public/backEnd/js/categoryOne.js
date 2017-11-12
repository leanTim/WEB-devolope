$(function ($) {
  var getCategoryOneData = function (page) {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: page || 1,
        pagesize: 10
      },
      dataType: 'json',
      success: function (data) {
        var html = template('data-template', data)
        // console.log(html)
        $('.table_s').html(html)

      }
    })

  }

  
  getCategoryOneData()

  //表达校验

    /* 文档加载，执行一个函数*/
    $("#form-addCategory")
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
          categoryName: {
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
        var data = $form.serialize()
        // Use Ajax to submit form data 提交至form标签中的action，result自定义
        $.ajax({
          url: '/category/addTopCategory',
          type: 'post',
          dataType: 'json',
          data: data,
          success: function (data) {
            console.log(data)
            if (data.success) {
              $('#addSort').modal('hide')
              getCategoryOneData()
            }
          }
        }) 
      });
  
      

  





})