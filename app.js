var app = require('./lib/getdata');
var config = require('config');

var App = new app(config);

App.Start();