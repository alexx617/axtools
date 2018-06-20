const { cmd, log } = require('./tools');
const fs = require('fs');

const file_ = 'min';

function mk() {
    fs.mkdir(file_, err => {
        if (err) { //如果本来有该文件夹
            cmd(`rm -rf ${file_}`)
            log(`删除旧${file_}文件夹`)
            mk()
        } else {
            log(`创建${file_}文件夹成功!`)
            log(`开始执行打包..`)
            create()
        }
    })
}

function create() {
    fs.readdir("./utils", (err, files) => {
        if (err) {
            log(`build error:${err}`);
        } else {
            files.forEach(fileName => {
                let firstName = fileName.split(".")[0];
                cmd(`babel ./utils/${fileName} -o ./${file_}/${firstName}.min.js`);
                cmd(`uglifyjs ./${file_}/${firstName}.min.js -o ./${file_}/${firstName}.min.js`);
                log(`build ${firstName} success`)
            })
            log(`build All success!`);
        }
    });
}

mk();