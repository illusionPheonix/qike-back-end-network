var express = require('express');
var router = express.Router();

//连接数据库
const connection = require('./js/connect');

//设置响应头
router.all('*',(req,res,next)=>{
    // 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
//  放行
    next();
})

//增加客户
router.post('/clientadd',(req,res)=>{
  //接收传过来的数据
    let { name,sex,salesStatus,courseData,tel,school,classData,courseStatus,salesMan } = req.body;
    console.log(req.body);
//    写sql
    const sqlStr = `insert into clientdata(name,sex,salestatus,coursedata,tel,school,classdata,coursestatus,saleman )  values('${name}','${sex}','${salesStatus}','${courseData}','${tel}','${school}','${classData}','${courseStatus}','${salesMan}') `;
//    执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,msg:"添加数据成功"});
        }else {
            res.send({code:0,msg:"添加数据失败"});
        }
    })
})
//客户管理
router.get('/clientmanage',(req,res)=>{
    //接收前端传过来的参数
    let {pageSize,currentPage}=req.query;
    //准备sql
    let sqlStr = "select * from clientdata order by create_time desc";
    //执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        // 获得总条数
        let total=data.length;
    //    跳过多少条
        let n=(currentPage-1)*pageSize;
    //    每页显示多少条
        let m=pageSize;
    //    写sql
        sqlStr+=` limit ${n},${m}`
        // 执行sql
        connection.query(sqlStr,(err,data)=>{
            if(err) throw err;
        //    发送数据回前端
            res.send({total,data});
        })
    })
})
//删除数据
router.get('/clientdel',(req,res)=>{
    // 获取前端传过来的参数
    let {id}=req.query;
//    写sql
    const sqlStr=`delete from clientdata where id='${id}'`;
    console.log(sqlStr);
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,msg:"删除数据成功"})
        }else {
            res.send({code:1,msg:"删除数据失败"})
        }
    })
})
//回填编辑数据
router.get('/clientedit',(req,res)=>{
//    接收参数
    let {id}=req.query;
//    写sql
    const sqlStr=`select * from clientdata where id=${id}`;
//    执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})
//保存数据
router.post('/saveclient',(req,res)=>{
    // 接收参数
    let { id,name,sex,salesStatus,courseData,tel,school,classData,courseStatus,salesMan } = req.body;
//    写sql
    const sqlStr = `update clientdata set name="${name}",sex="${sex}",salestatus="${salesStatus}",coursedata="${courseData}",tel="${tel}",school="${school}",classdata="${classData}",coursestatus="${courseStatus}",saleman="${salesMan}" where id=${id}`;
console.log(sqlStr);
//    执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,msg:"修改数据成功"});
        }else {
            res.send({code:0,msg:"修改数据失败"});
        }
    })
})
//批量删除
router.get('/batchdel',(req,res)=>{
//    接收参数
    let {ids}=req.query;
//    写sql
    const sqlStr =`delete from clientdata where id in (${ids})`;
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,msg:"批量删除成功"})
        }else {
            res.send({code:1,msg:"批量删除失败"})
        }
    })
})
module.exports = router;
