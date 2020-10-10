// 申明全局变量 
var index = 0,//当前显示图片的索引，默认为零
    timer = null,//存放定时器
    main = byID("main"),
    prev = byID("prev"),
    next = byID("next"),
    pics = byID("banner").getElementsByTagName("div"),
    dots = byID("dots").getElementsByTagName("span"),
    banner = byID("banner"),
    menuContent = byID("menu-content"),
    menuIteams = menuContent.getElementsByClassName("menu-item"),
    subMenu = byID("sub-menu"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    size = pics.length;



//封装getElementById()
function byID(id) {
    return typeof (id) === "string" ? document.getElementById(id) : id;
}
//封装通用事件方法
function addHandler(element, type, handler) {
    if (element.addEventListener) {
        //支持
        element.addEventListener(type, handler, true);
    } else if (element.attachEvent) {
        //不支持IE
        element.attachEvent("on" + type, handler);
    } else {
        //任何用点的地方都可以用[]
        element["on" + type] = handler;
    }

}
// function removeHandler(element, type, handler) {
//     if (element.removeEventListener) {
//         //支持
//         element.removeEventListener(type, handler, true);
//     } else if (element.detachEvent) {
//         //不支持IE
//         element.detachEvent("on" + type, handler);
//     } else {
//         //任何用点的地方都可以用[]
//         element["on" + type] = null;
//     }
// }

//鼠标滑过主菜单
for (var m = 0, idx, mlen = menuIteams.length; m < mlen; m++) {
    //给所有主菜单定义属性  标明索引
    menuIteams[m].setAttribute("data-index", m);

    addHandler(menuIteams[m], "mouseover", function () {
        //遍历所有子菜单
        for (var j = 0, jlen = innerBox.length; j < jlen; j++) {
            //隐藏所有子菜单
            innerBox[j].style.display = "none";
            menuIteams[j].style.background = "none";
        }
        //显示子菜单背景
        subMenu.className = "sub-menu";
        //获取当前主菜单的索引
        idx = this.getAttribute("data-index");

        //找到当前子菜单 让其显示
        innerBox[idx].style.display = "block";
        menuIteams[idx].style.background = "rgba(0,0,0,0.1)";
    })
};


// //鼠标离开banner，隐藏子菜单
// addHandler(banner,"mouseout",function(){
// subMenu.className="sub-menu hide";
// });
// //鼠标离开menucontent,隐藏子菜单
// addHandler(menuContent,"mouseout",function(){
//     subMenu.className="sub-menu hide";
//     });

//通过事件委托实现
addHandler(main, "mouseout", function () {
    subMenu.className = "sub-menu hide";
});

// //鼠标离开主菜单时 隐藏子菜单
// addHandler(subMenu,"mouseout",function(){
//     subMenu.className="sub-menu hide"
// })
//鼠标表划入子菜单 显示子菜单
addHandler(subMenu, "mouseover", function () {
    this.className = "sub-menu";
})

//鼠标滑入 停止轮播
addHandler(main, "mouseover", stopAutoPlay);
//鼠标移除 继续轮播
addHandler(main, "mouseout", starAutoPlay);

//自动轮播
function starAutoPlay() {
    timer = setInterval(function () {
        index++;
        if (index >= size) {
            index = 0;
        };
        changeImage();
    }, 3000)
}
//清除定時器  瀏覽廣告
function stopAutoPlay() {
    if (timer) {
        clearInterval(timer)
    }
}

//改变图片
function changeImage() {
    //遍历所有图片
    for (var i = 0; i < size; i++) {
        pics[i].style.display = "none";
        dots[i].className = "none";
    }
    // 显示当前图片
    pics[index].style.display = "block";
    // 显示高亮节点
    dots[index].className = "active";

};

//点击下一张按钮显示下一章图片
addHandler(next, "click", function () {
    index++;
    if (index >= size) {
        index = 0;
    }
    changeImage();
});
// 上一张
addHandler(prev, "click", function () {
    index--;
    if (index < 0) {
        index = size - 1;
    }
    changeImage();
});
//点击原点对应图片
for (var d = 0; d < size; d++) {
    dots[d].setAttribute("data-id", d)
    addHandler(dots[d], "click", function () {
        index = this.getAttribute("data-id");
        changeImage();
    })
}
//自動調用輪播
starAutoPlay();

