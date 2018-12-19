module.exports = {
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
    keyCodeMap = {
        8: 'Backspace',
        9: 'Tab',
        13: 'Enter',
        16: 'Shift',
        17: 'Ctrl',
        18: 'Alt',
        19: 'Pause',
        20: 'Caps Lock',
        27: 'Escape',
        32: 'Space',
        33: 'Page Up',
        34: 'Page Down',
        35: 'End',
        36: 'Home',
        37: 'Left',
        38: 'Up',
        39: 'Right',
        40: 'Down',
        42: 'Print Screen',
        45: 'Insert',
        46: 'Delete',

        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',

        65: 'A',
        66: 'B',
        67: 'C',
        68: 'D',
        69: 'E',
        70: 'F',
        71: 'G',
        72: 'H',
        73: 'I',
        74: 'J',
        75: 'K',
        76: 'L',
        77: 'M',
        78: 'N',
        79: 'O',
        80: 'P',
        81: 'Q',
        82: 'R',
        83: 'S',
        84: 'T',
        85: 'U',
        86: 'V',
        87: 'W',
        88: 'X',
        89: 'Y',
        90: 'Z',

        91: 'Windows',
        93: 'Right Click',

        96: 'Numpad 0',
        97: 'Numpad 1',
        98: 'Numpad 2',
        99: 'Numpad 3',
        100: 'Numpad 4',
        101: 'Numpad 5',
        102: 'Numpad 6',
        103: 'Numpad 7',
        104: 'Numpad 8',
        105: 'Numpad 9',
        106: 'Numpad *',
        107: 'Numpad +',
        109: 'Numpad -',
        110: 'Numpad .',
        111: 'Numpad /',

        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',

        144: 'Num Lock',
        145: 'Scroll Lock',
        182: 'My Computer',
        183: 'My Calculator',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\''
    },

    getKeyName(keycode) {
        if (keyCodeMap[keycode]) {
            return keyCodeMap[keycode];
        } else {
            console.log('Unknow Key(Key Code:' + keycode + ')');
            return '';
        }
    },

}