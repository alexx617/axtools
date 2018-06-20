module.exports = {
    //校验库

    //检测字符串是否符合验证规则
    //checkType.check('10086@qq.com','email')
    //result：true

    // 添加自定义规则
    //checkType.addRule('password', str => {
	// 	return /^[-a-zA-Z0-9._]+$/.test(str);
	//})
	//console.log(checkType.check('123123', 'password'));
    //result：true
    checkType: (() => {
        let rules = {
            phone(str) {//手机号码
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            },
            tel(str) {//座机
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            },
            card(str) {//身份证
                return /^\d{15}|\d{18}$/.test(str);
            },
            pwd(str) {//密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
                return /^[a-zA-Z]\w{5,17}$/.test(str)
            },
            postal(str) {//邮政编码
                return /[1-9]\d{5}(?!\d)/.test(str);
            },
            QQ(str) {//QQ号
                return /^[1-9][0-9]{4,9}$/.test(str);
            },
            email(str) {//邮箱
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            },
            money(str) {//金额(小数点2位)
                return /^\d*(?:\.\d{0,2})?$/.test(str);
            },
            URL(str) {//网址
                return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
            },
            IP(str) {//IP
                return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
            },
            date(str) {//日期时间
                return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
            },
            number(str) {//数字
                return /^[0-9]$/.test(str);
            },
            english(str) {//英文
                return /^[a-zA-Z]+$/.test(str);
            },
            chinese(str) {//中文
                return /^[\u4E00-\u9FA5]+$/.test(str);
            },
            lower(str) {//小写
                return /^[a-z]+$/.test(str);
            },
            upper(str) {//大写
                return /^[A-Z]+$/.test(str);
            },
            HTML(str) {//HTML标记
                return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
            },
        }
        return {
            check(str, type) {
                return rules[type] ? rules[type](str) : false;
            },
            addRule(type, fn) {
                rules[type] = fn;
            }
        }
    })(),

    //检测密码强度
    //checkPwd('12asdASAD')
    //result：3(强度等级为3)
    checkPwd(str) {
        let nowLv = 0;
        if (str.length < 6) {
            return nowLv
        }
        if (/[0-9]/.test(str)) {
            nowLv++
        }
        if (/[a-z]/.test(str)) {
            nowLv++
        }
        if (/[A-Z]/.test(str)) {
            nowLv++
        }
        if (/[\.|-|_]/.test(str)) {
            nowLv++
        }
        return nowLv;
    },
}