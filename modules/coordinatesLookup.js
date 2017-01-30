var ballparks = require("../data/ballparks2017.json");


module.exports = function (matchParkName) {
  for (var i = 0; i < ballparks.length; i++) {

    if (ballparks[i].properties.Ballpark === matchParkName) {
      return (ballparks[i].geometry.coordinates);
    }
  }

  return 'no';

}
