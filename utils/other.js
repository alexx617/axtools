export default {
    //其他函数
    /**
     * 
     * @desc 生成指定范围随机数
     * @param  {Number} min 
     * @param  {Number} max 
     * @return {Number} 
     */
    randomNum(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    },

    /**
     * 
     * @desc 随机生成颜色
     * @return {String} 
     */
    randomColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    },

    //生成UUID
    guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },

    /**
     * 光标所在位置插入字符，并设置光标位置
     * 
     * @param {dom} 输入框
     * @param {val} 插入的值
     * @param {posLen} 光标位置处在 插入的值的哪个位置
     */
    setCursorPosition(dom, val, posLen) {
        let cursorPosition = 0;
        if (dom.selectionStart) {
            cursorPosition = dom.selectionStart;
        }
        this.insertAtCursor(dom, val);
        dom.focus();
        console.log(posLen)
        dom.setSelectionRange(dom.value.length, cursorPosition + (posLen || val.length));
    },

    /*光标所在位置插入字符*/
    insertAtCursor(dom, val) {
        if (document.selection) {
            dom.focus();
            sel = document.selection.createRange();
            sel.text = val;
            sel.select();
        } else if (dom.selectionStart || dom.selectionStart == '0') {
            let startPos = dom.selectionStart;
            let endPos = dom.selectionEnd;
            let restoreTop = dom.scrollTop;
            dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length);
            if (restoreTop > 0) {
                dom.scrollTop = restoreTop;
            }
            dom.focus();
            dom.selectionStart = startPos + val.length;
            dom.selectionEnd = startPos + val.length;
        } else {
            dom.value += val;
            dom.focus();
        }
    },

    // 循环出options的value和text
    getOptions(json) {
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
    initUI(ui) {
        Object.keys(ui.fileds).map(k => {
            let item = ui.fileds[k];
            item.value = item.value || '';
            if (item.linkFiled) {
                item.linkFiled.value = item.linkFiled.value || '';
            }
        });
        return ui;
    },

    /**
     * 
     * @desc 判断浏览器是否支持webP格式图片
     * @return {Boolean} 
     */
    isSupportWebP() {
        return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    },



    /**
     * https://blog.csdn.net/ligang2585116/article/details/75003436
     * debounce： 去抖，保证多少ms内不再被触发时就会执行一次,把触发非常频繁的事件合并成一次执行,对于键盘事件，当用户输入比较频繁的时候，可以通过debounce合并键盘事件处理,对于ajax请求的情况，例如当页面下拉超过一定返回就通过ajax请求新的页面内容，这时候可以通过debounce合并ajax请求事件
     * 
     * throttle：节流阀，保证多少ms内只执行一次。设置一个阀值，在阀值内，把触发的事件合并成一次执行；当到达阀值，必定执行一次事件,对于键盘事件，当用户输入非常频繁，但是我们又必须要在一定时间内（阀值）内执行处理函数的时候，就可以使用throttle
     * 
     *  // 执行1次(最后一次点击1000ms后)
        btnDom.addEventListener('click', debounce(clickBtn, 1000));
        // 执行3次(点击立即执行一次、1000ms后执行一次，2000ms后执行一次)
        btnDom.addEventListener('click', throttle(clickBtn, 1000));
     * 
     * 文本输入、自动完成，keyup 事件, 搜索框输入发送ajax请求，监听onchange or keyup 事件进行查询,需要debounce
     * 鼠标移动，mousemove 事件，需要throttle
     * DOM 元素动态定位，window 对象的resize 和 scroll 事件，需要throttle
     */
    /**
     * 
     * @param {*} action 延迟毫秒后执行的函数
     * @param {*} delay 0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的
     * 用法:
     *  function resizeHandler() {
            console.log("resize");
        }
        window.onresize = debounce(resizeHandler, 300);
    */
    debounce(action, delay) {
        let timer = null;
        return function () {
            let self = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                action.apply(self, args)
            }, delay);
        }
    },

    /**
     *
     * @param {*} action 延迟毫秒后执行的函数
     * @param {*} delay 0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的
     * 用法:
     *  function resizeHandler() {
            console.log("resize");
        }
        window.onresize = throttle(resizeHandler, 300);
    */
    throttle(action, delay) {
        let statTime = 0;
        return function () {
            let currTime = +new Date();
            if (currTime - statTime > delay) {
                action.apply(this, arguments);
                statTime = currTime;
            }
        }
    },



    /**
     * @desc   函数节流。
     * 适用于限制`resize`和`scroll`等函数的调用频率
     * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}   noTrailing     可选，默认为false。
     *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
     *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
     *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
     * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                    执行去节流功能时，调用`callback`。
     * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
     *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
     * @return {Function}  新的节流函数
     */
    throttleV2(delay, noTrailing, callback, debounceMode) {
        var timeoutID;
        var lastExec = 0;
        if (typeof noTrailing !== 'boolean') {
            debounceMode = callback;
            callback = noTrailing;
            noTrailing = undefined;
        }
        function wrapper() {
            var self = this;
            var elapsed = Number(new Date()) - lastExec;
            var args = arguments;
            function exec() {
                lastExec = Number(new Date());
                callback.apply(self, args);
            }
            function clear() {
                timeoutID = undefined;
            }
            if (debounceMode && !timeoutID) {
                exec();
            }
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
            if (debounceMode === undefined && elapsed > delay) {
                exec();
            } else if (noTrailing !== true) {
                timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
            }
        }
        return wrapper;
    },


    /**
     * @desc 函数防抖 
     * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
     * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
     * @example 适用场景：如在线编辑的自动存储防抖。
     * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}  atBegin       可选，默认为false。
     *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
                                        如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
    * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
    *                                  执行去抖动功能时，，调用`callback`。
    *
    * @return {Function} 新的防抖函数。
    */
    debounceV2(delay, atBegin, callback) {
        return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
    },

    /**
     * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
     * @param func 执行函数
     * @param wait 时间间隔
     * @param options 如果你想禁用第一次首先执行的话，传递{leading: false}，
     *                如果你想禁用最后一次执行的话，传递{trailing: false}
     * @returns {Function}
     */
    throttleV3(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function () {
            previous = options.leading === false ? 0 : new Date().getTime();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function () {
            var now = new Date().getTime();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    },

    /**
     * 防反跳。func函数在最后一次调用时刻的wait毫秒之后执行！
     * @param func 执行函数
     * @param wait 时间间隔
     * @param immediate 为true，debounce会在wai 时间间隔的开始调用这个函数
     * @returns {Function}
     */
    debounceV3(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function () {
            var last = new Date().getTime() - timestamp; // timestamp会实时更新

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function () {
            context = this;
            args = arguments;
            timestamp = new Date().getTime();
            var callNow = immediate && !timeout;

            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    },


    /**
     * @desc   生成下载
     * @param  {href,title} 
     */
    download(href, title) {
        //火狐专用
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            window.location = href
            return
        }
        var a = document.createElement('a');
        a.setAttribute('href', href);
        a.setAttribute('download', title);
        a.click();
    },

    /**
     * @desc 对敏感字符逗号、尖括号进行转义,防止js注入
     * @param v { String } <script>alert("1")</script> 
     * */
    escapeValue(value) {
        var entry = { "'": "&apos;", '"': '&quot;', '<': '&lt;', '>': '&gt;' };
        value = value.replace(/(['")-><&\\\/\.])/g, function ($0) { return entry[$0] || $0; });
        return value;
    },
    // 转义html(防XSS攻击)
    escapeHTML = str => {
        str.replace(
            /[&<>'"]/g,
            tag =>
                ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    "'": '&#39;',
                    '"': '&quot;'
                }[tag] || tag)
        );
    },
}