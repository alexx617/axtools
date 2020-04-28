export default {

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
    //获取地址栏所有查询参数,解析成json对象
    getUrlPrmt2() {
        let q = {}; location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v); q;
        return q;
    },

    //获取地址栏某一个查询参数
    getQuery(name) {
        let t = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let n = window.location.search.substr(1).match(t) || null
        return n !== null ? decodeURIComponent(n[2]) : ''
    },

    // 修改url中的参数
    replaceParamVal(paramName, replaceWith) {
        var oUrl = location.href.toString();
        var re = eval('/(' + paramName + '=)([^&]*)/gi');
        location.href = oUrl.replace(re, paramName + '=' + replaceWith);
        return location.href;
    },

    // 删除url中指定的参数
    /**
     * @param { string } name
     */
    funcUrlDel(name) {
        var loca = location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = loca.search.substr(1);
        if (query.indexOf(name) > -1) {
            var obj = {};
            var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
            }
            delete obj[name];
            var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
            return url
        }
    }


};