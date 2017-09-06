/**
 * Created by sylarhuang on 2017/8/12.
 */
var angular = require('angular');//引入angular
// var angularws = require('angular-websocket')
require('../node_modules/angular-websocket/dist/angular-websocket.js')
// require("bootstrap-webpack");

// require('../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot')
var angularboostrap  = require('angular-ui-bootstrap')

// require("bootstrap-webpack!./bootstrap.config.js");
// require('../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js')
var ngModule = angular.module('app',['angular-websocket','ui.bootstrap']);//定义一个angular模块
require('./scripts/directives/hello-world/hello-world.js')(ngModule);//引入指令(directive)文件
require('./styles/style.css');//引入样式文件
// require('../node_modules/bootstrap/dist/css/bootstrap.css')

require('./scripts/factories/MyData.js')(ngModule); //引入websocket样例
require('./scripts/controllers/SampleController.js')(ngModule)