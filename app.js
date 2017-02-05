// Adapted from: http://itblog.mobi/2015/12/29/how-to-create-a-simple-restful-api-with-node-js/



var express = require("express");
var app = express();



app.use(function (req, res, next) {
  console.log(req.url);
  console.log(req.url.slice(-3))
  console.log(req.originalUrl);
  console.log(req.originalUrl.slice(-3));

  // if (req.url.slice(-3) === '/') {
  //   console.log('this');
  //   res.redirect(301, req.url + 'mlb/');
  // }
  // else
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
