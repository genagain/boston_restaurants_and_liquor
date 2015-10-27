
//Liquor licenses data
var liquor = 0;
var restaurants = 0;

$.get('https://data.cityofboston.gov/resource/hda6-fnsh.json', function (data, status) {
  liquor = data;
});

$.get('https://data.cityofboston.gov/resource/gb6y-34cq.json', function (data, status) {
  restaurants = data;
});

google.load('visualization', '1.1', {packages: ['map']});
google.setOnLoadCallback(drawMap);

function drawMap () {
  'use strict';
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string', 'Address');
  dataTable.addColumn('string', 'Location');
  dataTable.addColumn('string', 'Marker');

  var allPlaces = [];
  var address;

  for (var i = 1; i < 21; i++) {
    if (restaurants[i].address !== undefined) {
      address = restaurants[i].address + ", Boston, MA";
      allPlaces.push([address, restaurants[i].businessname, 'restaurant']);
    }
  }
  for (i = 1; i < 21; i++) {
    if (restaurants[i].address !== undefined) {
      address = restaurants[i].address + ", Boston, MA";
      allPlaces.push([address, restaurants[i].businessname, 'liquor']);
    }
  }
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


