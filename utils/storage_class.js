class StorageFn {
    constructor() {
        this.ls = window.localStorage;
        this.ss = window.sessionStorage;
    }

    /*-----------------cookie---------------------*/
    /*设置cookie*/
    setCookie(name, value, day) {
        var setting = arguments[0];
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
            for (var i in setting) {
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + day);
                document.cookie = i + '=' + setting[i] + ';expires=' + oDate;
            }
        } else {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + day);
            document.cookie = name + '=' + value + ';expires=' + oDate;
        }

    }

    /*获取cookie*/
    getCookie(name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    }

    /*删除cookie*/
    removeCookie(name) {
        this.setCookie(name, 1, -1);
    }


    /**
     * @description 操作cookie(将上面3个API合并成一个API)
     * @param name cookie名称
     * @param value 值
     * @param iDay 有效时间（天数）
     * 调用:
     *  cookie(cookieName,'守候',1)//设置
        cookie(cookieName)//获取
        cookie(cookieName,'守候',-1)//删除(中间的值没有意义了，只要cookie天数设置了-1，就会删除。)
     */
    cookie(name, value, iDay) {
        if (arguments.length === 1) {
            return this.getCookie(name);
        } else {
            this.setCookie(name, value, iDay);
        }
    }


    /*-----------------localStorage---------------------*/
    /*设置localStorage*/
    setLocal(key, val) {
        var setting = arguments[0];
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
            for (var i in setting) {
                this.ls.setItem(i, JSON.stringify(setting[i]))
            }
        } else {
            this.ls.setItem(key, JSON.stringify(val))
        }

    }

    /*获取localStorage*/
    getLocal(key) {
        if (key) return JSON.parse(this.ls.getItem(key))
        return null;

    }

    /*移除localStorage*/
    removeLocal(key) {
        this.ls.removeItem(key)
    }

    /*移除所有localStorage*/
    clearLocal() {
        this.ls.clear()
    }


    /*-----------------sessionStorage---------------------*/
    /*设置sessionStorage*/
    setSession(key, val) {
        var setting = arguments[0];
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
            for (var i in setting) {
                this.ss.setItem(i, JSON.stringify(setting[i]))
            }
        } else {
            this.ss.setItem(key, JSON.stringify(val))
        }

    }

    /*获取sessionStorage*/
    getSession(key) {
        if (key) return JSON.parse(this.ss.getItem(key))
        return null;

    }

    /*移除sessionStorage*/
    removeSession(key) {
        this.ss.removeItem(key)
    }

    /*移除所有sessionStorage*/
    clearSession() {
        this.ss.clear()
    }


}

export var storage = new StorageFn();