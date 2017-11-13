$(function ($) {
  //从后台获取产品信息
  var getProduceData = function (page) {
    $.ajax({
      url:'/product/queryProductDetailList',
      type: 'get',
      data: {
        page: page || 1,
        pageSize: 5
      },
      dataType: 'json',
      success: function (data) {
        console.log(data)
        var html = template('produce-template', data)
        $('.table_s').html(html)
        
        $(".pagination").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          size: "small",
          /*当前页*/
          currentPage: data.page,
          itemTexts: function(type, page, current) {
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
          totalPages: Math.ceil(data.total / data.size),
          /*点击页面事件*/
          onPageClicked: function(event, originalEvent, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            getProduceData(page);
          }
        });



      }
    })



  }

  getProduceData()

  //文件上传
    //校验图片
    var picArr = []
    var categoryTwoUploadpic = function() {
      $("#produceImg").fileupload({
        url: "/product/addProductPic", //文件上传地址，当然也可以直接写在input的data-url属性内
        //formData:{param1:"p1",param2:"p2"},//如果需要额外添加参数可以在这里添加
        done: function(e, result) {
          var $value = result.result.picAddr
          // console.log(JSON.stringify(result.result));
          // console.log(result)
          //把图片的路径当做有隐藏于的id 上传
          // $('#brandLogo').val($value)
          $('.image-box').append('<img width="50" src="'+$value+'" alt="" id="produce-image">')
          picArr.push(result.result)
          console.log(picArr)
        }
      });
    };
    
    categoryTwoUploadpic()
    
    //表单校验
    $("#categoryTwo-form-submit")
    .bootstrapValidator({
      feedbackIcons: {
        /*input状态样式图片*/
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
      },
      fields: {
        /*验证：规则*/
        proName: {
          //验证input项：验证规则
          message: "产品名称无效",

          validators: {
            notEmpty: {
              //非空验证：提示消息
              message: "产品名称不能为空"
            },
            stringLength: {
              min: 2,
              max: 20,
              message: "产品名称长度必须在4-20之间"
            }
          }
        },
        proDesc: {
          //验证input项：验证规则
          message: "产品描述无效",

          validators: {
            notEmpty: {
              //非空验证：提示消息
              message: "产品描述不能为空"
            },
            stringLength: {
              min: 2,
              max: 200,
              message: "产品描述长度必须在2-200之间"
            }
          }
        },
        num: {
          //验证input项：验证规则
          message: "产品数量无效",

          validators: {
            notEmpty: {
              //非空验证：提示消息
              message: "产品数量不能为空"
            },
            
          }
        },
        price: {
          //验证input项：验证规则
          message: "产品价格无效",

          validators: {
            notEmpty: {
              //非空验证：提示消息
              message: "产品价格不能为空"
            },
            
          }
        },
        oldPrice: {
          //验证input项：验证规则
          message: "产品原价无效",

          validators: {
            notEmpty: {
              //非空验证：提示消息
              message: "产品原价不能为空"
            },
           
          }
        },
        size: {
          //验证input项：验证规则
          message: "产品尺寸无效",

          validators: {
            notEmpty: {
              //非空验证：提示消息
              message: "产品尺寸不能为空"
            },
          
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

      var message = $form.serialize();
      $.each(picArr, function (i, item) {
        message += '&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
      })

      message += '&brandId=4';
      console.log(message)

      // console.log(message)

      // Use Ajax to submit form data 提交至form标签中的action，result自定义
      $.ajax({
        url: '/product/addProduct',
        type: 'post',
        // dataType: 'json',
        data: message,
        success: function (data) {
          console.log(data)
          if (data.success) {
            $('#produce-modal').modal('hide')
            categoryTwoUploadpic()
          }
           
        } 
      })

    });

    




})