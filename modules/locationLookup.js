

module.exports = function(location){
  
  var new_location = "";
  
  if(location==="AT&T Park - San Francisco"){new_location="AT&T Park";}
  if(location==="Chase Field - Phoenix"){new_location="Chase Field";}
  if(location==="Turner Field - Atlanta"){new_location="Turner Field";}
  if(location==="Oriole Park at Camden Yards - Baltimore"){new_location="Oriole Park at Camden Yards";}
  if(location==="Fenway Park - Boston"){new_location="Fenway Park";}
  if(location==="Wrigley Field - Chicago"){new_location="Wrigley Field";}
  if(location==="U.S. Cellular Field - Chicago"){new_location="U.S. Cellular Field";}
  if(location==="Great American Ball Park - Cincinnati"){new_location="Great American Ball Park";}
  if(location==="Progressive Field - Cleveland"){new_location="Progressive Field";}
  if(location==="Coors Field - Denver"){new_location="Coors Field";}
  if(location==="Comerica Park - Detroit"){new_location="Comerica Park";}
  if(location==="Marlins Park - Miami"){new_location="Marlins Park";}
  if(location==="Minute Maid Park - Houston"){new_location="Minute Maid Park";}
  if(location==="Kauffman Stadium - Kansas City"){new_location="Kauffman Stadium";}
  if(location==="Angel Stadium of Anaheim - Anaheim"){new_location="Angels Stadium";}
  if(location==="Dodger Stadium - Los Angeles"){new_location="Dodger Stadium";}
  if(location==="Miller Park - Milwaukee"){new_location="Miller Park";}
  if(location==="Target Field - Minneapolis"){new_location="Target Field";}
  if(location==="Citi Field - Flushing"){new_location="Citi Field";}
  if(location==="Yankee Stadium - Bronx"){new_location="Yankee Stadium";}
  if(location==="Oakland Coliseum - Oakland"){new_location="Network Associates Coliseum";}
  if(location==="Citizens Bank Park - Philadelphia"){new_location="Citizens Bank Park";}
  if(location==="PNC Park - Pittsburgh"){new_location="PNC Park";}
  if(location==="Petco Park - San Diego"){new_location="PETCO Park";}
  if(location==="Safeco Field - Seattle"){new_location="Safeco Field";}
  if(location==="Busch Stadium - St. Louis"){new_location="Busch Stadium";}
  if(location==="Tropicana Field - St. Petersburg"){new_location="Tropicana Field";}
  if(location==="Globe Life Park in Arlington - Arlington"){new_location="The Ballpark in Arlington";}
  if(location==="Rogers Centre - Toronto"){new_location="Rogers Centre";}
  if(location==="Nationals Park - Washington"){new_location="Nationals Park";}
   
  
  return (new_location || "INVALID");
    
}