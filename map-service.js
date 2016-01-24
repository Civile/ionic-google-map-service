
/*
 * Map service: first useful version
 * Be sure to append the following meta to your index file:
 * <meta http-equiv="Content-Security-Policy" content="script-src 'self' https://maps.googleapis.com/ https://maps.gstatic.com/ https://mts0.googleapis.com/ 'unsafe-inline' 'unsafe-eval'">
 * .. end the google maps api
 * <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>
*/


myapp.service('Map', function($rootScope, $http) {
  
  var options = {
    center: new google.maps.LatLng(43.07493,-89.381388),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = {
    obj: null,
    id: null,
    markers: [],
    index: 0
  };

  var geocoder = new google.maps.Geocoder();

  /**
   * Initialize
  */
  var Init = function(id, callback) {
      //No add dom listener: use ng-init instead
      map.id = id;
      _init();
      if(callback) {
        callback.call(this);
      }
  }

  //init
  var _init = function(callback) {
    map.obj = new google.maps.Map(document.getElementById(map.id), options);
  }

  /**
   * Geolocalize address
  */
  var Geocode = function(address, callback) {
    if(address.replace(/\s/g, '') === '') return false;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if(callback) {
          callback.call(this, results[0].geometry);
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  /**
   * GeocodeAddress
  */
  var GeocodeCoord = function(lat, lng, callback, fail) {
    var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          if(callback) {
            callback.call(this, results[0].geometry, results, status);
          }
        } else {
          if(fail) fail.call(this, results);
          return false;
        }
      } else {
        if(fail) fail.call(this, status);
        return 'Geocoder failed due to: ' + status;
      }
    });
  }

  /**
   * AddMarker
  */
  var AddMarker = function(location, id) {
    map.obj.setCenter(location);
    var marker = new google.maps.Marker({
      map: map.obj,
      position: location,
      id: id || _nextId()
    });
    map.markers.push(marker);
    return marker;
  };

  /**
   * RemoveMarkers
   * @ids: array of ids OR undefined
  */
  var RemoveMarkers = function(ids) {
    for(var i = map.markers.length -1; i >= 0; i--) {
      var marker = map.markers[i];
      if(typeof ids === "undefined" || !ids) {
        marker.setMap(null);
        map.markers.splice(i, 1);
      } else {
        for(var x in ids) {
          if(parseInt(ids[x]) == parseInt(marker.id)) {
            marker.setMap(null);
            map.markers.splice(i, 1);
          }
        }
      }
    }
  }

  var SetZoom = function(val) {
    map.obj.setZoom(val || 1);
  };

  //Nextid
  var _nextId = function() {
    return map.index++;
  }

  return {
    Init: Init,
    Geocode: Geocode,
    GeocodeCoord: GeocodeCoord,
    AddMarker: AddMarker,
    RemoveMarkers: RemoveMarkers
  }
})