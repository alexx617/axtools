import keyCodeMap from './keyCodeMap'
export default {
    // DOM操作

    /*过滤html代码(把<>转换)*/
    filterTag(str) {
        str = str.replace(/&/ig, "&amp;");
        str = str.replace(/</ig, "&lt;");
        str = str.replace(/>/ig, "&gt;");
        str = str.replace(" ", "&nbsp;");
        return str;
    },

    //检测类名
    hasClass(ele, name) {
        return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
    },

    //添加类名
    addClass(ele, name) {
        if (!this.hasClass(ele, name)) ele.className += " " + name;
    },

    //删除类名
    removeClass(ele, name) {
        if (this.hasClass(ele, name)) {
            var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
            ele.className = ele.className.replace(reg, '');
        }
    },

    //替换类名
    replaceClass(ele, newName, oldName) {
        this.removeClass(ele, oldName);
        this.addClass(ele, newName);
    },

    //获取兄弟节点
    //ecDo.siblings(obj,'#id')
    siblings(obj, opt) {
        let a = []; //定义一个数组，用来存obj的兄弟元素
        let p = obj.previousSibling;
        while (p) { //先取obj的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
            if (p.nodeType === 1) {
                a.push(p);
            }
            p = p.previousSibling //最后把上一个节点赋给p
        }
        a.reverse(); //把顺序反转一下 这样元素的顺序就是按先后的了
        let n = obj.nextSibling; //再取obj的弟弟
        while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
            if (n.nodeType === 1) {
                a.push(n);
            }
            n = n.nextSibling;
        }
        if (opt) {
            let _opt = opt.substr(1);
            let b = [];//定义一个数组，用于储存过滤a的数组
            if (opt[0] === '.') {
                b = a.filter(item => item.className === _opt);
            }
            else if (opt[0] === '#') {
                b = a.filter(item => item.id === _opt);
            }
            else {
                b = a.filter(item => item.tagName.toLowerCase() === opt);
            }
            return b;
        }
        return a;
    },

    //获取行间样式属性
    getByStyle(obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        } else {
            return getComputedStyle(obj, false)[name];
        }
    },

    //关键字加标签（多个关键词用空格隔开）
    //ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
    //"<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯"
    findKey(str, key, el = 'span') {
        let arr = null, regStr = null, content = null, Reg = null;
        arr = key.split(/\s+/);
        //alert(regStr); //    如：(前端|过来)
        regStr = this.createKeyExp(arr);
        content = str;
        //alert(Reg);//        /如：(前端|过来)/g
        Reg = new RegExp(regStr, "g");
        //过滤html标签 替换标签，往关键字前后加上标签
        content = content.replace(/<\/?[^>]*>/g, '')
        return content.replace(Reg, "<" + el + ">$1</" + el + ">");
    },

    //设置样式
    css(dom, json) {
        if (dom.length) {
            for (let i = 0; i < dom.length; i++) {
                for (let attr in json) {
                    dom[i].style[attr] = json[attr];
                }
            }
        }
        else {
            for (let attr in json) {
                dom.style[attr] = json[attr];
            }
        }
    },

    //设置HTML内容
    html(obj) {
        if (arguments.length === 1) {
            return obj.innerHTML;
        } else if (arguments.length === 2) {
            obj.innerHTML = arguments[1];
        }
    },

    //设置HTML内容
    text(obj) {
        if (arguments.length === 1) {
            return obj.innerHTML;
        } else if (arguments.length === 2) {
            obj.innerHTML = this.filterStr(arguments[1], 'html');
        }
    },

    //显示隐藏
    show(obj) {
        let blockArr = ['div', 'li', 'ul', 'ol', 'dl', 'table', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'header', 'footer', 'details', 'summary', 'section', 'aside', '']
        if (blockArr.indexOf(obj.tagName.toLocaleLowerCase()) === -1) {
            obj.style.display = 'inline';
        }
        else {
            obj.style.display = 'block';
        }
    },

    hide(obj) {
        obj.style.display = "none";
    },


    /**
     * 
     * @desc 获取滚动条距顶部的距离
     */
    getScrollTop() {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    },

    /**
     * 
     * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
     * @param {HTMLElement} ele 
     * @returns { {left: number, top: number} }
     */
    offset(ele) {
        var pos = {
            left: 0,
            top: 0
        };
        while (ele) {
            pos.left += ele.offsetLeft;
            pos.top += ele.offsetTop;
            ele = ele.offsetParent;
        };
        return pos;
    },

    /**
     * 
     * @desc 设置滚动条距顶部的距离
     */
    setScrollTop(value) {
        window.scrollTo(0, value);
        return value;
    },

    /**
    * @desc 根据keycode获得键名
    * @param  {Number} keycode
    * @return {String}
    */
    getKeyName(keycode) {
        if (keyCodeMap[keycode]) {
            return keyCodeMap[keycode];
        } else {
            console.log('Unknow Key(Key Code:' + keycode + ')');
            return '';
        }
    },


    /**
    * @desc H5页面软键盘缩回/弹起回调
    * 监听window.innerHeight变化
    * @param {Function} downCb 当软键盘弹起后，缩回的回调
    * @param {Function} upCb 当软键盘弹起的回调
    */
    softKeyCal(downCb, upCb) {
        let clientHeight = window.innerHeight;
        downCb = Object.prototype.toString.call(downCb).slice(8, -1) === 'Function' ? downCb : function () { }
        upCb = Object.prototype.toString.call(upCb).slice(8, -1) === 'Function' ? upCb : function () { }
        window.addEventListener('resize', () => {
            let height = window.innerHeight
            if (height === clientHeight) {
                downCb()
            }
            if (height < clientHeight) {
                upCb()
            }
        })
    }


}