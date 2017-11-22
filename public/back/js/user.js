$(function () {

  var currentPage = 1;
  var pageSize = 5;

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      // dataType: "json",
      success: function (info) {
        // console.log(info);
        var html = template("uers_tpl", info);
        $("tbody").html(html);

        // 渲染分页
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


  //  为每一个按钮添加点击事件

  // 添加事件代理
  $("tbody").on("click", ".btn", function () {
    // console.log(888);
    $("#user_modal").modal("show");
    // 获取id
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    $(".user_confirm").on("click", function () {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        dataType: "json",
        success: function (info) {
          // console.log(info);
          if (info.success) {
            // 关闭模态框
            $("#user_modal").modal("hide");
            render();
          }
        }
      });
    })
  })

})