/*
 * @Author: 贾倾真 
 * @Date: 2017-11-24 22:10:21 
 * @Last Modified by: 贾倾真
 * @Last Modified time: 2017-11-25 10:05:11
 */


$(function () {
  // 获取左侧位置
  // $.ajax({
  //   type: "get",
  //   url: "/category/queryTopCategory",

  //   success: function (info) {

  //     console.log(info.rows[0].id);
  //     console.log(info);
  //     $(".cate_l .mui-scroll").html(template("cote_list_tpl", info));


  //     renderSecond(info.rows[0].id);
  //   }
  // });

  renderSecond(1);

  // 渲染二级分类
  function renderSecond(id) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      success: function (info) {
        console.log(info);
      }
    });
  };


});