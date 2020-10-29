export default {
    // 加法函数（精度丢失问题）
    add(arg1, arg2) {
        let r1, r2, m;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m
    },
    // 减法函数（精度丢失问题）
    sub(arg1, arg2) {
        let r1, r2, m, n;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
    },
    // 乘法函数（精度丢失问题）
    mcl(num1, num2) {
        let m = 0, s1 = num1.toString(), s2 = num2.toString();
        try { m += s1.split(".")[1].length } catch (e) { }
        try { m += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    // 除法函数（精度丢失问题）
    division(num1, num2) {
        let t1, t2, r1, r2;
        try {
            t1 = num1.toString().split('.')[1].length;
        } catch (e) {
            t1 = 0;
        }
        try {
            t2 = num2.toString().split(".")[1].length;
        } catch (e) {
            t2 = 0;
        }
        r1 = Number(num1.toString().replace(".", ""));
        r2 = Number(num2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },

    // 限制输入为数字，并且数字最多带2位小数
    checkInputText(text){
        var reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
        if (reg.test(text)) { //正则匹配通过，提取有效文本
            text = text.replace(reg, '$2$3$4');
        }else { //正则匹配不通过，直接清空
            text = '';
        }
        return text;
    },

    // 最大值和最小值差值
    // arr = [23, 4, 5, 2, 4, 5, 6, 6, 71, -3];
    difference(arr) { 
        let max = Math.max(...arr);
        let min = Math.min(...arr);
        return max - min ;
    }
    

}