const mysql = require('mysql');
const bluebird = require('bluebird');

// 建立連線物件
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'class'
});
db.on('error', ex=>{
    console.log(ex);
});
db.connect();

bluebird.promisifyAll(db);
module.exports = db;