module.exports = {
    //其他函数

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
        var cursorPosition = 0;
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
}