/*
 * @Author: 贾倾真 
 * @Date: 2017-11-21 21:21:04 
 * @Last Modified by: 贾倾真
 * @Last Modified time: 2017-11-21 22:03:03
 */



$(function () {

  NProgress.configure({
    showSpinner: true
  });
  // 进度条开始
  $(document).ajaxStart(function () {
    console.log("开始")
    NProgress.start();
  });
  // 进度条结束

  $(document).ajaxStop(function () {
    // setTimeout(function () {
    console.log("结束")
    NProgress.done();
    // }, 500);
  })
  // 判断用户是否登录

  if (location.href.indexOf("login.html") == -1) {
    $.ajax({
      type: "get",
      url: "/employee/checkRootLogin",
      success: function (info) {
        // console.log(info);
        if (info.error === 400) {
          location.href = "login.html";
        }
      }
    });
  }

  // 下拉框

  $(".child").prev().on("click", function () {
    $(this).next().slideToggle();
  });

  // 收缩效果的实现
  $(".nav .pull-left").on("click", function () {
    console.log(666);
    $(".log_right").toggleClass("active");
    $(".log_left").toggleClass("active");
  });


  // 退出功能的实现
  $(".icon_logout").on("click", function () {
    $('#logout_modal').modal("show");

    $(".logout_btn").off().on("click", function () {
      // console.log(88);
      $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        success: function (info) {
          if (info.success) {
            location.href = "login.html";
          }
        }
      });
    })
  });




})