export default {

    //日期库

    // 将日期时间戳格式化成指定格式
    // formatDate(); // 2016-09-02 13:17:13
    // formatDate(new Date(), 'yyyy-MM-dd'); // 2016-09-02
    // formatDate(new Date(), 'yyyy-MM-dd 第q季度 www HH:mm:ss:SSS');// 2016-09-02 第3季度 星期五 13:19:15:792
    // formatDate(1472793615764); // 2016-09-02 13:20:15
    formatDate(date, fmt) {
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

    //时间戳转时间,这是另一种方式 2018-07-09 11:04:51
    timetrans(date) {
        var date = new Date(date * 1000);//如果date为10位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    },

    //将一个日期格式化成友好格式，比如，1分钟以内的返回“刚刚”，当天的返回时分，当年的返回月日，否则，返回年月日
    formatDateToFriendly(date) {
        date = date || new Date();
        date = typeof date === 'number' ? new Date(date) : date;
        var now = new Date();
        if ((now.getTime() - date.getTime()) < 60 * 1000) return '刚刚'; // 1分钟以内视作“刚刚”
        var temp = this.formatDate(date, 'yyyy年M月d日');
        if (temp == this.formatDate(now, 'yyyy年M月d日')) return this.formatDate(date, 'HH:mm');
        if (date.getFullYear() == now.getFullYear()) return this.formatDate(date, 'M月d日');
        return temp;
    },

    //将一段时长转换成友好格式，如：
    //var str = friendlyDate('1311111119999'); //  6年前（括号里的字符串值为1970年距字符串值表示的时间的毫秒数）
    //var str2 = friendlyDate('1503190042273'); // 1天前
    friendlyDate(time) {
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

    //将一段时长转换成友好格式
    //147->“2分27秒”
    //1581->“26分21秒”
    //15818->“4小时24分”
    formatDurationToFriendly(second) {
        if (second < 60) return second + '秒';
        else if (second < 60 * 60) return (second - second % 60) / 60 + '分' + second % 60 + '秒';
        else if (second < 60 * 60 * 24) return (second - second % 3600) / 60 / 60 + '小时' + Math.round(second % 3600 / 60) + '分';
        return (second / 60 / 60 / 24).toFixed(1) + '天';
    },

    //将时间转换成MM:SS形式 
    formatTimeToFriendly(second) {
        let m = Math.floor(second / 60);
        m = m < 10 ? ('0' + m) : m;
        let s = second % 60;
        s = s < 10 ? ('0' + s) : s;
        return m + ':' + s;
    },
    // 判断某一年是否是闰年 可以是一个date类型，也可以是一个int类型的年份，不传默认当前时间
    isLeapYear(year) {
        if (year === undefined) year = new Date();
        if (year instanceof Date) year = year.getFullYear();
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    },
    //获取某一年某一月的总天数，没有任何参数时获取当前月份的
    //方式一：$.getMonthDays();
    //方式二：$.getMonthDays(new Date());
    //方式三：$.getMonthDays(2013, 12);
    getMonthDays(date, month) {
        let y, m;
        if (date == undefined) date = new Date();
        if (date instanceof Date) {
            y = date.getFullYear();
            m = date.getMonth();
        } else if (typeof date == 'number') {
            y = date;
            m = month - 1;
        }
        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 非闰年的一年中每个月份的天数
        //如果是闰年并且是2月
        if (m == 1 && this.isLeapYear(y)) return days[m] + 1;
        return days[m];
    },

    //计算两个日期之间的天数，用的是比较毫秒数的方法
    //传进来的日期要么是Date类型，要么是yyyy-MM-dd格式的字符串日期
    //@param date1 日期一
    //@param date2 日期二
    countDays(date1, date2) {
        var fmt = 'yyyy-MM-dd';
        // 将日期转换成字符串，转换的目的是去除“时、分、秒”
        if (date1 instanceof Date && date2 instanceof Date) {
            date1 = this.format(fmt, date1);
            date2 = this.format(fmt, date2);
        }
        if (typeof date1 === 'string' && typeof date2 === 'string') {
            date1 = this.parseDate(date1, fmt);
            date2 = this.parseDate(date2, fmt);
            return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
        } else {
            console.error('参数格式无效！');
            return 0;
        }
    },

    //将字符串解析成日期
    //@param str 输入的日期字符串，如'2014-09-13'
    //@param fmt 字符串格式，默认'yyyy-MM-dd'，支持如下：y、M、d、H、m、s、S，不支持w和q
    //@returns 解析后的Date类型日期
    // parseDate('2016-08-11'); // Thu Aug 11 2016 00:00:00 GMT+0800
    // parseDate('2016-08-11 13:28:43', 'yyyy-MM-dd HH:mm:ss') // Thu Aug 11 2016 13:28:43 GMT+0800
    parseDate(str, fmt) {
        fmt = fmt || 'yyyy-MM-dd';
        var obj = { y: 0, M: 1, d: 0, H: 0, h: 0, m: 0, s: 0, S: 0 };
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

    //到某一个时间的倒计时,现在距${endTime}的剩余时间
    //getEndTime('2017/7/22 16:0:0')
    //result："剩余时间6天 2小时 28 分钟20 秒"
    getEndTime(endTime) {
        let startDate = new Date(); //开始时间，当前时间
        let endDate = new Date(endTime); //结束时间，需传入时间参数
        let t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
        let d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);//h = Math.floor(t / 1000 / 60 / 60);不显示天数的话使用这个
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
            // 补零
            d = d < 10 ? ("0" + d) : d;
            h = h < 10 ? ("0" + h) : h;
            m = m < 10 ? ("0" + m) : m;
            s = s < 10 ? ("0" + s) : s;
        }
        return { d, h, m, s };
    },

    /*获取某月有多少天*/
    getMonthOfDay(time) {
        var date = new Date(time)
        var year = date.getFullYear()
        var mouth = date.getMonth() + 1
        var days

        //当月份为二月时，根据闰年还是非闰年判断天数
        if (mouth == 2) {
            days = (year % 4 == 0 && year % 100 == 0 && year % 400 == 0) || (year % 4 == 0 && year % 100 != 0) ? 28 : 29
        } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
            //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
            days = 31
        } else {
            //其他月份，天数为：30.
            days = 30
        }
        return days
    },
    /*获取某年有多少天*/
    getYearOfDay(time) {
        var firstDayYear = this.getFirstDayOfYear(time);
        var lastDayYear = this.getLastDayOfYear(time);
        var numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime()) / 1000;
        return Math.ceil(numSecond / (24 * 3600));
    },

    /*获取某年的第一天*/
    getFirstDayOfYear(time) {
        var year = new Date(time).getFullYear();
        return year + "-01-01 00:00:00";
    },

    /*获取某年最后一天*/
    getLastDayOfYear(time) {
        var year = new Date(time).getFullYear();
        var dateString = year + "-12-01 00:00:00";
        var endDay = this.getMonthOfDay(dateString);
        return year + "-12-" + endDay + " 23:59:59";
    },

    /*获取某个日期是当年中的第几天*/
    getDayOfYear(time) {
        var firstDayYear = this.getFirstDayOfYear(time);
        var numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime()) / 1000;
        return Math.ceil(numSecond / (24 * 3600));
    },

    /*获取某个日期在这一年的第几周*/
    getDayOfYearWeek(time) {
        var numdays = this.getDayOfYear(time);
        return Math.ceil(numdays / 7);
    },

    //获取两个时间段差多久
    timeFn(time, fmt = 1) {//di作为一个变量传进来
        //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
        var dateBegin = new Date(time.replace(/-/g, "/"));//将-转化为/，使用new Date
        var dateEnd = new Date();//获取当前时间
        var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
        var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        if (fmt) {
            return `相差${dayDiff}天${hours}小时${minutes}分钟${seconds}秒`
        }
        return `${dateDiff}时间差的毫秒数,${dayDiff}计算出相差天数,${leave1}计算天数后剩余的毫秒数,${hours}计算出小时数,${minutes}计算相差分钟数,${seconds}计算相差秒数`
    },

    // 计算两个日期格式为(yyyy- MM - dd) 相差几个月
    disparityFewMonth(dateOne, dateTwo) {
        let datesOne = dateOne.split('-').map(item => Number(item));
        let datesTwo = dateTwo.split('-').map(item => Number(item));
        const diff = [0, 0, 0].map((value, index) => {
            return datesOne[index] - datesTwo[index]
        });
        return (diff[0] * 12 + diff[1]) + '月' + diff[2] + '天'
    },

    //time 秒数 => 4 =>4秒
    //根据返回的秒数计算时间 =>86400 =>返回1天 
    averageTime(time) {
        if (time == 0) return '-';
        let offset = Number(time);
        let seconds = 60;//秒
        let minutes = seconds * 60;//小时
        let days = minutes * 24;//天86400
        let t;

        if (offset < seconds) {
            t = offset;
            return t + '秒';
        } else if (offset < minutes) {
            t = Math.round(offset / seconds);
            return t + '分钟';
        } else if (offset < days) {
            t = offset / minutes;
            if (t.toString().indexOf('.') !== -1) {
                t = t.toFixed(1)
            } else {
                t = parseInt(t)
            }
            return t + '小时';
        } else if (offset >= days) {
            t = Math.round(offset / days);
            return t + '天';
        }
    }

}