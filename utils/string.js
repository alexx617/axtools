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

    // 空字符串''、null和undefined，认为是空值，0和false不是
    isEmptyValue(value) {
        if (value === '' || value === null || value === undefined) {
            return true
        } else {
            return false
        }
    },
    findMaxStr(str) {
        let o = {};
        for (let char of str) {
            if (o[char]) { //char就是对象o的一个属性，o[char]是属性值，o[char]控制出现的次数
                o[char]++; //次数加1
            } else {
                o[char] = 1; //若第一次出现，次数记为1
            }
        }
        console.log(o); //输出的是完整的对象，记录着每一个字符及其出现的次数
        //遍历对象，找到出现次数最多的字符和次数
        let max = 0;
        let maxChar = null;
        for (let key in o) {
            if (max < o[key]) {
                max = o[key]; //max始终储存次数最大的那个
                maxChar = key; //那么对应的字符就是当前的key
            }
        }
        return `"最多的字符是${maxChar},出现的次数是${max}`;
    },
    // 截取字符串并省略号
    subText(str, length) {
        if (str.length === 0) {
            return '';
        }
        if (str.length > length) {
            return str.substr(0, length) + "...";
        } else {
            return str;
        }
    },
    // 大小写转换
    /**
     * @param { string } str 待转换的字符串
     * @param { number } type 1-全大写 2-全小写 3-首字母大写 其他-不转换
     */
    turnCase(str, type) {
        switch (type) {
            case 1:
                return str.toUpperCase();
            case 2:
                return str.toLowerCase();
            case 3:
                return str[0].toUpperCase() + str.substr(1).toLowerCase();
            default:
                return str;
        }
    },
    // 去除空格

    /**
     * @param { string } str 待处理字符串
     * @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
     */
    trim(str, type = 1) {
        if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
        switch (type) {
            case 1:
                return str.replace(/\s/g, "");
            case 2:
                return str.replace(/(^\s)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s)/g, "");
            case 4:
                return str.replace(/(\s$)/g, "");
            default:
                return str;
        }
    },
    // 段落截取(适用于段落比较长,只显示段落中需要的部分,但需要的字不在头部的情况,需要把头部或者尾部截取成省略号,需要高亮的话需配合hightLight使用)
    // searchText => 需要搜索的字
    // list => 段落
    // maxLength => 显示范围(截取段落的长度,如果段落超过了这个长度就截取段落)
    // num => 写死-1(目的是重置)
    // set_hightLight => 是否需要高亮字体
    stringDotRep(searchText, list, maxLength, num, set_hightLight) {
        let searchText_ = searchText.toLowerCase().trim();
        let list_ = list.toLowerCase();
        if (num >= 0) {
            let searchText_arr = searchText.split('');
            searchText_ = searchText_arr[num];
        }
        let res = '';
        let idx = list_.indexOf(searchText_);
        if (idx !== -1) {
            if (list.length <= maxLength || idx <= maxLength) {//如果小于的话直接展示
                if (set_hightLight) {
                    return this.hightLight(list, searchText)
                }
                return list
            } else if (idx > maxLength) {//如果匹配的字大于显示范围
                let idx_last = list.lastIndexOf(searchText);//是否在尾部22个之内
                let last = list.length - idx_last;//在尾部的位置
                if (last <= maxLength) {
                    let length_ = list.length;
                    res = list.slice(length_ - maxLength, list.length);
                }
                if ((idx > maxLength) && (last > maxLength)) {
                    res = list.slice(idx - 1, list.length);
                }
                if (set_hightLight) {
                    return `...${this.hightLight(res, searchText)}`
                }
                return `...${res}`
            }
        } else {
            num++;//没查到就自增
            return this.stringDotRep(searchText, list, maxLength, num, set_hightLight);
        }
    },

    // 字体高亮(适用于查找到响应的结果)
    // desc => 段落
    // replaceStr => 需要高亮的字
    hightLight(desc, replaceStr) {
        if (desc.match(new RegExp(replaceStr, 'ig'))) {
            return desc.replace(new RegExp(replaceStr, 'ig'), '<span style="color:#297CE6;">' + replaceStr + '</span>');
        }
        let arr = Array.from(desc);
        for (let i = 0; i < arr.length; i++) {
            let keys = Array.from(replaceStr.toLowerCase());
            if (keys.indexOf(arr[i].toLowerCase()) >= 0) {
                arr[i] = arr[i].replace(arr[i], '<span style="color:#297CE6;">' + arr[i] + '</span>');
            }
        }
        return arr.join('');
    },


}