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

};