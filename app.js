var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//员工路由
var staffRouter = require('./routes/staff');
//客户路由
var clientRouter = require('./routes/client');
//班级路由
var classRouter = require("./routes/class");
//课程路由
var courseRouter = require("./routes/course");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/staff', staffRouter);
app.use('/client', clientRouter);
app.use('/class',classRouter);
app.use('/course',courseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//监听端口
app.listen(666,()=>{
  console.log("服务器地址：http://127.0.0.1:666");
})
module.exports = app;
