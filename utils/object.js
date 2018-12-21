export default {

    /********Object类**********************************************************************************/


    //深拷贝对象
    deepCopyObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // 深拷贝2,对 JavaScript 中的5种主要的数据类型（包括 Number、String、Object、Array、Boolean）进行值复制。
    clone(obj) {
        //判断是对象，就进行循环复制
        if (typeof obj === 'object' && typeof obj !== 'null') {
            // 区分是数组还是对象，创建空的数组或对象
            var o = Object.prototype.toString.call(obj).slice(8, -1) === "Array" ? [] : {};
            for (var k in obj) {
                // 如果属性对应的值为对象，则递归复制
                if (typeof obj[k] === 'object' && typeof obj[k] !== 'null') {
                    o[k] = clone(obj[k])
                } else {
                    o[k] = obj[k];
                }
            }
        } else { //不为对象，直接把值返回
            return obj;
        }
        return o;
    },

    /**
     * 
     * @desc   判断`obj`是否为空
     * @param  {Object} obj
     * @return {Boolean}
     */
    isEmptyObject(obj) {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj))
            return false
        return !Object.keys(obj).length
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



}