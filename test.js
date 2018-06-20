const { cmd, log } = require('./tools');
const fs = require('fs');

fs.mkdir("mintest",err=>{
    if (err) {
        cmd(`rm -rf mintest`)
        log('del')
    }else{
        log('success')
    }
})

function remove(){
    fs.rmdir('mintest',function(error){  
        if(error){  
            console.log(error);  
            return false;  
        }  
        console.log('删除目录成功');  
    })  
}
