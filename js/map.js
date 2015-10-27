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
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Address');
        data.addColumn('string', 'Location');
        data.addColumn('string', 'Marker')

          data.addRows([
              ['150 Commonwealth Av, Boston, MA, United States', 'Chilton Club',   'blue' ],
              ['60 Paris St, Boston, MA, United Statess',      'Italian American War Vets',   'green'],
              ]);
        // TODO change this url to heroku app url and add logic to it
        var url = ''

        var options = {
zoomLevel: 14,
           showTip: true,
           useMapTypeControl: true,
           icons: {
blue: {
normal: url + 'img/restaurant_icon.png',
          selected: url + 'img/restaurant_icon.png'
      },
green: {
normal: url +'img/drink_icon.png',
          selected: url + 'img/drink_icon.png'
       },
pink: {
normal:   url + 'Map-Marker-Ball-Pink-icon.png',
          selected: url + 'Map-Marker-Ball-Right-Pink-icon.png'
      }
           }
        };
        var map = new google.visualization.Map(document.getElementById('map_div'));

        map.draw(data, options);
      }
