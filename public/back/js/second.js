$(function () {
  // 分页
  // 获取数据

  var currentPage = 1;
  var pageSize = 5;

  // 页面渲染
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        $("tbody").html(template("second_tpl", info));
        // console.log($("#paginator")[0]);
        // 分页渲染
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / pageSize),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    });
  }
  render();



  // 二级分类添加功能开始

  // 模态框显示
  $(".btn_secondtAdd").on("click", function () {
    // console.log(999);
    $("#second_Add_modal").modal("show");

    // 获取下拉框的数据
    // ajax获取数据
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100,
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        $(".dropdown-menu").html(template("first_list_tpl", info))
      }
    });

  });


  // 点击a标签的时候讲内容添加到框中
  $(".dropdown-menu").on("click", "a", function () {
    // console.log(888);
    // var text = $(this).text();
    // console.log(text);

    // 给下拉框添加内容
    $(".first_text").text($(this).text());

    // console.log($(this).data("id"));

    // 需要返回一级分类名称的ID
    $(".categoryId").val($(this).data("id"));

    $("#form").data('bootstrapValidator').updateStatus("categoryId", "VALID");


  })

  // 上传图片初始化
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, info) {
      // console.log(e);
      // console.log(info);
      // 图片地址
      $(".img_box img").attr("src", info.result.picAddr);

      $(".img_box input").val(info.result.picAddr);

      $("#form").data('bootstrapValidator').updateStatus("brandLogo", "VALID");
    }
  })

  // 表单验证
  var $form = $("form");
  $form.bootstrapValidator({
    // 指定不校验的类型
    excluded: [],
    // 验证样式
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验的字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类名称"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传品牌LOGO"
          }
        }
      }
    }
  });

  // 校验通过
  $form.on("success.form.bv", function (e) {
    // console.log($form.serialize());
    e.preventDefault();
    // console.log(888);
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $form.serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $("#second_Add_modal").modal("hide");
          // 页面重新渲染
          render();

          // 模态框样式和内容重置
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          $("#form").data('bootstrapValidator').updateStatus("brandLogo", "NOT_VALIDATED");
          $("#form").data('bootstrapValidator').updateStatus("categoryId", "NOT_VALIDATED");
          $(".first_text").text("请选择一级分类");
          $(".img_box img").attr("src", "./images/none.png");

        }
      }
    });
  })


})