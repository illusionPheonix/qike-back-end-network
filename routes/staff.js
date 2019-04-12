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

//增加员工
router.post('/staffadd',(req,res)=>{
  //接收传过来的数据
    let { account,password,name,sex,birthDate,entryDate,staffGrounp,tel } = req.body;
//    写sql
    const sqlStr = `insert into staffdata(account,password ,name ,sex ,birthdate ,entrydate ,staffgrounp ,tel )  values('${account}','${password}','${name}','${sex}','${birthDate}','${entryDate}','${staffGrounp}','${tel}') `;
//    执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw  err;
        //影响条数大于0，返回添加成功
        if(data.affectedRows>0){
            res.send({code:0,msg:"添加数据成功"});
        }else {
            res.send({code:0,msg:"添加数据失败"});
        }
    })
})
//员工管理
router.get('/staffmanage',(req,res)=>{
    const sqlStr = "select * from staffdata order by create_time desc";
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})

//删除员工
router.get('/staffdel',(req,res)=>{
    // 接收id
    let { id } = req.query;
//    写sql
    const sqlStr = `delete from staffdata where id=${id}`;
//    执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
    //    判断删除状态
        if(data.affectedRows>0){
            res.send({code:0,msg:"删除成功"});
        }else {
            res.send({code:1,msg:"删除失败"});
        }
    })
})

//修改员工数据
router.get('/staffedit',(req,res)=>{
//    接收前端传过来的参数
    let { id } = req.query;
//    写sql
    const sqlStr = `select * from staffdata where id=${id}`;
//    执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw  err;
    //    发送数据回前端
        res.send(data);
    })
})

//保存员工数据
router.post('/staffeditsave',(req,res)=>{
//    接收参数
    let { id,account,name,staffgrounp,sex,tel,birthdate,entrydate }=req.body;
//    写sql
    const sqlStr = `update staffdata set account="${account}",name="${name}",staffgrounp="${staffgrounp}",sex="${sex}",account="${account}",tel="${tel}",birthdate="${birthdate}",entrydate="${entrydate}" where id=${id}`;
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if(data.affectedRows>0){
            res.send({code:0,msg:"修改数据成功"});
        }else {
            res.send({code:1,msg:"修改数据失败"});
        }
    })
})

//批量删除数据
router.get('/batchdel',(req,res)=>{
    //接收前端发送的数据
    let { id } = req.query;
//    写sql
    const sqlStr = `delete from staffdata where id in (${id})`;
//   执行sql
    connection.query(sqlStr,(err,data)=>{
        if(data.affectedRows>0){
            res.send({code:0,msg:"批量删除成功"})
        }else {
            res.send({code:1,msg:"批量删除失败"})
        }
    })
})

//根据分页信息返回员工列表
router.get('/stafflistbypage',(req,res)=>{
    // 接收前端传过来的参数
    let { pageSize,currentPage } = req.query;
    //写sql
    let sqlStr = `select * from staffdata order by create_time desc`;
    //执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
    //    计算总条数
        let total = data.length;
        let n = (currentPage-1)*pageSize;//跳过多少条
        let m = pageSize;//每页展示多少条
    //    拼接sql
        sqlStr+=` limit ${n},${m}`;
        // 执行sql
       connection.query(sqlStr,(err,data)=>{
           if(err) throw err;
            res.send({data,total})
       })
    })
})

module.exports = router;
