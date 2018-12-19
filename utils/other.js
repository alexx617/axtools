module.exports = {
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
    throttle(delay, noTrailing, callback, debounceMode) {
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
    debounce(delay, atBegin, callback) {
        return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
    }
}