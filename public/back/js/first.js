$(function () {
  var currentPage = 1;
  var pageSize = 5;

  // 发送ajax请求
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        // 模板引擎
        $("tbody").html(template("first_tpl", info));

        // 渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / pageSize),
          // 点击跳转到当前页
          onPageClicked: function (a, b, c, page) {
            // console.log(page);
            currentPage = page;
            render();
          }
        })
      }
    });
  }
  // 渲染函数的调用
  render();


  // 分类的添加功能

  //    1 --模态框的显示
  $(".btn_firstAdd").on("click", function () {
    $("#first_Add_modal").modal("show");

  });

  // 模态框的验证--form表单验证

  var $form = $("#form");
  $form.bootstrapValidator({
    // 指定验证时的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });


  // ajax添加
  // 表单校验完成时间

  $form.on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $form.serialize(),
      dataType: "json",
      success: function (info) {
        // console.log(info);
        if (info.success) {

          // 关闭模态框
          $("#first_Add_modal").modal("hide");
          currentPage = 1;
          render();

          // 重置内容和样式
          // 1---DOM样式
          $form[0].reset();

          // 2---表单校验样式
          $form.data("bootstrapValidator").resetForm();

        }
      }
    });
  })

})