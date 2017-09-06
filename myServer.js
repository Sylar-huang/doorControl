/**
 * File Created by Lenovo at 2017/8/11.
 * Copyright 2016 CMCC Corporation Limited.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * ZYHY Company. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license.
 *
 *
 * @Desc
 * @author Lenovo
 * @date 2017/8/11
 * @version
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');
var angular = require('./routes/angular')
var events = require('events');
var eventEmitter = new events.EventEmitter();
var app = express();

//rpi-gpio部分
// var gpio = require('rpi-gpio');



// gpio.on('change', function(channel, value) {
//     console.log('Channel ' + channel + ' value is now ' + value);
//     //判断指定pin脚是否接通
//     if(channel == 37 && value){
//         eventEmitter.emit('calling')
//     }
//     // monitorChannelList.forEach(function (item, index, input) {
//     //     if(input[index] == channel && value){
//     //         eventEmitter.emit()
//     //     }
//     // })
//
// });





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//配置资源路径
app.use(express.static(path.join(__dirname, 'app')));
// app.use(express.static(path.join(__dirname, 'public')));

const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });



eventEmitter.on('calling', function () {
    ws.send('calling')
})


eventEmitter.on('answerCall',function () {
    console.log('answerCall')

})

eventEmitter.on('openDoor',function () {
    console.log('openDoor')
    // gpio.write(7, true, function(err) {
    //     if (err) throw err;
    //     console.log('Written to pin');
    // });
})



wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        var command = JSON.parse(message);
        eventEmitter.emit(command.action)
        //
        var times = new Date();
        // console.log(times.getTime())
        var messageCall = {data: times.getTime()}
        ws.send(JSON.stringify(messageCall));
    });


});
// app.use('/', index);
// app.use('/users', users);
app.use('/',angular);
// angular启动页
//设置angular: 启动路径为”/”
//设置angular: 启动文件为app/index.html
// app.get('/', function (req, res) {
//     res.sendfile('app/index.html');
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});