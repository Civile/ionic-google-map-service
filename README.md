# ionic-google-map-service
A very standard but working version of an ionic map service. Pros: simple to use | Cons: maybe limited

I was looking for something very simple to use, without installing any third party plugins, so that's all

Angular version: AngularJS v1.4.3

# How to:
Append this important meta tag to your index.html 
(thanks to mikeon [Issue here](https://forum.ionicframework.com/t/ionic-google-maps-referenceerror-google-is-not-defined/22550/6) )
```
<meta http-equiv="Content-Security-Policy" content="script-src 'self' https://maps.googleapis.com/ https://maps.gstatic.com/ https://mts0.googleapis.com/ 'unsafe-inline' 'unsafe-eval'">
```

Append the google maps api:
```
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>
```

Call and use the service


# Example
HTML:
```
<div class="map-wrapper" ng-init="init()">
  <div id="mymapid" style="width:100%;height:150px;" data-tap-disabled="true"></div>
</div>
```
SCRIPT IN OUR CONTROLLER:
```
$scope.init = function() {
  Map.Init('mymapid', function() {
      Map.GeocodeCoord(43.07493, -89.381388, function(geometry) {
        Map.AddMarker(geometry.location);
      });
  });
}
```
