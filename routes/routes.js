"use strict";

// From Post by o-o  http://stackoverflow.com/a/3067896/4805025
Date.prototype.mmddyy = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]) + "/" + yyyy.slice(2); // padding
};

var coordinatesLookup = require("../modules/coordinatesLookup.js")
var locationLookup = require("../modules/locationLookup.js")

var obj = require("../data/schedule2017.json");


obj.forEach(function (a) {
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


var appRouter = function (app) {

    app.get("/games", function (req, res) {

        var offset = -8; //hours from UTC to Pacific
        var day_pacifictime = new Date(new Date().getTime() + offset * 3600 * 1000);

        var todays_games = obj.filter(function (d) {
            var tempDateString = d["START DATE"];

            if (tempDateString == '02/25/17') { //day_pacifictime.mmddyy()) {
                return true;
            }
            else {
                return false;
            }

        });

        return res.send(todays_games);

    });


};

module.exports = appRouter;
