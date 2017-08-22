'use strict';
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

//allows us to get JSON body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/ethersportsRoutes'); //importing route
//register the route
routes(app); 

app.listen(port);
console.log('Listening on port: ' + port);
