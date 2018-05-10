module.exports = {
    //UA库

    // 选择符合条件的一个,ua函数使用的
    filterItem(ua, ...args) {
        return args.filter(x => ua['is' + x])[0] || 'unknown';
    },

    //获取用户环境 浏览器数据,手机系统
    /*
    手机浏览器: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G36 Safari/601.1",
    
    MacBook: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
     */
    // 使用:var getUA = require('ifun/ua');
    // var ua = getUA();
    // 或
    // var ua = getUA(req.headers['user-agent']);
    getUA(userAgent) {
        var ua = {};
        var _ua = ua.source = userAgent || navigator.userAgent;

        ua.isIphone = /iphone/i.test(_ua);
        ua.isIpad = /ipad/i.test(_ua);
        ua.isAndroid = /android/i.test(_ua);

        ua.isChrome = /chrome/i.test(_ua);
        ua.isSafari = /safari/i.test(_ua) && !ua.isChrome;
        ua.isFirefox = /firefox/i.test(_ua);
        ua.isIe = /msie/i.test(_ua);
        ua.isOpera = /opera/i.test(_ua);
        ua.isWechat = /MicroMessenger|MQQBrowser/i.test(_ua);

        ua.isCordova = typeof (window) == "object" && window.cordova ? true : false;

        ua.isBrowser = ua.isSafari || ua.isChrome || ua.isFirefox || ua.isIe || ua.isOpera;
        ua.isIos = ua.isIphone || ua.isIpad;
        ua.isMobile = ua.isIos || ua.isAndroid;

        ua.isNative = ua.isMobile && !ua.isBrowser && !ua.isWechat; //有问题

        ua.isWindow = /window/i.test(_ua);
        ua.isMac = /Macintosh/i.test(_ua);
        ua.isLinux = /Linux/i.test(_ua);

        ua.isPc = !ua.isMobile;
        ua.isPad = /pad/i.test(_ua);
        ua.isPhone = ua.isIphone || ua.isAndroid && !ua.isPad;

        ua.deviceType = this.filterItem(ua, 'Pc', 'Pad', 'Phone');//设备
        ua.device = 'unknown'; //暂时不好判断
        ua.os = this.filterItem(ua, 'Ios', 'Android', 'Window', 'Mac', 'Linux');//系统
        ua.browser = this.filterItem(ua, 'Wechat', 'Chrome', 'Safari', 'Firefox', 'Ie', 'Opera');//浏览器

        return ua;
    },

    //返回当前浏览器是什么类型的浏览器
    userBrowser() {
        var browserName = navigator.userAgent.toLowerCase();
        if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
            return "IE"
        } else if (/firefox/i.test(browserName)) {
            return "Firefox"
        } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
            return "Chrome"
        } else if (/opera/i.test(browserName)) {
            return "Opera"
        } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
            return "Safari"
        } else {
            return "unknown"
        }
    },

    //手机类型判断
    browserInfo(type) {
        switch (type) {
            case 'android':
                return navigator.userAgent.toLowerCase().indexOf('android') !== -1
            case 'iphone':
                return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
            case 'ipad':
                return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
            case 'weixin':
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            default:
                return navigator.userAgent.toLowerCase()
        }
    },

    //是否为PC端
    isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
}