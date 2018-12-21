export default {
    /* 封装ajax函数
    * @param {string}obj.type http连接的方式，包括POST和GET两种方式
    * @param {string}obj.url 发送请求的url
    * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
    * @param {object}obj.data 发送的参数，格式为对象类型
    * @param {function}obj.success ajax发送并接收成功调用的回调函数
    * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
    */
    // 使用:
    //  ajax({
    //  	type:'get',
    //  	url:'xxx',
    //  	data:{
    //  		id:'111'
    //  	},
    //  	success:function(res){
    //  		console.log(res)
    //  	}
    //  })
    ajax(setting) {
        //设置参数的初始值
        var opts = {
            method: (setting.method || "GET").toUpperCase(), //请求方式
            url: setting.url || "", // 请求地址
            async: setting.async || true, // 是否异步
            dataType: setting.dataType || "json", // 解析方式
            data: setting.data || "", // 参数
            success: setting.success || function () { }, // 请求成功回调
            error: setting.error || function () { } // 请求失败回调
        }

        // 参数格式化
        function params_format(obj) {
            var str = ''
            for (var i in obj) {
                str += i + '=' + obj[i] + '&'
            }
            return str.split('').slice(0, -1).join('')
        }

        // 创建ajax对象
        var xhr = new XMLHttpRequest();

        // 连接服务器open(方法GET/POST，请求地址， 异步传输)
        if (opts.method == 'GET') {
            xhr.open(opts.method, opts.url + "?" + params_format(opts.data), opts.async);
            xhr.send();
        } else {
            xhr.open(opts.method, opts.url, opts.async);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(opts.data);
        }

        /*
        ** 每当readyState改变时，就会触发onreadystatechange事件
        ** readyState属性存储有XMLHttpRequest的状态信息
        ** 0 ：请求未初始化
        ** 1 ：服务器连接已建立
        ** 2 ：请求已接受
        ** 3 : 请求处理中
        ** 4 ：请求已完成，且相应就绪
        */
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
                switch (opts.dataType) {
                    case "json":
                        var json = JSON.parse(xhr.responseText);
                        opts.success(json);
                        break;
                    case "xml":
                        opts.success(xhr.responseXML);
                        break;
                    default:
                        opts.success(xhr.responseText);
                        break;
                }
            }
        }

        xhr.onerror = function (err) {
            opts.error(err);
        }
    },



    /**
     * @param  {url}
     * @param  {setting}
     * @return {Promise}
     */
    fetch(url, setting) {
        //设置参数的初始值
        let opts = {
            method: (setting.method || 'GET').toUpperCase(), //请求方式
            headers: setting.headers || {}, // 请求头设置
            credentials: setting.credentials || true, // 设置cookie是否一起发送
            body: setting.body || {},
            mode: setting.mode || 'no-cors', // 可以设置 cors, no-cors, same-origin
            redirect: setting.redirect || 'follow', // follow, error, manual
            cache: setting.cache || 'default' // 设置 cache 模式 (default, reload, no-cache)
        }
        let dataType = setting.dataType || "json", // 解析方式  
            data = setting.data || "" // 参数

        // 参数格式化
        function params_format(obj) {
            var str = ''
            for (var i in obj) {
                str += `${i}=${obj[i]}&`
            }
            return str.split('').slice(0, -1).join('')
        }

        if (opts.method === 'GET') {
            url = url + (data ? `?${params_format(data)}` : '')
        } else {
            setting.body = data || {}
        }

        return new Promise((resolve, reject) => {
            fetch(url, opts).then(async res => {
                let data = dataType === 'text' ? await res.text() :
                    dataType === 'blob' ? await res.blob() : await res.json()
                resolve(data)
            }).catch(e => {
                reject(e)
            })
        })
    },


    // 使用:
    // jsonp({
    //     url:'http://localhost:3000/api',//请求地址
    //     parames: {//请求参数，对象
    //          id: 1
    //     },
    //     success:function (res) {//成功回调
    //         console.log(res)
    //     }
    // })
    jsonp(obj) {
        //写入url地址中的函数名称，动态创建
        var callbackName = 'jsonp_callback_' + Date.now() + Math.random().toString().substr(2, 5);
        //创建一个script标签
        var scriptObj = document.createElement("script");
        
        obj.parames = obj.parames || '';
        if (typeof obj.parames == 'object') {
            var arr = new Array();
            for (var key in obj.parames) {
                arr.push(key + '=' + obj.parames[key])
            }
            obj.parames = arr.join('&');
        }
        //设置标签的请求路径：http://localhost:3000/api?callback=jsonp_callback_153498520409635392&id=1
        scriptObj.src = obj.url + '?' + 'callback=' + callbackName + '&' + obj.parames;

        //将创建好的带请求的script标签添加到html的body中
        document.body.appendChild(scriptObj);

        //这里必须这样写window[callbackName];
        //如果写window.callbackName会报错没有定义
        window[callbackName] = function (res) {
            obj.success(res);
            //由于请求一次会创建一个script标签和一个函数，所以每次获取到结果后就删除
            delete window.callbackName;
            document.body.removeChild(scriptObj);
        }
    }

}