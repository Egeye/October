/**
 * 替换浏览器标签名字
 * 从 let interval开始复制，可直接在浏览器控制台执行
 */
function changeBrowserTabTitle() {
    let interval = null;
    (function () {
        // 获取icon所在link，rel*="icon"是为了兼容rel="shortcut icon"的情况
        const Link = document.querySelector('link[rel*="icon"]');
        const sourceTitile = document.title;
        const sourceLink = Link.href;
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                // 让title文字动起来，更加醒目
                interval = setInterval(scroll, 1000);
                // 修改title，这里也可以直接写文字，之所以用编码后的嘛，🤔，是因为不想让你一眼看出代码里下了毒...
                // document.title = decodeURI(
                //     '%E6%82%A8%E6%AD%A3%E5%9C%A8%E6%B5%8F%E8%A7%88%E9%BB%84%E8%89%B2%E7%BD%91%E7%AB%99...'
                // );

                document.title = 'jsf2222asdfasdf22s13414222asdf222222423423522222534253453452222222222222222222222222222222222222222222222sadf';

                Link.href =
                    'https://king-hcj.github.io/images/posts/zhuangbility100/nh.gif?raw=true';
                Link.type = 'image/gif';
            } else {
                clearInterval(interval);
                document.title = sourceTitile;
                Link.href = sourceLink;
            }
        });
    })();

    function scroll() {
        // 让title文字动起来，更加醒目
        const titleInfo = document.title;
        const firstInfo = titleInfo.charAt(0);
        const lastInfo = titleInfo.substring(1, titleInfo.length);
        document.title = lastInfo + firstInfo;
    }
}

/**
 * 让网页嗨起来
 * 加背景音乐，让网页内容动起来
 * 可直接在浏览器控制台执行内容
 */
function letUsDance() {
    setTimeout(letDance, 1000);
    var bgmSrc =
        'https://nd002723.github.io/carnival/audio/Martin%20Jensen%20-%20Fox%20(Loop%20Remix).mp3';
    var cssHref = 'https://nd002723.github.io/carnival/css/high.css';

    function letDance() {
        function loadCss() {
            //将css文件引入页面
            var myCss = document.createElement('link');
            myCss.setAttribute('type', 'text/css');
            myCss.setAttribute('rel', 'stylesheet');
            myCss.setAttribute('href', cssHref); //css文件地址
            myCss.setAttribute('class', l);
            document.body.appendChild(myCss);
        }

        function h() {
            var e = document.getElementsByClassName(l);
            for (var t = 0; t < e.length; t++) {
                document.body.removeChild(e[t]);
            }
        }

        function p() {
            var e = document.createElement('div');
            e.setAttribute('class', a);
            document.body.appendChild(e);
            setTimeout(function () {
                document.body.removeChild(e);
            }, 100);
        }

        function getSize(e) {
            //获取目标的宽高
            return {
                height: e.offsetHeight,
                width: e.offsetWidth,
            };
        }

        function checkSize(i) {
            //判断目标大小是否符合要求
            var s = getSize(i); //获取目标的宽高
            return (
                s.height > minHeight &&
                s.height < maxHeight &&
                s.width > minWidth &&
                s.width < maxWidth
            ); //判断目标是否符合条件
        }

        function m(e) {
            var t = e;
            var n = 0;
            while (!!t) {
                n += t.offsetTop;
                t = t.offsetParent;
            }
            return n;
        }

        function g() {
            var e = document.documentElement;
            if (!!window.innerWidth) {
                return window.innerHeight;
            } else if (e && !isNaN(e.clientHeight)) {
                return e.clientHeight;
            }
            return 0;
        }

        function y() {
            if (window.pageYOffset) {
                return window.pageYOffset;
            }
            return Math.max(
                document.documentElement.scrollTop,
                document.body.scrollTop
            );
        }

        function E(e) {
            var t = m(e);
            return t >= w && t <= b + w;
        }

        function setBgm() {
            //设置音乐
            var e = document.createElement('audio');
            e.setAttribute('class', l);
            e.src = bgmSrc; //bgm地址
            e.loop = false;
            e.addEventListener(
                'canplay',
                function () {
                    setTimeout(function () {
                        x(k);
                    }, 500);
                    setTimeout(function () {
                        N();
                        p();
                        for (var e = 0; e < O.length; e++) {
                            T(O[e]);
                        }
                    }, 15500);
                },
                true
            );
            e.addEventListener(
                'ended',
                function () {
                    N();
                    h();
                },
                true
            );
            e.innerHTML =
                ' <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>';
            document.body.appendChild(e);
            e.play();
        }

        function x(e) {
            e.className += ' ' + s + ' ' + o;
        }

        function T(e) {
            e.className += ' ' + s + ' ' + u[Math.floor(Math.random() * u.length)];
        }

        function N() {
            var e = document.getElementsByClassName(s);
            var t = new RegExp('\\b' + s + '\\b');
            for (var n = 0; n < e.length;) {
                e[n].className = e[n].className.replace(t, '');
            }
        }

        var minHeight = 3; //最小高度
        var minWidth = 3; //最小宽度
        var maxHeight = 800; //最大高度
        var maxWidth = 1400; //最大宽度
        var s = 'mw-harlem_shake_me';
        var o = 'im_first';
        var u = ['im_drunk', 'im_baked', 'im_trippin', 'im_blown'];
        var a = 'mw-strobe_light';
        var l = 'mw_added_css'; //最终要移除的css
        var b = g();
        var w = y();
        var C = document.getElementsByTagName('*');
        var k = null;
        for (var L = 0; L < C.length; L++) {
            var targetDiv = C[L];
            if (checkSize(targetDiv)) {
                if (E(targetDiv)) {
                    k = targetDiv;
                    break;
                }
            }
        }
        if (targetDiv === null) {
            //如果没找到合适大小的
            console.warn('没能找到合适的大小. 换一个页面试试？.');
            return;
        }

        loadCss(); //将自定义css文件引入页面
        setBgm(); //添加背景音乐

        var O = [];
        for (var L = 0; L < C.length; L++) {
            var targetDiv = C[L];
            if (checkSize(targetDiv)) {
                O.push(targetDiv);
            }
        }

        //网页整体倾斜效果（这块儿本来是JQuery实现的，为了避免引入JQuery，做了改动。）
        var style = document.createElement('style');
        style.type = 'text/css';
        try {
            style.appendChild(
                document.createTextNode(
                    'body{overflow-x:hidden;transform: rotate(1deg);-webkit-transform: rotate(1deg);-moz-transform: rotate(1deg);-o-transform: rotate(1deg);-ms-transform: rotate(1deg)}'
                )
            );
        } catch (ex) {
            style.styleSheet.cssText = 'body{background-color:red}'; //针对IE
        }
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    }
}

/**
 * 格式化日期
 * @param date 日期
 * @param fmt 格式
 * @returns {string} 格式化结果
 */
function formatDate(date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
    let o = {
        //月份
        'M+': date.getMonth() + 1,
        //日
        'd+': date.getDate(),
        //小时
        'h+': date.getHours(),
        //分
        'm+': date.getMinutes(),
        //秒
        's+': date.getSeconds(),
        //季度
        'q+': Math.floor((date.getMonth() + 3) / 3),
        //毫秒
        S: date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return fmt
}

/**
 *
 * 利用a标签解析url,提取域名，查询关键字，变量参数值等的需要
 *
 * H5 有新的 API URL 也可以快速的处理一个链接
 * var url = new URL('https://www.baidu.com/')
 * url.hash
 * @param url
 * @param key
 * @returns {{path: string, protocol: string, file: string, port: string, query: string, href: *, params, hash: string, relative: string, segments: string[]}}
 */
function urlParse(url, key) {
    var a = document.createElement('a')
    a.href = url
    var result = {
        href: url,
        protocol: a.protocol.replace(':', ''),
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {}, centArr,
                seg = a.search.replace(/^\?/, '').replace(/^\?/, '').split('&')
            for (i = 0, len = seg.length; i < len; i++) {
                if (!seg[i]) {
                    continue
                }
                centArr = seg[i].split('=')
                ret[centArr[0]] = centArr[1]
            }
            return ret
        }()),
        hash: a.hash,
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    }
    a = null
    return key ? result[key] : result
}

/**
 * 生成随机字符串
 * @param len 需要多长的字符串 number
 * @returns {string}
 */
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2)) ;
    return rdmString.substr(0, len);
}

// 重写console ，给console输出内容添加样式
let _log = console.log;
console.log2 = function () {
    _log.call(console, '%c' + [].slice.call(arguments).join(' '), 'color:transparent;text-shadow:0 0 2px rgba(0,0,0,.5);background-color:green;');
};

function handleScroll2() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    //如何计算滚动速度???
    //利用定时器，来计算滚动速度(滚动条在timeScale没有被连续滚动则结束间隔)
    let distance = 0,
        startTimer = null,
        beginTime = 0,
        speed = 0
    const timeScale = 100 //检测滚动停止的时间
    window.onscroll = () => {
        let tempScrollTop = document.documentElement.scrollTop || document.body.scrollTop
        distance += tempScrollTop - scrollTop //间隔时间内滑动的距离（+向下，-向上）
        console.log('distance', distance)
        scrollTop = tempScrollTop //下一次滚动开始时滚动条初始位置
        clearTimeout(startTimer) //清除开始定时器
        if (!beginTime) {
            beginTime = new Date().getTime() //如果timer为0,则开始滚动,则获取起始时间
        }
        startTimer = setTimeout(() => {
            //设置开始定时器
            let overTime = new Date().getTime() //延时500ms后，滚动后结束的时间
            //console.log(overTime)
            let diffTimer = (overTime - beginTime - timeScale) / 1000 //时间差 = 结束-开始-500ms
            speed = distance / diffTimer
            distance = 0 //间隔距离归零
            beginTime = 0 //起始时间
            console.log('speed', speed)
        }, timeScale)
    }
}


/**
 * 数字价格千分位分割
 * @param price:string 价格
 * @param withDecimal:boolean 小数部分
 * @return {string}
 */
function pricePerThousandDivide(price = '0', withDecimal = false) {
    if (price) {
        price += '';
    }
    if (price === '0') {
        return '0';
    }
    let reg = /(?!^)(?=(\d{3})+$)/g;
    if (withDecimal) {
        reg = new RegExp(`(?!^)(?=(\\d{3})+${price.includes('.') ? '\\.' : '$'})`)
    }
    return price.replace(reg, ',')
}


function blockDebugger() {
    // (() => {
    //         function blockIt() {
    //             setInterval(() => {debugger;}, 50);
    //         }
    //         try {
    //             blockIt();
    //         } catch (err) {
    //         }
    //     }
    // )()

    // (() => {
    //     function block() {
    //         setInterval(() => {
    //             Function("debugger")();
    //         }, 50);
    //     }
    //
    //     try {
    //         block();
    //     } catch (err) {
    //     }
    // })();

    (() => {
        function block() {
            if (
                window.outerHeight - window.innerHeight > 200 ||
                window.outerWidth - window.innerWidth > 200
            ) {
                document.body.innerHTML =
                    "检测到非法调试,请关闭后刷新重试!";
            }
            setInterval(() => {
                (function () {
                    return false;
                }
                    ["constructor"]("debugger")
                    ["call"]());
            }, 50);
        }
        try {
            block();
        } catch (err) {}
    })();
}
