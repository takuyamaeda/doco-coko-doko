/*
 * GoogleMap
 */
var map;
var currentLatLng;
var markerArray = [];
function initMap(clickEvent, callback) {

	// 現在地取得
	var positionOptions = {
	                enableHighAccuracy: true
	}
	navigator.geolocation.getCurrentPosition(function(pos) {
		// 位置情報をcurrentLatLngへ読み込み
		watchMarker(pos);
	        // google map 読み込み
	        var mapOptions = {
	                        zoom: 13,
	                        center: currentLatLng,
	                        mapTypeId: google.maps.MapTypeId.ROADMAP
	        }
	        map = new google.maps.Map($('#map_canvas')[0], mapOptions);

		// イベント登録
		if (clickEvent) {
			google.maps.event.addListener(map, 'click', clickEvent);
		}
	});

	if (callback) {
		callback();
	}
}

function addMarker(name, latlng) {
	var infoWindow = new google.maps.InfoWindow({
		content: '<div>'+ name +'</div>'
	});
	var options = {
		position: new google.maps.LatLng(latlng.mb, latlng.nb),
		map: map,
		draggable: true
	};
	if (name) {
		options.title = name;
	}
	var marker = new google.maps.Marker(options);
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.open(map, marker);
	});
	markerArray.push(marker);
}

function clearMarker() {
	markerArray.forEach(function(marker){
		marker.setMap(null);
	});
	markerArray = new Array();

}

function watchMarker(pos) {
	// 現在位置をcurrentLatLngへ読みこみ
	var latlng = new google.maps.LatLng(
		pos.coords.latitude, pos.coords.longitude);

	currentLatLng = latlng;
}
