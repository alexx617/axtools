const { cmd, log } = require('./tools');
const fs = require('fs');

fs.readdir("./utils", function (err, files) {
    if (err) {
        log(err);
    } else {
        files.forEach(fileName => {
            let firstName = fileName.split(".")[0];
            cmd(`babel ./utils/${fileName} -o ./min/${firstName}.min.js`);
            cmd(`uglifyjs ./min/${firstName}.min.js -o ./min/${firstName}.min.js`);
        })
        log(`build success!`);
    }
});
