'use strict';

//Liquor licenses data
var liquor = 0;
var restaurants = 0;

$.get('https://data.cityofboston.gov/resource/hda6-fnsh.json', function (data, status) {
  liquor = data;
});

$.get('https://data.cityofboston.gov/resource/hda6-fnsh.json', function (data, status) {
  restaurants = data;
});

google.load('visualization', '1.1', {packages: ['map']});
google.setOnLoadCallback(drawMap);

function drawMap () {
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string', 'Address');
  dataTable.addColumn('string', 'Location');
  dataTable.addColumn('string', 'Marker');

  var allRestaurants = [];

  for (var i = 1; i < 20; i++) {
    if (restaurants[i]["stno"] !== undefined && restaurants[i]["address"] !== undefined) {

    // debugger;
    var address = restaurants[i]['stno'] + restaurants[i]['address'] + ", Boston, MA";
    allRestaurants.push([address, restaurants[i]["businessname"], 'blue']);
    }
  }
  dataTable.addRows(allRestaurants);



  var options = {
    zoomLevel: 13,
    showTip: true,
    useMapTypeControl: true,
    icons: {
      blue: {
        normal:  'images/restaurant_icon.png',
        selected: 'images/restaurant_icon.png'
      },
      green: {
        normal: +'images/drink_icon.png',
        selected: 'images/drink_icon.png'
      },
      pink: {
        normal:    'Map-Marker-Ball-Pink-icon.png',
        selected:  'Map-Marker-Ball-Right-Pink-icon.png'
      }
    }
  };
  var map = new google.visualization.Map(document.getElementById('map_div'));

  map.draw(dataTable, options);
}
