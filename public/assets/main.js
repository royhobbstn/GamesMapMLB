var map = L.map('map').setView([40, -95], 4);

L.tileLayer(
	'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>' +
			' | <a id="mapcredits" href="#">Map Credits</a>',
		id: 'mapbox.light'
	}).addTo(map);

var win = L.control.window(map, {
	title: 'Credits',
	content: '<a href="" target="_blank">Writeup</a><br /><br /><b>Data:</b><br />James Fee <a href="https://github.com/cageyjames/GeoJSON-Ballparks" target="_blank">GeoJSON Ballparks</a><br />Me: <a href="" target="_blank" >MLB Schedule Data</a><br /><br /><b>Plugins</b><br /><a href="https://github.com/mapshakers/leaflet-control-window" target="_blank" >Leaflet Control Window</a> (this)',
	modal: true
});

document.getElementById('mapcredits').addEventListener('click', function () {
	win.show();
});

var xhr = new XMLHttpRequest();
xhr.open('GET', './games');
xhr.send(null);

xhr.onreadystatechange = function () {
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			var game_day_data = JSON.parse(xhr.responseText);
			pictureArray(game_day_data);
		}
		else {
			console.log('Error: ' + xhr.status);
		}
	}
};

function addMarkers(game_day_data, values) {

	var markers = [];

	game_day_data.forEach(function (d, i) {
		var newIcon = L.icon({
			iconUrl: values[i],
			iconSize: [30, 40],
			iconAnchor: [15, 40],
			popupAnchor: [0, -15]
		});

		markers[i] = L.marker([d.coordinates[1], d.coordinates[0]], {
			icon: newIcon
		}).addTo(map);
		markers[i].bindPopup("<b>" + d["SUBJECT"] + "</b><br />" + ((d["START TIME"]) ? (d["START TIME"]).replace(/^[0]+/g, '') : "") + " (local)<br />" + ((d["START TIME ET"]) ? d["START TIME ET"].replace(/^[0]+/g, '') : "") + " (ET)<br />" + d["LOCATION"]);
	});

}

function pictureArray(game_day_data) {

	var length = game_day_data.length;
	var c = []; //canvas elements
	var a = []; //promises

	for (var i = 0; i < length; i++) {
		c[i] = document.createElement('canvas');
		c[i].width = 30;
		c[i].height = 40;
		c[i].setAttribute("style", "display: none;");
		var teams = (game_day_data[i].SUBJECT).replace(" - Time TBD", "");
		teams = teams.split(' at ');
		c[i].dataset.home = teamAbbrevLookup(teams[1]);
		c[i].dataset.away = teamAbbrevLookup(teams[0]);
	}

	//Technique adapted from: http://stackoverflow.com/a/15620872/4805025
	c.forEach(function (elem, idx) {
		var home = elem.dataset.home;
		var away = elem.dataset.away;
		a[idx] = new Promise(function (resolve, reject) {
			var ctx = elem.getContext("2d");
			var imageObj1 = new Image();
			var imageObj2 = new Image();
			var imageObj3 = new Image();
			imageObj1.src = "markers/frame.png";
			imageObj1.onload = function () {
				ctx.drawImage(imageObj1, 0, 0);
				imageObj2.src = "markers/" + away + ".png";
				imageObj2.onload = function () {
					ctx.drawImage(imageObj2, 1, 1);
					imageObj3.src = "markers/" + home + ".png";
					imageObj3.onload = function () {
						ctx.drawImage(imageObj3, 1, 16);
						var img = elem.toDataURL("image/png");
						resolve(img);
					}
				}
			}
		});
	});

	Promise.all(a).then(function (values) {
		addMarkers(game_day_data, values);
	}, function (reason) {
		console.log('error:', reason);
		return 'error';
	});
} //end pictureArray
