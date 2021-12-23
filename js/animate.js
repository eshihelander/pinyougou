// 封装完整的缓动动画函数
// 缓动动画添加回调函数callback  1、动画封装函数 加一个可以接收函数的形参 2、 回调函数要写在定时器结束后
function animate(obj, target, callback) { // obj 接收 div| target 接收 800 | callback 接收 function(){} 这里相当于 callback = function(){} 要调用这个函数需要callback()
    // 解决不断点击按钮 元素速度加快的bug
    clearInterval(obj.timer); // 运行函数前  先清除之前的定时器 只保留一个定时器
    obj.timer = setInterval(function () { // 性能优化 只是把var timer 改为了  obj.timer  因为div和p获取的元素都是一个元素对象
        // 步长值要写到定时器的里面
        // 这里步长涉及到小数 会影响移动距离的准确性 解决方法就是 把步长改为整数
        // 这里步长会有正负值的问题 会影响到返回时移动距离的准确性 
        // 解决方法就是 加个判断条件 如果step 为正 向上取整 如果为负 向下取整
        var step = (target - obj.offsetLeft) / 10; -
            0.9
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        console.log(step, obj.offsetLeft, target); // -1 -712 -722
        if (obj.offsetLeft == target || Math.abs(obj.offsetLeft - target) < 15) {
            obj.style.left = target + 'px';
            clearInterval(obj.timer);
            // 回调函数要加到定时器结束的位置后面
            // if (callback) { // 这个if可以理解为 是否存在回调函数 如果存在则调用这个函数
            //     callback();
            // }
            // 上述代码也可以简写如下
            callback && callback();
        } else {
            // 把这里的 1 改为一个慢慢变小的值 步长值公式 （目标值-现在的位置）
            obj.style.left = obj.offsetLeft + step + 'px';
            // console.log(obj.offsetLeft + step);
            // console.log(obj.offsetLeft);
            // console.log(Math.floor(step));
            // console.log(obj.style.left);
        }
    }, 15) // 一般这种缓动动画的时间间隔 是15ms

}