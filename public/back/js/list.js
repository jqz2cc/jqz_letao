/*
 * @Author: 贾倾真 
 * @Date: 2017-11-23 12:45:25 
 * @Last Modified by: 贾倾真
 * @Last Modified time: 2017-11-24 19:31:56
 */

$(function () {

  // console.log(666);
  var currentPage = 1;
  var pageSize = 5;
  var imgs = [];

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


  // 添加商品
  $(".btn_listAdd").on("click", function () {
    // console.log(999);
    $("#list_Add_modal").modal("show");
    // 下拉框数据的渲染
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        console.log(info)
        $(".dropdown-menu").html(template("second_list_tpl", info))

      }
    });
  })




  // 二级分类的选择
  // $("[name='brandId']")
  $("ul.dropdown-menu").on("click", "a", function () {
    $(".first_text").text($(this).text());
    $("[name='brandId']").val($(this).data("id"));
    console.log($(this).data("id"));
    $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID");

  });

  // 表单数据的校验

  $("form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        // todo
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入合法数据,例子:999"
          }
        }
      },
      price: {
        // todo
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入合法数据,例子:999"
          }
        }
      },
      oldPrice: {
        // todo
        validators: {
          notEmpty: {
            message: "请输入商品的原始价格"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入合法数据,例子:999"
          }
        }
      },
      size: {
        // todo
        validators: {
          notEmpty: {
            message: "请输入商品的原始尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入合法数据,例子:23-32"
          }
        }
      },
      brandLOGO: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }

    }
  });

  // 图片的上传
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      // 说已经成功上传三张图片
      if (imgs.length >= 3) {
        return false;
      }

      console.log(data.result);
      // 将上传的页面加载到页面中
      $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100" alt=""> ')

      // 将上传的图片保存在数组中
      imgs.push(data.result);

      if (imgs.length === 3) {
        $("#form").data('bootstrapValidator').updateStatus("brandLOGO", "VALID");
      } else if (imgs.length < 3) {
        $("#form").data('bootstrapValidator').updateStatus("brandLOGO", "INVALID");
      }
    }
  });

  // 校验完成事件
  $("form").on("success.form.bv", function () {
    var pram = $("form").serialize();

    pram += "&picName" + imgs[0].picName + "&picAddr" + imgs[0].picAddr;
    pram += "&picName" + imgs[1].picName + "&picAddr" + imgs[1].picAddr;
    pram += "&picName" + imgs[2].picName + "&picAddr" + imgs[2].picAddr;
    console.log(pram);



    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: pram,
      dataType: "json",
      success: function (info) {
        if (info.success) {
          // 关闭模态框
          $("#list_Add_modal").modal("hide");
          // 重新渲染页面
          currentPage = 1
          render();
          // 清除样式
          $("form")[0].reset();
          $("form").data("bootstrapValidator").resetForm();
          // 下拉框样式以及内容重置
          $(".first_text").text("请选择二级分类");

          $("#form").data('bootstrapValidator').updateStatus("brandId", "NOT_VALIDATED");
          // 图片样式重置
          $(".img_box img").remove();
          imgs = [];
          $("#form").data('bootstrapValidator').updateStatus("brandLOGO", "NOT_VALIDATED");
        }

      }
    });
  })





})