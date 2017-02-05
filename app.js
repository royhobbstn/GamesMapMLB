// Adapted from: http://itblog.mobi/2015/12/29/how-to-create-a-simple-restful-api-with-node-js/

console.log(process.env.NODE_ENV);

var express = require("express");
var app = express();
var path = require('path');

// app.all(/^\/main$/, function(req, res) { res.redirect('/main/'); });
// app.use('/main/',express.static(__dirname+'/public'));

var prod_path = '/';

if (process.env.NODE_ENV === 'docker') {
  prod_path = '/';
}

app.use(prod_path, express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require("./routes/routes.js")(app);

var server = app.listen(8080, function () {
  console.log("Listening on port %s...", server.address().port);
});
