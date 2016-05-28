var ballparks = require("../data/ballparks.json");


module.exports = function(matchParkName){
  for(let i=0;i<ballparks.length;i++){
    
    if(ballparks[i].properties.Ballpark===matchParkName){
        return (ballparks[i].geometry.coordinates);
    }
  }
  
  return 'no';
    
}