(function() {
    window.addEventListener("load", function() {
        var tel = document.getElementById("tel_num");
        var code = document.getElementById("code");
        var pw = document.getElementById("password");
        var confirm = document.getElementById("confirm");

        // 正则验证
        var reg_tel = /^1[3|4|5|7|8][0-9]{9}$/;
        var reg_code = /^[0-9]{6}$/;
        var reg_pw = /^[a-zA-Z0-9_-]{6,16}$/;
        // 封装绑定事件函数
        function regEvent(ele, reg) {
            ele.onblur = function() {
                if (reg.test(this.value)) {
                    this.nextElementSibling.className = "success";
                    this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 格式正确';
                } else {
                    this.nextElementSibling.className = "error";
                    this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式错误';
                }
            };
        }
        // 手机号验证事件
        regEvent(tel, reg_tel);
        // 验证码验证事件
        regEvent(code, reg_code);
        // 密码验证事件
        regEvent(pw, reg_pw);
        // 确认密码
        confirm.onblur = function() {
            if (this.value === pw.value && this.value.length !== 0) {
                this.nextElementSibling.className = "success";
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 格式正确';
            } else {
                this.nextElementSibling.className = "error";
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式错误';
            }
        }
    })
})();