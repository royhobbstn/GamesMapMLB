// Adapted from: http://itblog.mobi/2015/12/29/how-to-create-a-simple-restful-api-with-node-js/

console.log(process.env.NODE_ENV);

var express = require("express");
var app = express();


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function (req, res, next) {
  if (req.url.slice(-1) !== '/' && req.url.slice(-3) !== '.js' && req.url.slice(-3) !== 'tml' && req.url.slice(-3) !== 'css')
    res.redirect(301, req.url + '/');
  else
    next();
});

app.use(express.static('public'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require("./routes/routes.js")(app);

var server = app.listen(8080, function () {
  console.log("Listening on port %s...", server.address().port);
});
