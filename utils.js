module.exports = {
    /**
     *  @desc 数组操作
     */
    /**
     * 数组去重
     *
     * @param  Array  arr    [目标数组]
     * @return Array         [去重后的数组]
     */

    getUniqueArray: function (arr) {
        return Array.from(new Set(arr))
    },

    /**
     * 从数组中随机获取一个
     *
     * @param  Array  arr    [目标数组]
     * @return               [数组中随机的一个]
     */

    getRandomOne: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    /******************************************************************************************/


    /**
     * 格式化时间函数
     *
     * @param  String  value    [时间戳，字符串和number类型都可以，以毫秒或者以秒为单位]
     * @param  String  format   [格式化的结构，常见填'YYYY/MM/DD hh:mm:ss+S'，最多可精确到毫秒级别]
     * @return String           [参照format的格式化结果]
     */
    /**
     *  @desc 日期库
     */
    /**
     *  使用示例
        formatDate(); // 2016-09-02 13:17:13
        formatDate(new Date(), 'yyyy-MM-dd'); // 2016-09-02
        formatDate(new Date(), 'yyyy-MM-dd 第q季度 www HH:mm:ss:SSS');// 2016-09-02 第3季度 星期五 13:19:15:792
        formatDate(1472793615764); // 2016-09-02 13:20:15
     */

    formatTime: function (value, format) {
        if (!value || (+value) !== (+value)) {
            return value;
        }
        if (value.toString().length === 10) {
            value = (+value) * 1000;
        }
        const date = new Date(value);
        const o = {
            'M+': date.getMonth() + 1, // month
            'D+': date.getDate(), // day
            'h+': date.getHours(), // hour
            'm+': date.getMinutes(), // minute
            's+': date.getSeconds(), // second
            'S': date.getMilliseconds() // millisecond
        };

        if (/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1,
                date.getFullYear().toString().substr(4 - RegExp.$1.length));
        }

        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }

        return format;
    },

    /**
     * 将日期格式化成指定格式的字符串
     * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
     * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
     * @returns 返回格式化后的日期字符串
     */
    formatDate: function (date, fmt) {
        date = date == undefined ? new Date() : date;
        date = typeof date == 'number' ? new Date(date) : date;
        fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
        var obj = {
            'y': date.getFullYear(), // 年份，注意必须用getFullYear
            'M': date.getMonth() + 1, // 月份，注意是从0-11
            'd': date.getDate(), // 日期
            'q': Math.floor((date.getMonth() + 3) / 3), // 季度
            'w': date.getDay(), // 星期，注意是0-6
            'H': date.getHours(), // 24小时制
            'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
            'm': date.getMinutes(), // 分钟
            's': date.getSeconds(), // 秒
            'S': date.getMilliseconds() // 毫秒
        };
        var week = ['天', '一', '二', '三', '四', '五', '六'];
        for (var i in obj) {
            fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
                var val = obj[i] + '';
                if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
                for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
                return m.length == 1 ? val : val.substring(val.length - m.length);
            });
        }
        return fmt;
    },
    /**
     * 将字符串解析成日期
     * @param str 输入的日期字符串，如'2014-09-13'
     * @param fmt 字符串格式，默认'yyyy-MM-dd'，支持如下：y、M、d、H、m、s、S，不支持w和q
     * @returns 解析后的Date类型日期
     */
    parseDate: function (str, fmt) {
        fmt = fmt || 'yyyy-MM-dd';
        var obj = {
            y: 0,
            M: 1,
            d: 0,
            H: 0,
            h: 0,
            m: 0,
            s: 0,
            S: 0
        };
        fmt.replace(/([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g, function (m, $1, $2, $3, $4, idx, old) {
            str = str.replace(new RegExp($1 + '(\\d{' + $2.length + '})' + $4), function (_m, _$1) {
                obj[$3] = parseInt(_$1);
                return '';
            });
            return '';
        });
        obj.M--; // 月份是从0开始的，所以要减去1
        var date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s);
        if (obj.S !== 0) date.setMilliseconds(obj.S); // 如果设置了毫秒
        return date;
    },
    /**
     * 将一个日期格式化成友好格式，比如，1分钟以内的返回“刚刚”，
     * 当天的返回时分，当年的返回月日，否则，返回年月日
     * @param {Object} date
     */
    formatDateToFriendly: function (date) {
        date = date || new Date();
        date = typeof date === 'number' ? new Date(date) : date;
        var now = new Date();
        if ((now.getTime() - date.getTime()) < 60 * 1000) return '刚刚'; // 1分钟以内视作“刚刚”
        var temp = this.formatDate(date, 'yyyy年M月d');
        if (temp == this.formatDate(now, 'yyyy年M月d')) return this.formatDate(date, 'HH:mm');
        if (date.getFullYear() == now.getFullYear()) return this.formatDate(date, 'M月d日');
        return temp;
    },
    /**
     * 将一段时长转换成友好格式，如：
     * var str = friendlyDate('1311111119999'); //  6年前（括号里的字符串值为1970年距字符串值表示的时间的毫秒数）
     * var str2 = friendlyDate('1503190042273'); // 1天前
     * @param {Object} second
     */
    friendlyDate: function (time) {
        var offset = +new Date - time;
        var seconds = 1000,
            minutes = seconds * 60,
            hours = minutes * 60,
            days = hours * 24,
            months = days * 30,
            years = months * 12;
        var t;
        if (offset >= years) {
            t = parseInt(offset / years);
            return t + '年前';
        } else if (offset >= months) {
            t = parseInt(offset / months)
            return t + '个月前';
        } else if (offset >= days) {
            t = parseInt(offset / days);
            return t + '天前';
        } else if (offset >= hours) {
            t = parseInt(offset / hours);
            return t + '小时前';
        } else if (offset >= minutes) {
            t = parseInt(offset / minutes);
            return t + '分钟前';
        } else if (offset >= seconds) {
            return '刚刚';
        }
    },
    /**
     * 将一段时长转换成友好格式，如：
     * 147->“2分27秒”
     * 1581->“26分21秒”
     * 15818->“4小时24分”
     * @param {Object} second
     */
    formatDurationToFriendly: function (second) {
        if (second < 60) return second + '秒';
        else if (second < 60 * 60) return (second - second % 60) / 60 + '分' + second % 60 + '秒';
        else if (second < 60 * 60 * 24) return (second - second % 3600) / 60 / 60 + '小时' + Math.round(second % 3600 / 60) + '分';
        return (second / 60 / 60 / 24).toFixed(1) + '天';
    },
    /** 
     * 将时间转换成MM:SS形式 
     */
    formatTimeToFriendly: function (second) {
        var m = Math.floor(second / 60);
        m = m < 10 ? ('0' + m) : m;
        var s = second % 60;
        s = s < 10 ? ('0' + s) : s;
        return m + ':' + s;
    },
    /**
     * 判断某一年是否是闰年
     * @param year 可以是一个date类型，也可以是一个int类型的年份，不传默认当前时间
     */
    isLeapYear: function (year) {
        if (year === undefined) year = new Date();
        if (year instanceof Date) year = year.getFullYear();
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    },
    /**
     * 获取某一年某一月的总天数，没有任何参数时获取当前月份的
     * 方式一：$.getMonthDays();
     * 方式二：$.getMonthDays(new Date());
     * 方式三：$.getMonthDays(2013, 12);
     */
    getMonthDays: function (date, month) {
        var y, m;
        if (date == undefined) date = new Date();
        if (date instanceof Date) {
            y = date.getFullYear();
            m = date.getMonth();
        } else if (typeof date == 'number') {
            y = date;
            m = month - 1;
        }
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 非闰年的一年中每个月份的天数
        //如果是闰年并且是2月
        if (m == 1 && this.isLeapYear(y)) return days[m] + 1;
        return days[m];
    },
    /**
     * 计算2日期之间的天数，用的是比较毫秒数的方法
     * 传进来的日期要么是Date类型，要么是yyyy-MM-dd格式的字符串日期
     * @param date1 日期一
     * @param date2 日期二
     */
    countDays: function (date1, date2) {
        var fmt = 'yyyy-MM-dd';
        // 将日期转换成字符串，转换的目的是去除“时、分、秒”
        if (date1 instanceof Date && date2 instanceof Date) {
            date1 = this.format(fmt, date1);
            date2 = this.format(fmt, date2);
        }
        if (typeof date1 === 'string' && typeof date2 === 'string') {
            date1 = this.parse(date1, fmt);
            date2 = this.parse(date2, fmt);
            return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
        } else {
            console.error('参数格式无效！');
            return 0;
        }
    },


    /******************************************************************************************/


    /**
     *  @desc 金钱库
     */
    /**
     * 金钱千位分隔符插入函数
     *
     * @param  String/Number   value    [以元为单位的一个数值]
     * @return String                   [整数部分每三位插入一个逗号的字符串]
     */
    insertSeparatorMoney: function (value) {
        var num = value;
        //防止空字符串或者其他异常输入如undefined，还有不能转化为数字的输入出现如100abc这样的。
        if (!num || isNaN(+num)) {
            return value;
        }

        //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
        num = num.toString().replace(/\$|\,/g, '');

        //如果num是负数，则保留符号
        let sign = '';
        if (num.indexOf('-') === 0) {
            sign = '-';
            num = num.slice(1);
        }

        //如果存在小数点，则获取数字的小数部分
        let decimalPointIndex = num.indexOf('.'); //小数点位置
        let cents = decimalPointIndex > 0 ? num.slice(decimalPointIndex) : '';
        cents = cents.length > 1 ? cents : ''; //小数兼容处理，如果只有小数点没有小数位则舍弃

        //获取数字的整数数部分
        num = decimalPointIndex > 0 ? num.slice(0, decimalPointIndex) : num;

        //整数部分若以0开头，例如值是01000/0.55/040.60，都会当做无效数字而直接返回。
        if ('0' === num[0]) {
            return value;
        }

        //针对整数部分进行格式化处理
        //字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，往前数直到不到往前数少于三位字符为止
        // let res = '';
        // for (let i = 0, j = num.length; i < j; i++) {
        //     res = num[j - i - 1].concat(res);
        //     //每三位，并且不是最高位的情况下插入逗号。
        //     if ((i + 1) !== j && (i + 1) % 3 === 0) {
        //         res = ','.concat(res);
        //     }
        // }
        // num = res;
        num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        //将数据（符号、整数部分、小数部分）整体组合返回
        return sign + num + cents;
    },

    /*现金额大写转换*/
    //upDigit(168752632)
    //"人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    //upDigit(1682)
    //"人民币壹仟陆佰捌拾贰元整"
    //upDigit(-1693)
    //"欠人民币壹仟陆佰玖拾叁元整"
    upDigit: function (n) {
        var fraction = ['角', '分', '厘'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠人民币' : '人民币';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s; 
            s = p + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },



    /******************************************************************************************/

    /**
     *  @desc 其他函数
     */

    /**
     * 深拷贝对象
     *
     * @param  Object      [目标对象]
     * @return Object         [拷贝结果]
     */
    deepCopyObj: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /*去除空格*/
    //  type 1-所有空格  2-前后空格  3-前空格 4-后空格
    trim: function (str, type = 1) {
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },

    /*type
    1:首字母大写   
    2：首页母小写
    3：大小写转换
    4：全部大写
    5：全部小写
     */
    //changeCase('asdasd',1)
    //Asdasd
    changeCase: function (str, type = 1) {
        function ToggleCase(str) {
            var itemText = ""
            str.split("").forEach(
                function (item) {
                    if (/^([a-z]+)/.test(item)) {
                        itemText += item.toUpperCase();
                    } else if (/^([A-Z]+)/.test(item)) {
                        itemText += item.toLowerCase();
                    } else {
                        itemText += item;
                    }
                });
            return itemText;
        }

        switch (type) {
            case 1:
                return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                    return v1.toUpperCase() + v2.toLowerCase();
                });
            case 2:
                return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                    return v1.toLowerCase() + v2.toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },

    //字符串替换(字符串,要替换的字符,替换成什么)
    replaceAll: function (str, AFindText, ARepText) {　　　
        raRegExp = new RegExp(AFindText, "g");　　　
        return str.replace(raRegExp, ARepText);
    },


    /**
     * 生成指定位数的随机字符串，字符串的内容包括小数和小写字母。
     *
     * @param  String  url    [url地址字符串]
     * @return Object         [url解析结果，包裹host，path，params]
     */
    getRandomString: function (len) {
        let rdmString = '';
        while (rdmString.length < len) {
            rdmString += Math.random().toString(36).substr(2);
        }
        return rdmString.substr(0, len);
    },

    /**
     * 获取url参数
     *
     * @param  String  url    [url地址字符串]
     * @return Object         [url param]
     * getUrlPrmt('segmentfault.com/write?draftId=122000011938') //{draftId: "122000011938"}
     */
    getUrlPrmt(url) {
        let paramStr = url.substring(url.indexOf('?') + 1);
        let paramArr = paramStr.split('&');
        let res = {};
        paramArr.forEach(function (item) {
            let pos = item.indexOf('=');
            let name = item.substring(0, pos);
            res[name] = item.substring(pos + 1);
        });
        return res;
    },

    /**
     * 返回当前浏览器是什么类型的浏览器
     */
    userBrowser: function () {
        var browserName = navigator.userAgent.toLowerCase();
        if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
            console.log("IE");
        } else if (/firefox/i.test(browserName)) {
            console.log("Firefox");
        } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
            console.log("Chrome");
        } else if (/opera/i.test(browserName)) {
            console.log("Opera");
        } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
            console.log("Safari");
        } else {
            console.log("不知道");
        }
    },

    // 循环出options的value和text
    getOptions: function (json) {
        if (Array.isArray(json)) {
            return json.map(x => {
                return {
                    value: x,
                    text: x
                };
            });
        }
        var list = [];
        for (var key in json) {
            list.push({
                value: key,
                text: json[key]
            });
        }
        return list;
    },


    //每个值加上一个空白value
    initUI: function (ui) {
        Object.keys(ui.fileds).map(k => {
            let item = ui.fileds[k];
            item.value = item.value || '';
            if (item.linkFiled) {
                item.linkFiled.value = item.linkFiled.value || '';
            }
        });
        return ui;
    },



};