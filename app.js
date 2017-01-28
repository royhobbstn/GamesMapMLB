//Adapted from: http://itblog.mobi/2015/12/29/how-to-create-a-simple-restful-api-with-node-js/

var express = require("express");
var app = express();
var path = require('path');

app.use(express.static('public'));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routes = require("./routes/routes.js")(app);

var server = app.listen(8080, function () {
  console.log("Listening on port %s...", server.address().port);
});
