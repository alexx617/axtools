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

    /**
     *  js判断两个对象的值是否相等
     *  var obj1 = { name: "Benjamin", sex : "male"};
        var obj2 = { name: "Benjamin", sex : "male"};
        var obj3 = obj1;//obj1和ob3的指针指向了内存中的同一个地址
        console.log(isObjectValueEqual(obj1, obj2));//true
        console.log(obj1 == obj3);//Outputs: true
        console.log(obj1 === obj3);//Outputs: true
        console.log(obj2 == obj3);//Outputs: false
        console.log(obj2 === obj3);//Outputs: false
     */
    isObjectValueEqual(a, b) {
        //取对象a和b的属性名
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        //判断属性名的length是否一致
        if (aProps.length != bProps.length) {
            return false;
        }
        //循环取出属性名，再判断属性值是否一致
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    },
    // 对象的值是否相等
    isObjectValueEqual2(obj1, obj2) {
        let o1 = obj1 instanceof Object;
        let o2 = obj2 instanceof Object;
        if (!o1 || !o2) {
            return obj1 === obj2;
        }
        if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
        for (let attr in obj1) {
            let t1 = obj1[attr] instanceof Object;
            let t2 = obj2[attr] instanceof Object;
            if (t1 && t2) {
                return isObjectValueEqual(obj1[attr], obj2[attr]);
            } else if (obj1[attr] !== obj2[attr]) {
                return false;
            }
        }
        return true;
    }

}