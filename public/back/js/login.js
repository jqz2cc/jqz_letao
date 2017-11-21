$(function () {

  // 添加表单校验
  var $form = $("form");
  $form.bootstrapValidator({
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      // 用户名的校验设置
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          callback: {
            message: "请输入正确的用户名"
          }
        }
      },
      // 密码的校验设置
      password: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度为6-12"

          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });


  // 校验成功的事件   success.form.bv
  $form.on("success.form.bv", function (e) {
    // 阻止默认事件
    e.preventDefault();

    // console.log(999);

    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $form.serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "index.html";
        }
        if (info.error == 1000) {
          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        }
        if (info.error == 1001) {
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    });
  });


  // 添加重置事件

  $("[type=reset]").on("click", function () {
    $form.data("bootstrapValidator").resetForm();
  })


})