export default {

    /********String类**********************************************************************************/

    //查找字符串
    //let strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
    //countStr(strTest,'blog')
    //result：6
    countStr(str, strSplit) {
        return str.split(strSplit).length - 1
    },

    //去除空格
    //  type 1-所有空格  2-前后空格  3-前空格 4-后空格
    trimBox(str, type = 1) {
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
    /**
     * @description 清除左右空格
     */
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    /**
     * @description 清除所有空格
     */
    trimAll(str) {
        return str.replace(/\s+/g, "");
    },
    /**
     * @description 清除左空格
     */
    trimLeft(str) {
        return str.replace(/(^\s*)/g, "");
    },
    /**
     * @description 清除右空格
     */
    trimRight(str) {
        return str.replace(/(\s*$)/g, "");
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
    changeCase(str, type = 1) {
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

    //字符串替换(字符串,要替换的字符或者正则表达式（不要写g）,替换成什么)
    //ecDo.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
    //result："这里是广州，中国第三大城市，广东省省会，简称穗，"
    replaceAll(str, AFindText, ARepText) {
        raRegExp = new RegExp(AFindText, "g");
        return str.replace(raRegExp, ARepText);
    },

    //某些字符替换为*
    //replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
    // param {String} str-待处理的字符串
    // param {Array} regArr-数据格式
    // param {Int} type-替换方式，(0-前面 1-后面)
    // param {String} ARepText-替换的字符，默认是‘*’

    // encryptStr('18819322663',[3,5,3],0,'+')
    // //result：188+++++663

    // encryptStr('18819233362',[3,5,3],1,'+')
    // //result：+++19233+++

    // encryptStr('18819233362',[5],0)
    // //result：*****233362

    // encryptStr('18819233362',[5],1)
    // //result："188192*****"
    encryptStr(str, regArr, type = 0, ARepText = '*') {
        let regtext = '',
            Reg = null,
            replaceText = ARepText;
        //replaceStr('18819322663',[3,5,3],0)//前3个不隐藏,后5个变成*,最后3个不隐藏
        //result：188*****663
        //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
        if (regArr.length === 3 && type === 0) {
            regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
            Reg = new RegExp(regtext);
            let replaceCount = this.repeatStr(replaceText, regArr[1]);
            return str.replace(Reg, '$1' + replaceCount + '$2')
        }
        //replaceStr('asdasdasdaa',[3,5,3],1)
        //result：***asdas***
        else if (regArr.length === 3 && type === 1) {
            regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
            Reg = new RegExp(regtext);
            let replaceCount1 = this.repeatStr(replaceText, regArr[0]);
            let replaceCount2 = this.repeatStr(replaceText, regArr[2]);
            return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
        }
        //replaceStr('1asd88465asdwqe3',[5],0)
        //result：*****8465asdwqe3
        else if (regArr.length === 1 && type === 0) {
            regtext = '(^\\w{' + regArr[0] + '})'
            Reg = new RegExp(regtext);
            let replaceCount = this.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
        //replaceStr('1asd88465asdwqe3',[5],1,'+')
        //result："1asd88465as+++++"
        else if (regArr.length === 1 && type === 1) {
            regtext = '(\\w{' + regArr[0] + '}$)'
            Reg = new RegExp(regtext);
            let replaceCount = this.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
    },

    //字符串循环复制
    //repeatStr(str->字符串, count->次数)
    //repeatStr('123',3)
    //"result：123123123"
    repeatStr(str, count) {
        return str.repeat(count);
    },


    //随机生成指定位数的随机字符串，字符串的内容包含小数和小写字母
    getRandomString(len) {
        let rdmString = '';
        while (rdmString.length < len) {
            rdmString += Math.random().toString(36).substr(2);
        }
        return rdmString.substr(0, len);
    },


}