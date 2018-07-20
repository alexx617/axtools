module.exports = {

    /********Array类**********************************************************************************/


    //数组去重
    getUniqueArray(arr) {
        return Array.from(new Set(arr))
    },

    //从数组中随机获取一个
    getRandomOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    //数组顺序打乱
    upsetArr(arr) {
        return arr.sort(() => {
            return Math.random() - 0.5
        });
    },

    //数组顺序打乱,优化打乱,乱得更均匀
    upsetArr2(arr) {
        let j,_item;
        for (let i=0; i<arr.length; i++) {
            j = Math.floor(Math.random() * i);
            _item = arr[i];
            arr[i] = arr[j];
            arr[j] = _item;
        }
        return arr;
    },

    //得到n1-n2下标的数组
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
    //result：[5, 6, 7, 8, 9]
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
    //result：[2, 3, 4, 5, 6, 7, 8, 9]
    getArrayNum(arr, n1, n2) {
        return arr.slice(n1, n2);
    },

    //筛选数组
    //删除值为'val'的数组元素
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
    //result：["aaa"]   带有'test'的都删除
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test')
    //result：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
    removeArrayForValue(arr, val, type) {
        return arr.filter(item => type ? item.indexOf(val) === -1 : item !== val)
    },

    //获取对象数组某些项
    //let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //getOptionArray(arr,'a,c')
    //result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
    //getOptionArray(arr,'b',1)
    //result：[2, 3, 9, 2, 5]
    getOptionArray(arr, keys) {
        let newArr = [];
        if (!keys) {
            return arr
        }
        let _keys = keys.split(','),
            newArrOne = {};
        //是否只是需要获取某一项的值
        if (_keys.length === 1) {
            for (let i = 0, len = arr.length; i < len; i++) {
                newArr.push(arr[i][keys])
            }
            return newArr;
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            newArrOne = {};
            for (let j = 0, len1 = _keys.length; j < len1; j++) {
                newArrOne[_keys[j]] = arr[i][_keys[j]]
            }
            newArr.push(newArrOne);
        }
        return newArr
    },

    //排除数组某些项
    //let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //filterOptionArray(arr,'a')
    //result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
    //filterOptionArray(arr,'a,c')
    //result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
    filterOptionArray(arr, keys) {
        let newArr = [];
        let _keys = keys.split(','),
            newArrOne = {};
        for (let i = 0, len = arr.length; i < len; i++) {
            newArrOne = {};
            for (let key in arr[i]) {
                //如果key不存在排除keys里面,添加数据
                if (_keys.indexOf(key) === -1) {
                    newArrOne[key] = arr[i][key];
                }
            }
            newArr.push(newArrOne);
        }
        return newArr;
    },

    //数组扁平化
    steamroller(arr) {
        let newArr = [],
            _this = this;
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                // 如果是数组，调用(递归)steamroller 将其扁平化
                // 然后再 push 到 newArr 中
                newArr.push.apply(newArr, _this.steamroller(arr[i]));
            } else {
                // 不是数组直接 push 到 newArr 中
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },

    //数组最大值 主要针对数字类型的数组
    maxArr(arr) {
        return Math.max.apply(null, arr);
    },
    //数组最小值 主要针对数字类型的数组
    minArr(arr) {
        return Math.min.apply(null, arr);
    },

    //数组求和 主要针对数字类型的数组
    sumArr(arr) {
        return arr.reduce((pre, cur) => pre + cur)
    },

    //数组平均值,小数点可能会有很多位，这里不做处理
    covArr(arr) {
        return this.sumArr(arr) / arr.length;
    },

    //数组（字符串）一个元素出现的次数
    //getEleCount('asd56+asdasdwqe','a')
    //result：3
    //getEleCount([1,2,3,4,5,66,77,22,55,22],22)
    //result：2
    getEleCount(obj, ele) {
        let num = 0;
        for (let i = 0, len = obj.length; i < len; i++) {
            if (ele === obj[i]) {
                num++;
            }
        }
        return num;
    },

    //返回数组（字符串）出现最多的几次元素和出现次数
    //arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
    //返回值：el->元素，count->次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]
    //默认情况，返回所有元素出现的次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
    //传参（rank=3），只返回出现次数排序前三的
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2}]
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
    //传参（ranktype=1,rank=null），升序返回所有元素出现次数
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1},{"el":"3","count":2},{"el":"1","count":4},{"el":"2","count":6}]
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
    //传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1}]
    getCount(arr, rank, ranktype) {
        let obj = {},
            k, arr1 = []
        //记录每一元素出现的次数
        for (let i = 0, len = arr.length; i < len; i++) {
            k = arr[i];
            if (obj[k]) {
                obj[k]++;
            } else {
                obj[k] = 1;
            }
        }
        //保存结果{el-'元素'，count-出现次数}
        for (let o in obj) {
            arr1.push({
                el: o,
                count: obj[o]
            });
        }
        //排序（降序）
        arr1.sort(function (n1, n2) {
            return n2.count - n1.count
        });
        //如果ranktype为1，则为升序，反转数组
        if (ranktype === 1) {
            arr1 = arr1.reverse();
        }
        let rank1 = rank || arr1.length;
        return arr1.slice(0, rank1);
    },


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


    /********Object类**********************************************************************************/


    //深拷贝对象
    deepCopyObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    //数据类型判断
    //isType([],'array')
    //true
    //isType([])
    //'[object Array]'
    isType(o, type) {
        switch (type.toLowerCase()) {
            case 'string':
                return Object.prototype.toString.call(o) === '[object String]';
            case 'number':
                return Object.prototype.toString.call(o) === '[object Number]';
            case 'boolean':
                return Object.prototype.toString.call(o) === '[object Boolean]';
            case 'undefined':
                return Object.prototype.toString.call(o) === '[object Undefined]';
            case 'null':
                return Object.prototype.toString.call(o) === '[object Null]';
            case 'function':
                return Object.prototype.toString.call(o) === '[object Function]';
            case 'array':
                return Object.prototype.toString.call(o) === '[object Array]';
            case 'object':
                return Object.prototype.toString.call(o) === '[object Object]';
            case 'nan':
                return isNaN(o);
            case 'elements':
                return Object.prototype.toString.call(o).indexOf('HTML') !== -1
            default:
                return Object.prototype.toString.call(o)
        }
    },

    //截取Object.prototype.toString具体值
    getType(a) {
        // 方法1:
        // return Object.prototype.toString.call(a).slice(8, -1)
        // 方法2:
        var typeArray = Object.prototype.toString.call(a).split(" ");
        return typeArray[1].slice(0, this.length - 1);
    },

    //清除对象中值为空的属性
    filterParams(obj) {
        let _newPar = {};
        for (let key in obj) {
            if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newPar[key] = obj[key];
            }
        }
        return _newPar;
    },



    /********Url类**********************************************************************************/


    //获取url参数
    //getUrlPrmt('segmentfault.com/write?draftId=122000011938') //{draftId: "122000011938"}
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


    //获取地址栏所有查询参数,解析成json对象
    getUrlPrmt() {
        let url = window.location.search;
        let rep = /[?&][^?&]+=[^?&]+/g;
        let arr = url.match(rep);
        let obj = {};
        if (arr) {
            arr.forEach = item => {
                let tempArr = item.substring(1).split('=');
                let key = decodeURIComponent(tempArr[0]);
                let val = decodeURIComponent(tempArr[1]);
                obj[key] = val;
            }
        }
        return obj
    },

    //获取地址栏某一个查询参数
    getQuery(name) {
        let t = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let n = window.location.search.substr(1).match(t) || null
        return n !== null ? decodeURIComponent(n[2]) : ''
    },

};