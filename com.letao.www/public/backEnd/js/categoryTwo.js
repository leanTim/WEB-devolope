$(function($) {
  var getCategoryTwoDate = function(page) {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: page || 1,
        pageSize: 5
      },
      dataType: "json",
      success: function(data) {
        // console.log(data)
        var html = template("second-template", data);
        var page = data.page;
        // console.log($totalPages)
        $(".table_s").html(html);
        // 分页
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
            getCategoryTwoDate(page);
          }
        });

        // $('.pagination').bootstrapPaginator(options);
      }
    });
  };

  getCategoryTwoDate();

  //获取下拉菜单中的数据
  var getDropDownData = function(page) {
    $(".dropdown").on("click", ".dropdown-text", function() {
      $.ajax({
        url: "/category/queryTopCategoryPaging",
        type: "get",
        data: {
          page: page || 1,
          pageSize: 10
        },
        dataType: "json",
        success: function(data) {
          var html = "";
          $.each(data.rows, function(i, item) {
            html += "<li data-id='"+item.id+"'>" + item.categoryName + "</li>";
          });
          var $list = $(".dropdown-menu");
          $list.html(html);
          $list.on("click", "li", function() {
            var text = $(this).text();
            $(".dropdown-text").html(text);
            console.log($(this).data('id'))
            $('#hiddenIpt').val($(this).data('id'))
            
          });
        }
      });
    });
  };

  getDropDownData();

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
        brandName: {
          //验证input项：验证规则
          message: "二级分类无效",

          validators: {
            notEmpty: {
              //非空验证：提示消息
              message: "二级分类不能为空"
            },
            stringLength: {
              min: 4,
              max: 20,
              message: "二级分类长度必须在4-20之间"
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

      var message = $form.serialize();

      // Use Ajax to submit form data 提交至form标签中的action，result自定义
      $.ajax({
        type: "post",
        url: "/category/addSecondCategory",
        data: message,
        dataType: 'json',
        success: function (data) {
          if (data.success) {
            $('#addSort').modal('hide')
            getCategoryTwoDate()
          }
        }
      });
    });

    

  //校验图片
  var uploadpic = function() {
    $("#LogoImg").fileupload({
      url: "/category/addSecondCategoryPic", //文件上传地址，当然也可以直接写在input的data-url属性内
      //formData:{param1:"p1",param2:"p2"},//如果需要额外添加参数可以在这里添加
      done: function(e, result) {
        var $value = result.result.picAddr
        // console.log(JSON.stringify(result.result));
        $('#prevImg').attr('src', $value)
        //把图片的路径当做有隐藏于的id 上传
        $('#brandLogo').val($value)


      }
    });
  };

  uploadpic()

});
