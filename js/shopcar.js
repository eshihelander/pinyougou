$(function() {
    // 一、全选模块
    // 1、点击全选框 复选框跟随变化
    $('.checkall').change(function() {
        // 获取全选框的选中状态
        // $(this).prop("checked");
        // 采用并集选择器的方式 同时选中复选框和全选框 中间用逗号隔开
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }

    });

    // 2、如果复选框全部被勾选 全选框就一并被选中
    $(".j-checkbox").change(function() {
        // 获取复选框的选中状态
        // $(".j-checkbox:checked");
        // 获取复选框被选中的数量
        console.log($(".j-checkbox:checked").length);
        // 如果这个数值等于 所有的复选框 就勾选全选框
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $('.checkall').prop("checked", true);
        } else {
            $('.checkall').prop("checked", false);
        }

        if ($(this).prop("checked")) {
            // 让当前商品添加类
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })


    // 二、增减商品数量模块
    // 1、通过点击+-改变文本框内的数量
    // 2、数量变更后 自动计算小计中的商品价格

    $('.increment').click(function() {
        // 先让num获取到当前文本框里的数值
        var num = $(this).siblings('.itxt').val();
        // 点击一次+号 在已获取到的数值基础上 文本框内的值再增加1
        num++;
        $(this).siblings('.itxt').val(num);

        // 计算价格
        // (1)先获取单价
        var p = $(this).parents('.p-num').siblings('.p-price').text();
        // (2)操作字符串 取出数值
        p = p.substr(1);
        // (3)计算总价
        $(this).parents('.p-num').siblings('.p-sum').text("￥" + (p * num).toFixed(2));

        // 计算商品总数和总价
        getSum();

    })
    $('.decrement').click(function() {
        // 先让num获取到当前文本框里的数值
        var num = $(this).siblings('.itxt').val();
        // 不可以出现负值
        if (num == 1) {
            return false;
        }
        // 点击一次-号 在已获取到的数值基础上 文本框内的值就减少1
        num--;
        $(this).siblings('.itxt').val(num);

        // 计算价格
        // (1)先获取单价
        var p = $(this).parents('.p-num').siblings('.p-price').text();
        // 操作字符串 取出数值
        p = p.substr(1);
        $(this).parents('.p-num').siblings('.p-sum').text("￥" + (p * num).toFixed(2));

        // 计算商品总数和总价
        getSum();
    })

    // 如果直接修改数值 价格也要随着变化
    $(".itxt").change(function() {
        // 获取单价
        var p = $(this).parents('.p-num').siblings('.p-price').text();
        p = p.substr(1);
        // 获取文本框的商品数量
        var num = $(this).val();
        // 计算价格
        $(this).parents('.p-num').siblings('.p-sum').text("￥" + (p * num).toFixed(2));

        // 计算商品总数和总价
        getSum();
    });

    // 頁面刷新時 商品總數和價格會出現bug  解決方法就是在頁面刷新后先調用一次函數
    getSum();
    // 三、 商品数量总计 和商品价格总计模块
    // 这里封装一个函数 调用起来更方便
    function getSum() {
        var count = 0;
        var money = 0;
        // 用each 遍历每个商品元素 获取单个商品数量
        $(".itxt").each(function(index, ele) {
            count += parseInt($(ele).val());

        });
        // 把count赋值给商品数量总计元素 这个要放在each循环外面 否则会出现bug还没有报错提示
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(index, ele) {
            money += parseFloat($(ele).text().substr(1));

        });
        // 把money赋值给商品价格总计元素 这个也要放在each循环外面 否则会出现bug还没有报错提示
        $(".price-sum em").text(money.toFixed(2));
    }

    // 四、 刪除商品模块
    // 1、点击删除按钮  删除当前商品
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        // 删除商品后要重新计算 商品总数和总价
        getSum();
    });
    // 2、 删除选中的商品
    $(".remove-batch").click(function() {
        // :checked可以检测到哪个复选框是选中状态
        // console.log($(".j-checkbox:checked"));
        $(".j-checkbox:checked").parents(".cart-item").remove();
        // 删除商品后要重新计算 商品总数和总价
        getSum();
    });
    // 3、 清理购物车
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        // $(".cart-item-list").empty();
        // 删除商品后要重新计算 商品总数和总价
        getSum();
    })

    // 五、添加和删除背景颜色
    // 在全选和取消全选点击事件中添加

})