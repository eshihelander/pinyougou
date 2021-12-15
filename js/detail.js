window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');

    // 鼠标经过 显示mask 和 大图
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    //鼠标离开 隐藏mask 和 大图
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    // 给mask添加跟随鼠标移动的事件
    mask.addEventListener('mousemove', function(e) {
        // 先获取鼠标在盒子内的坐标
        var x = e.pageX - preview_img.offsetLeft;
        var y = e.pageY - preview_img.offsetTop;
        // console.log(x);
        // console.log(y);

        // 加判断条件 让mask不超出父级盒子范围移动
        // 计算mask的移动距离
        var maskX = x - mask.offsetWidth / 2; // 这里有点绕 但其实mask的移动距离就是x 本质是让mask跟随鼠标来移动 但是为了让鼠标居中 就减去了mask的宽高一半
        var maskY = y - mask.offsetHeight / 2;
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        // 把鼠标获取到的盒子内的坐标赋值给mask的left 和 top
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 让大图同时反向移动
        var bigImg = document.querySelector('.bigImg');
        // 计算大图移动距离  核心算法如下
        // 大图的移动距离 = mask的移动距离 * 大图的最大移动距离 / mask的最大移动距离
        var bigMax = big.offsetWidth - bigImg.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = bigX + 'px';
        bigImg.style.top = bigY + 'px';
    })























    // preview_img.addEventListener('mouseover', function() {
    //     mask.style.display = 'block';
    //     big.style.display = 'block';

    // })
    // preview_img.addEventListener('mouseout', function() {
    //         mask.style.display = 'none';
    //         big.style.display = 'none';
    //     })
    //     // 鼠标移动的时候让mask跟随鼠标移动
    // preview_img.addEventListener('mousemove', function(e) {
    //     // 计算鼠标在盒子内的坐标
    //     var x = e.pageX - this.offsetLeft;
    //     var y = e.pageY - this.offsetTop;
    //     // 鼠标在mask中间显示 为了不把数值写死 可以用mask.offsetWidth / 2
    //     var maskX = x - mask.offsetWidth / 2;
    //     var maskY = y - mask.offsetWidth / 2;
    //     // 保证mask在移动时不会超出父级盒子 所以要给mask的移动距离加判断条件进行限制
    //     // preview_img.offsetWidth - mask.offsetWidth 就是遮挡层的移动距离
    //     if (maskX <= 0) {
    //         maskX = 0;
    //     } else if (maskX >= preview_img.offsetWidth - mask.offsetWidth) {
    //         maskX = 100;
    //     }
    //     if (maskY <= 0) {
    //         maskY = 0;
    //     } else if (maskY >= preview_img.offsetHeight - mask.offsetHeight) {
    //         maskY = 100;
    //     }
    //     mask.style.left = maskX + 'px';
    //     mask.style.top = maskY + 'px';
    //     // 给大图片添加处理程序
    //     // 大图片的移动距离 = 遮挡层的移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
    //     var bigImg = document.querySelector('.bigImg');
    //     var maskmax = preview_img.offsetWidth - mask.offsetWidth; // 遮挡层的最大移动距离
    //     var bigMax = bigImg.offsetWidth - big.offsetWidth; // 大图片最大移动距离
    //     var bigX = maskX * bigMax / maskmax;
    //     var bigY = maskY * bigMax / maskmax;
    //     console.log(bigX);
    //     console.log(bigY);
    //     bigImg.style.left = -bigX + 'px'; // 反向移动 取负值
    //     bigImg.style.top = -bigY + 'px'; // 反向移动 取负值
    // })
})