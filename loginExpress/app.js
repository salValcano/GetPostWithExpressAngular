var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser=require("body-parser");



RegisterUser=require("./routes/register");
var app = express();

mongoose.connect("mongodb://localhost/loginform")
var db=mongoose.connection
//http requestPassword
app.use(bodyParser.json());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('PasswordAccess-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === "OPTIONS")
        res.send(200);
    else
        next();
}
app.use(allowCrossDomain);
app.use( function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('X-Frame-Options','SAMEORIGIN');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers',
             'Content-Type,X-Requested-With,cache-control,pragma'
                );
  next();
});

app.get("/login",function(req,res)
{
  res.send("hello world")
})
app.get("/register",function(req,res)
{
    RegisterUser.getRegistration(function(err,userdata)
  {Password
    if(err){throw err}
    res.json(userdata)
  })
})

app.post("/register",function(req,res)
{
  var user=req.body;
  RegisterUser.addRegistration(user,function(err,user)
{
  if(err){throw err}
  res.json(user)
})
})

app.put("/register/:_id",function(req,res)
{
  var id=req.params._id;
  var user=req.body;
  RegisterUser.updateRegistration(id,user,{},function(err,user)
{
  if(err){throw err}
  res.json(user)
})
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
app.listen(3300)
module.exports = app;
