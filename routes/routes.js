"use strict";

Date.prototype.mmddyy = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]) + "/" + yyyy.slice(2); // padding
};

var coordinatesLookup = require("../modules/coordinatesLookup.js")
var locationLookup = require("../modules/locationLookup.js")

var obj = require("../data/schedule.json");


obj.forEach(a => {
  delete a["END DATE"];
  delete a["END DATE ET"];
  delete a["END TIME"];
  delete a["END TIME ET"];
  delete a["REMINDER OFF"];
  delete a["REMINDER ON"];
  delete a["REMINDER DATE"];
  delete a["REMINDER TIME"];
  delete a["REMINDER TIME ET"];
  delete a["SHOWTIMEAS FREE"];
  delete a["SHOWTIMEAS BUSY"];
  a.ballpark = locationLookup(a["LOCATION"]);
  a.coordinates = coordinatesLookup(a.ballpark);
});


var appRouter = function(app) {

    app.get("/games", function(req, res) {

        var newday = new Date();
        var today = (newday.toLocaleDateString()).split("/");
        var realday = new Date(parseInt(today[2]),(parseInt(today[0])-1), parseInt(today[1]));
        //console.log(newday.mmddyy());
        //console.log(realday.mmddyy());
      
        var todays_games = obj.filter(d => {
            var tempDateString = d["START DATE"];

            if (tempDateString == realday.mmddyy()) {
                return true;
            } else {
                return false;
            }

        });

        return res.send(todays_games);

    });

}

module.exports = appRouter;