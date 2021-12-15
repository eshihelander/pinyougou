// jQuery效果
$(function() {
    // jQuery 方式重做下拉菜单
    // console.log(1); // 判断jquery是否生效
    // 绑定鼠标经过事件
    $('.arrow-icon').mouseenter(function() {
        console.log(2); // 判断函数能否进入
        $(this).children('.sec_menu').stop().slideDown(100);
    });
    // 绑定鼠标离开事件
    $('.arrow-icon').mouseleave(function() {
        $(this).children('.sec_menu').stop().slideUp(100);
    })

    // 5、电梯导航
    // 当所有电梯导航功能完成后会出现一个小bug 出现的原因就是当我们点击导航栏里的li时 会触发页面滚动事件
    // 这时就会执行滚动事件中的代码 给li重新添加current类 但是当我们触发li的点击事件后 是不需要执行页面滚动事件的
    // 因为两个事件发生了冲突 所以解决方法就是 添加节流阀 也叫互斥锁
    var flag = true; // 自行补充完整  不要看视频  提示  动画里面有个回调函数

    // 给页面绑定滚动事件  注意是给window绑定滚动 并且不加引号

    $(window).scroll(function() {

        // 获取文档顶部被卷去的距离
        var scrolltop = $(document).scrollTop(); // 注意document不加引号
        // 到达指定位置 则显示导航栏
        if (scrolltop >= $(".recommend").offset().top) {
            $(".nav_fix").fadeIn();
        } else {
            // 否则就隐藏导航栏
            $(".nav_fix").fadeOut();
        }

        if (flag) {
            // 当页面滚动到某个区域 导航栏里的li会显示到对应楼层 给li添加类
            $(".floors>div").each(function(index, ele) {
                if (scrolltop >= $(ele).offset().top - 20) {
                    // console.log(index);
                    $(".nav_fix ul li").eq(index).addClass("fix_current").siblings().removeClass("fix_current");
                }
            })
        }
    });

    // 点击导航栏对应的按钮 跳转到对应楼层
    $(".nav_fix ul li").click(function() {
        flag = false;
        // 获取点击按钮的索引号 作为跳转楼层的跳转标识
        var index = $(this).index();
        // console.log(index);
        // 计算点击li按钮后 要去往的楼层位置(也就是offsetTop)
        var scr_top = $(".floors").children("div").eq(index).offset().top;
        $("html,body").stop().animate({ // 不能是文档document 只能是html body元素做动画
            scrollTop: scr_top
        }, function() {
            flag = true;
        });

        // 点击li按钮后 给里面的a添加类
        $(this).addClass("fix_current").siblings().removeClass("fix_current");
    })

    // 当滚动条滚动到楼层区时 导航栏里的li也会显示到对应位置
    // $(window).scroll(function() {
    // 前面有滚动事件
    // })


});
// 1、如何引用js 窗口加载事件的用法
window.addEventListener('load', function() {
    // 1、导航栏下拉菜单 取消这个效果 用jquery代替了
    (function() {
        // var lis = document.querySelectorAll('.arrow-icon');
        // var uls = document.querySelectorAll('.sec_menu');
        // // tab栏复习 添加自定义属性
        // for (i = 0; i < lis.length; i++) {
        //     lis[i].setAttribute('index', i);
        //     // 给每个li绑定鼠标经过事件
        //     lis[i].addEventListener('mouseover', function() {
        //         var index = this.getAttribute('index');
        //         for (var i = 0; i < lis.length; i++) {
        //             // 鼠标经过时隐藏其他所有菜单
        //             uls[i].style.display = 'none';
        //         }
        //         // 只保留当前菜单
        //         uls[index].style.display = 'block';

        //     });
        //     // 给每个li绑定鼠标离开事件
        //     lis[i].addEventListener('mouseout', function() {
        //         var index = this.getAttribute('index');
        //         // 鼠标离开时 隐藏所有下拉菜单
        //         uls[index].style.display = 'none';

        //     })
        // }

    })();

    // 2、 二维码微信
    (function() {
        var erweima = document.querySelector('.erweima');
        var btn_x = document.querySelector('.btn_x');
        btn_x.onclick = function() {
            erweima.style.display = 'none';
        }
    })();

    // 3、 显示和隐藏搜索框内容
    (function() {
        var input = document.querySelector('.search').querySelector('input');
        // 注册事件
        input.addEventListener('focus', function() {
            // 获得焦点 搜索框内的文字消失
            if (this.value === '手机----尝试按下s键') {
                this.value = '';
                this.style.color = '#333';

            }
        })
        input.addEventListener('blur', function() {
            // 失去焦点 搜索框内的文字显示
            if (this.value === '') {
                this.value = '手机----尝试按下s键';
                this.style.color = '#999';
            }
        })
        document.addEventListener('keyup', function(e) {
            // console.log(e.keyCode);
            // keyCode被划线 代表着将被弃用 替代方法就是 e.key
            if (e.key === 's') {
                input.focus();
            }
        })
    })();

    // 4、 轮播图
    (function() {
        var focus = document.querySelector('.focus');
        var but_left = document.querySelector('.but_left');
        var but_right = document.querySelector('.but_right');
        // (1) 鼠标经过focus 箭头显示  离开时 箭头隐藏
        focus.addEventListener('mouseenter', function() {
            but_left.style.display = 'block';
            but_right.style.display = 'block';
            // 当鼠标停留在focus时 停止定时器 停止自动播放
            clearInterval(timer);
        })
        focus.addEventListener('mouseleave', function() {
            but_left.style.display = 'none';
            but_right.style.display = 'none';
            // 鼠标离开时 再开启定时器 实现自动播放
            timer = setInterval(function() {
                but_right.click(); // 这样就实现了自动点击 而不用手动用鼠标点击 来触发事件
            }, 2000)
        })

        // (2) 根据轮播图个数动态生成小圆圈
        var ol = focus.querySelector('.circle');
        var ul = focus.querySelector('ul');
        // 获取图片个数 其实就是ul 中li 的个数
        var num = ul.children.length;
        // console.log(num);  // 辅助验证
        // 利用for 循环动态添加li小圆圈
        for (var i = 0; i < num; i++) {
            // 生成li元素
            var li = document.createElement('li');
            // 添加到ol中
            ol.appendChild(li);
            // 给每个li 设置自定义属性
            ol.children[i].setAttribute('data-index', i);
        }
        // 页面刷新时 保证第一个小圆点初始状态是有样式的
        ol.children[0].className = 'current';

        // (3) 点击小圆圈 当前小圆圈颜色变红 其余不变
        // 排他思想 先给ol 中的li 注册点击事件
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].addEventListener('click', function() {
                // 去掉其他小圆点样式
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                // 保留当前小圆点样式
                this.className = 'current';
                // (4) 点击小圆圈 切换到对应的图片 注意这里是通过移动ul实现
                // 核心算法： ul移动的距离 = 小圆圈的索引号(也可以理解为自定义属性值) 乘以 图片的宽度
                // 图片的宽度算法  图片宽度等于focus盒子宽度 注意是负值
                var pic = focus.querySelectorAll('.focus ul li img');
                var focusWidth = pic[0].offsetWidth; // 等价于 focus.offsetWidth
                // 点击小圆圈后 获取当前小圆圈的索引号 这里需要注意的是 这个自定义的属性值是在上一个循环中设置的 但却是在点击事件后再获取的
                var index = this.getAttribute('data-index');

                // 当点击小圆圈后 获取到的当前小圆圈的索引号 要赋值给 num 和 circle 以保证按钮切换和小圆点切换以及小圆点颜色变化同步
                num = index;
                circle = index;
                // console.log(index);
                // console.log(focusWidth);
                // 调用动画函数
                animate(ul, -focusWidth * index);
            })
        }

        // 如果直接再结构里复制li 会有很多弊端 比如 小圆圈会跟着变多\li的个数会被写死  
        //所以我们用cloneNode()来克隆 其实克隆的方式也会增加小圆点 但是我们把克隆的节点放在了创建小圆点的for循环外
        // (5) 把第一个li 克隆到一份 放到ul的最后面
        var clone_li = ul.children[0].cloneNode(true); // true 是深克隆 包括子节点  false是浅克隆 不包括子节点
        ul.appendChild(clone_li);
        // (6)右侧按钮无缝滚动 做法类似 小圆圈的切换效果
        var num = 0; // 控制克隆图片切换的变量
        var circle = 0; // 控制小圆点 跟随按钮变化的变量
        var flag = true; // 节流阀变量
        // 点击右侧按钮 图片滚动一张
        but_right.addEventListener('click', function() {
                // 节流阀  防止轮播图按钮连续点击造成播放过快
                // 节流阀原理  当上一个函数动画内容执行完毕 再去执行下一个函数动画 让事件无法连续触发
                // 核心思路 利用回调函数 添加一个变量来控制 锁住函数和解锁函数
                if (flag) { // 如果flag为真
                    flag = false; //  关闭节流阀 锁住函数 再执行里面的函数 等动画函数执行完毕 就解锁函数
                    console.log(flag);

                    var focusWidth = focus.offsetWidth;
                    // 当走到最后一张图片时  此时ul的left 要快速复原为 0
                    if (num == ul.children.length - 1) { // 减 1 是因为有一张是克隆的
                        ul.style.left = 0;
                        num = 0;
                    }
                    num++;
                    // console.log(num);
                    // console.log(ul.style.left); // 这里点击右侧按钮时 left的第一个值不是721???
                    animate(ul, -num * focusWidth, function() {
                        console.log(3);
                        flag = true; // 打开节流阀 解锁函数 
                    });

                    // (7)  每次点击按钮 会让小圆点跟着图片一块变化
                    circle++;
                    // 先清除其他小圆圈的current类名
                    for (var i = 0; i < ol.children.length; i++) {
                        ol.children[i].className = '';
                    }
                    // 如果走到最后一个小圆圈 就复原
                    if (circle == ol.children.length) {
                        circle = 0;
                    }
                    // 保留自己 留下当前小圆圈的类名
                    ol.children[circle].className = 'current';
                }
            })
            // 点击左侧按钮 图片滚动一张
        but_left.addEventListener('click', function() {
                if (flag) {
                    flag = false;
                    var focusWidth = focus.offsetWidth;
                    // 当走到最后一张图片时  此时ul的left 要跳转到最后一张图的位置
                    if (num == 0) {
                        ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
                        num = ul.children.length - 1;
                    }
                    num--;
                    console.log(num);
                    animate(ul, -num * focusWidth, function() {
                        flag = true;
                    });

                    // (7)  每次点击按钮 会让小圆点跟着图片一块变化
                    circle--;
                    // 先清除其他小圆圈的current类名
                    for (var i = 0; i < ol.children.length; i++) {
                        ol.children[i].className = '';
                    }
                    // 如果走到最后一个小圆圈 就复原到最后一个小圆点
                    if (circle < 0) {
                        circle = ol.children.length - 1;
                    }
                    // 保留自己 留下当前小圆圈的类名
                    ol.children[circle].className = 'current';
                }
            })
            // (8) 轮播图自动播放功能 添加定时器
            /* 核心原理就是  添加定时器来不断触发点击事件 无论是小圆点还是左右按钮都需要鼠标点击后才会触发 
            但我们需要的是不用鼠标点击  自动触发  就用到了element.click() 来自动点击 */
        var timer = setInterval(function() {
                but_right.click(); // 这样就实现了自动点击 而不用手动用鼠标点击 来触发事件
            }, 2000)
            // (9) 轮播图不是一直自动播放的
            // 当鼠标停留在focus时 停止定时器

        // focus的点击事件在上面已经注册过 所以以下代码可以提上去
        // focus.addEventListener('mouseenter', function() {
        //         clearInterval(timer);
        //     })
        //     // 鼠标离开时 再开启定时器
        // focus.addEventListener('mouseout', function() {
        //     timer = setInterval(function() {
        //         but_right.click(); // 这样就实现了自动点击 而不用手动用鼠标点击 来触发事件
        //     }, 2000)
        // })



    })()
})