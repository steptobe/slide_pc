(function($) {
    //轮播图 banner_c()
    $.fn.banner_c = function(options) {
        var settings = {
            speed: 1000, //动画执行过程的时间
            time: 3000, //动画循环的等待时间
            classname: 'on', //切换序号标识添加的class
            switchover: 'display', //    'display'   'fade'  'acrossRoll'  'leftRoll'   'rightRoll'  'verticalRoll'   'topRoll'   'bottomRoll'
            emDisplay: true, //序号em是否显示，默认显示true，关掉则=false
            page: true, // 是否显示左右切换按钮
            page_prev: '.prev',
            page_next: '.next',
            onmouseup: null //鼠标松开的回调函数
        };
        $.extend(true, settings, options);
        return this.each(function() {
            var $this = $(this),
                $Width = $this.width(), //获取宽度
                $Height = $this.height(), //获取高度
                $ul = $this.children('ul'),
                $li = $ul.children('li'),
                $span = $this.children('div').children('span'),
                $liLength = $li.length, //li的数量
                pageSign = 0, // 翻页执行标记
                intervalTime, //动画的间隔时间
                index = 0, //码数默认=0
                changeTime = null, //创建定时器
                direction = 1, //循环切换的方向
                emIndex, //em用的记数
                $em, //em本身
                emHtml = ''; //存放em的HTML
            //重置基础CSS属性
            // $this.css({
            //     "position": "relative",
            //     "overflow": "hidden"
            // });
            $ul.css({
                    "position": "absolute",
                    "left": "0px",
                    "top": "0"
                })
                .children('li').css({
                    "width": $Width,
                    "height": $Height,
                    "overflow": "hidden"
                });
            //各个切换模式的CSS默认设置
            if (settings.switchover == 'leftRoll') {
                $ul.css({
                    "width": $Width * ($liLength * 1 + 1)
                }).append($li.first().clone());
                $ul.children('li').css({
                    "float": 'left'
                });
            }
            //设置间隔时间
            intervalTime = settings.time + settings.speed;
            //重置$em
            if (settings.emDisplay) {
                for (var i = 0; i < $liLength; i++) {
                    emHtml += "<em>" + (i * 1 + 1) + "</em>";
                }
                $span.html(emHtml);
                $em = $span.children('em');
                $em.eq(0).addClass(settings.classname);
            }

            //各个切换状态的调用方法
            function leftRoll_fn(_index) { //左循环
                if (_index == $liLength) {
                    emIndex = 0;
                } else {
                    emIndex = _index;
                }
                $ul.stop().animate({
                    "left": _index * (-1) * $Width
                }, settings.speed, function() {
                    pageSign = 0;
                });
                if (settings.emDisplay) {
                    $span.children('em').eq(emIndex).addClass(settings.classname).siblings().removeClass(settings.classname);
                }
            }

            //定时器调用的轮播切换的方法
            function Time() {
                if (settings.switchover == 'leftRoll') {
                    if (index == $liLength) {
                        index = 0;
                        $ul.css("left", 0);
                    }
                    index = index + 1;
                    leftRoll_fn(index);
                }
            }

            if ($liLength > 1) {
                //开启定时器
                changeTime = setInterval(Time, intervalTime);
                //鼠标移入移出序号点的切换
                if (settings.emDisplay) {
                    $em.mouseover(function() {
                        clearInterval(changeTime);
                        index = $(this).index();
                        if (settings.switchover == 'leftRoll') {
                            leftRoll_fn(index);
                        }
                    }).mouseout(function() {
                        changeTime = setInterval(Time, intervalTime);
                    });
                }
                //鼠标移入移出图片上关闭开启轮播切换
                $ul.children('li').hover(function() {
                        clearInterval(changeTime);
                    },
                    function() {
                        changeTime = setInterval(Time, intervalTime);
                    });
            }
        });
    };

    // window.onload = function(){
       var oList = document.getElementById('list');
        var aLi = oList.getElementsByTagName('li');
        var i = iNow = 0;
        var timer = null;
        var aSort = [];
        var aPosition = [
                        {width:440,height:700,top:0,left:552,zIndex:10},
                        {width:360,height:527,top:56,left:248,zIndex:8},
                        {width:304,height:456,top:92,left:0,zIndex:6},
                        {width:140,height:180,top:132,left:148,zIndex:4},
                        {width:110,height:140,top:172,left:232,zIndex:2},
                        {width:110,height:140,top:172,left:708,zIndex:2},
                        {width:140,height:180,top:132,left:770,zIndex:4},
                        {width:304,height:456,top:92,left:1244,zIndex:6},
                        {width:360,height:527,top:56,left:940,zIndex:8}
            ]

        $('li .inverted').addClass('dn');
        $('.hove .s-title').addClass('dn');
        $('.hove .inverted').removeClass('dn');

        for(i=0;i<aLi.length;i++){
            aLi[i].index = i;
            aLi[i].style.width = aPosition[i].width +'px';
            aLi[i].style.height = aPosition[i].height +'px';
            aLi[i].style.top = aPosition[i].top +'px';
            aLi[i].style.left = aPosition[i].left +'px';
            aLi[i].style.zIndex = aPosition[i].zIndex;
            aSort[i] = aPosition[i];
            myAddEvent(aLi[i], 'mouseover', function(){
                var oDiv = this.getElementsByTagName('div')[0];
                startMove(oDiv, {opacity:0});
                // 切换图片
                // var iSort = this.index;
                // iNow = this.index;
                // Sort();
                // for(i=0;i<iSort;i++){
                //  aSort.unshift(aSort.pop());
                // }
                // sMove();
            });

            myAddEvent(aLi[i], 'mouseout', function(){
                if (this.style.width != '440px') {
                    var oDiv = this.getElementsByTagName('div')[0];
                    startMove(oDiv, {opacity:75});
                };

            });

            myAddEvent(aLi[i], 'click', function(){
                var iSort = this.index;
                iNow = this.index;
                Sort();
                for(i=0;i<iSort;i++){
                    aSort.unshift(aSort.pop());
                }
                sMove();
                tab();
            });
        }

        timer = setInterval(setInter,20000);
        function setInter(){
            iNow++;
            if(iNow>aLi.length-1)iNow = 0;
            tab();
        }

        function tab(){
            for(i=0;i<aLi.length;i++)aLi[i].className = '',startMove(aLi[i], {opacity:40});
            aLi[iNow].className = 'hove';
            startMove(aLi[iNow], {opacity:100})
            var iSort = iNow;
            Sort();
            for(i=0;i<iSort;i++){
                aSort.unshift(aSort.pop());
            }
            sMove();
            // 文字阴影显示
            $('li .s-title').removeClass('dn');
            $('li .inverted').addClass('dn');
            $('.hove .s-title').addClass('dn');
            $('.hove .inverted').removeClass('dn');
        }

        function Sort(){
            for(i=0;i<aLi.length;i++){
                aSort[i] = aPosition[i];
            }
        }

        function sMove(){
            for(i=0;i<aLi.length;i++){
                var oDiv = aLi[i].getElementsByTagName('div')[0];
                startMove(oDiv, {opacity:75});
                startMove(aLi[i], aSort[i], function(){one();});
                aLi[i].className = '';
            }
            aLi[iNow].className = 'hove';
        }

        function one(){
            for(i=0;i<aLi.length;i++){
                if(aLi[i].style.width == '440px'){
                    var oDiv = aLi[i].getElementsByTagName('div')[0];
                    startMove(oDiv, {opacity:0});
                }
                var sTit = aLi[i].getElementsByClassName('s-title');
                var x=aLi[i].style.left;
                if(aLi[i].style.width == '360px'){
                    var x=aLi[i].style.left;
                    // console.log(x);
                    // console.log(sTit);
                    if (x == '248px') {
                        sTit[0].style.left='-6%';
                    };
                    if (x == '940px') {
                        sTit[0].style.left='6%';
                    };
                }
                if(aLi[i].style.width == '304px'){
                    var x=aLi[i].style.left;
                    // console.log(x);
                    if (x == '0px') {
                        sTit[0].style.left='-9%';
                    };
                    if (x == '1244px') {
                       sTit[0].style.left='9%';
                    };

                }
            }
        }
        one();

})(jQuery);


// 3d相册
function myAddEvent(obj, sEvent, fn) {
    if (obj.attachEvent) {
        obj.attachEvent('on' + sEvent, function() {
            fn.call(obj);
        });
    } else {
        obj.addEventListener(sEvent, fn, false);
    }

}

function startMove(obj, json, fnEnd) {
    if (obj.timer) clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        doMove(obj, json, fnEnd);
    }, 30);
}

function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];

}

function doMove(obj, json, fnEnd) {
    var iCur = 0;
    var attr = '';
    var bStop = true;
    for (attr in json) {
        attr == 'opacity' ? iCur = parseInt(100 * parseFloat(getStyle(obj, 'opacity'))) : iCur = parseInt(getStyle(obj, attr));
        if (isNaN(iCur)) iCur = 0;
        if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
            var iSpeed = (json[attr] - iCur) / 3;
        } else {
            var iSpeed = (json[attr] - iCur) / 5;
        }
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (parseInt(json[attr]) != iCur) bStop = false;
        if (attr == 'opacity') {
            obj.style.filter = "alpha(opacity:" + (iCur + iSpeed) + ")";
            obj.style.opacity = (iCur + iSpeed) / 100;
        } else {
            attr == 'zIndex' ? obj.style[attr] = iCur + iSpeed : obj.style[attr] = iCur + iSpeed + 'px';
        }
    }

    if (bStop) {
        clearInterval(obj.timer);
        obj.timer = null;
        if (fnEnd) fnEnd();
    }
}
// 3d相册
