
//Liquor licenses data
var liquor;
var restaurants;
var min;
var max;
var allPlaces = [];
var address;

$.get('https://data.cityofboston.gov/resource/hda6-fnsh.json?$order=issdttm DESC&$limit=1&$where=issdttm IS NOT NULL', function (data, status) {
  min = data[0].issdttm;
});

$.get('https://data.cityofboston.gov/resource/hda6-fnsh.json?$order=issdttm ASC&$limit=1&$where=issdttm IS NOT NULL', function (data, status) {
  max = data[0].issdttm;
});

//liquor
$.get("https://data.cityofboston.gov/resource/hda6-fnsh.json?$where=issdttm < \'2013-10-19T14:00:00\'", function (data, status) {
  liquor = data;
  for (var i = 0; i < data.length; i++) {
    if (liquor[i].stno !== undefined || liquor[i].address !== undefined) {
      address = liquor[i].stno + liquor[i].address + ", Boston, MA";
      allPlaces.push([address, liquor[i].businessname, 'liquor']);
    }
  }
});

//restaurants
$.get("https://data.cityofboston.gov/resource/gb6y-34cq.json?$where=licenseadddttm < \'2006-12-06T12:00:00\'", function (data, status) {
  restaurants = data;
  for (i = 0; i < data.length; i++) {
    if (restaurants[i].address !== undefined) {
      address = restaurants[i].address + ", Boston, MA";
      allPlaces.push([address, restaurants[i].businessname, 'restaurant']);
    }
  }
});

google.load('visualization', '1.1', {packages: ['map']});

window.onload = drawMap;

function drawMap () {
  'use strict';
  var icons = {
    restaurant: {
      name: 'Restaurants',
      icon: 'images/restaurant_icon.png'
    },
    alcohol: {
      name: 'Alcohol Establishments',
      icon: 'images/drink_icon.png'
    }
  };

  dataTable.addColumn('string', 'Address');
  dataTable.addColumn('string', 'Location');
  dataTable.addColumn('string', 'Marker');

  dataTable.addRows(allPlaces);

  var options = {
    zoomLevel: 13,
    showTip: true,
    useMapTypeControl: true,
    icons: {
      restaurant: {
        normal:  'images/restaurant_icon.png',
        selected: 'images/restaurant_icon.png'
      },
      liquor: {
        normal: 'images/drink_icon.png',
        selected: 'images/drink_icon.png'
      }
    }
  };

  var legend = document.getElementById('legend');
  for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }
  var map = new google.visualization.Map(document.getElementById('map_div'));

  map.draw(dataTable, options);
}


