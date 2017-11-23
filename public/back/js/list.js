/*
 * @Author: 贾倾真 
 * @Date: 2017-11-23 12:45:25 
 * @Last Modified by: 贾倾真
 * @Last Modified time: 2017-11-23 13:02:11
 */

$(function () {

  // console.log(666);
  var currentPage = 1;
  var pageSize = 5;

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        $("tbody").html(template("list_tpl", info));
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

  /**
   * 商品的下架product_del 点击事件
   */
  // var product_del = $("#product_de1l")[0];
  // $("tbody").on("click", product_del, function () {
  //   console.log(888);
  // })


  // 添加商品
  $(".btn_listAdd").on("click", function () {
    // console.log(999);
    $("#list_Add_modal").modal("show");
  })

})