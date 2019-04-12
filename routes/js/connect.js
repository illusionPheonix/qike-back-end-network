//引入mysql
const mysql = require("mysql");
//创建连接对象
const connection =  mysql.createConnection({
    host     : 'localhost',   // 数据库的地址
    user     : 'root',        // 用户名
    password : 'root',        // 密码
    database : 'qikedatabase', // 数据库
    port: '3306'     // 端口号 （默认都是3306 所以这个可以不写）
})

//连接
connection.connect();
console.log('连接数据库成功');

//暴露
module.exports = connection;

