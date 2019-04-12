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

//增加班级
router.post('/classadd',(req,res)=>{
  //接收传过来的数据
    let { className,classCourse,classSet,classType,classCourses,classDate,classTime,classroom,teacher  } = req.body;
//    写sql
    const sqlStr = `insert into classdata(classname,classcourse,classset,classtype,classcourses,classdate,classtime ,classroom,teacher) values('${className}','${classCourse}','${classSet}','${classType}','${classCourses}','${classDate}','${classTime}','${classroom}','${teacher}') `;
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
//班级管理
router.get('/classmanage',(req,res)=>{
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

module.exports = router;
