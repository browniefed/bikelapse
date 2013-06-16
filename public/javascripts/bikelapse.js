/*
var testRoutes = [
{
	origin: new google.maps.LatLng(37.816480000000006,-122.47825,37),
	destination: new google.maps.LatLng(37.81195,-122.47773000000001),
	travelMode: google.maps.DirectionsTravelMode.DRIVING
},
{
	origin: new google.maps.LatLng(44.3431,6.783936),
	destination: new google.maps.LatLng(44.340578,6.782684),
	travelMode: google.maps.DirectionsTravelMode.DRIVING
}];

*/

var responses = [];

var _renderer = false;

var isWebGL = function () {
	try {
		return !! window.WebGLRenderingContext
	      && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	} catch(e) {
		console.log('WebGL not available starting with CanvasRenderer');
		return false;
	}
};

_renderer = isWebGL() ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();

var bikelapse = new HyperlapseContainer('pano', {});
points.forEach( function(route, j) {
	var directions_service = new google.maps.DirectionsService();
	directions_service.route(route, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			var hyperlapse = new Hyperlapse(document.getElementById('pano'),{},_renderer);
			hyperlapse.generate({route:response});
			bikelapse.addRoutes(hyperlapse);
		} else {
			console.log(status);
		}
	});

});



/*
var bikelapse = (function(){
	var hyperlapse = new Hyperlapse(document.getElementById('pano')),
	lookat = [],
	zoom = 1,
	use_lookat = false,
	elevation = 50,
	routes = [],
	travelMode = google.maps.DirectionsTravelMode.DRIVING,
	startGenerate = false,
	isGenerateable = false;



	function init()
	{
		bindHyperlapse();
	}

	function bindHyperlapse()
	{
		hyperlapse.onError = onError;
		hyperlapse.onRouteComplete = onRouteComplete;
		hyperlapse.onLoadComplete = onLoadComplete;
	}

	function onError(e)
	{
		//HANDLE ERROR
		console.log(e);
	}

	function onRouteComplete(e)
	{
		hyperlapse.load();
	}

	function onLoadComplete(e)
	{
		hyperlapse.play();
	}

	function onRoutesAdded()
	{
		console.log(routes);
		if (startGenerate) {
			generate();
		}
	}
	//ARRAY WITH FOLLOWING FORMAT
	//origin: new google.maps.LatLng(37.816480000000006,-122.47825,37),
	//	destination: new google.maps.LatLng(37.81195,-122.47773000000001),
	//	travelMode: (Optional)
	function addRoute(segments)
	{
		routes = routes || [];
		var routeCount = 0;
		isGenerateable = false;
		segments.forEach(function(segment) {

			segment.travelMode = segment.travelMode || travelMode;
			var directions_service = new google.maps.DirectionsService();

			directions_service.route(segment, function(response, status) {

				if (status == google.maps.DirectionsStatus.OK) {
					console.log(response);
					console.log(response.routes[0].overview_path[0]);
					routes.push(response);
					routeCount++;
					if (segments.length == routeCount) {
						isGenerateable = true;
						onRoutesAdded();
					}
				} else {
					console.log(status);
				}
			});
		});
	}
	//0 BASED ARRAY
	function addSegment(segment, position)
	{
		//SHOULD CHECK IF POSITION IS A NUMBER
		directions_service.route(segment, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				routes.splice(position,0,response);
			} else {
				console.log(status);
			}
		});
	}

	function getRoute() {
		return routes;
	}

	function generate()
	{
		if (isGenerateable) {
			hyperlapse.generate(routes);
		}
		startGenerate = true;
	}

	function snapToRoad(point, callback) {
		var request = { origin: point, destination: point, travelMode: google.maps.TravelMode["DRIVING"] };
		directions_service.route(request, function(response, status) {
			if(status=="OK") callback(response.routes[0].overview_path[0]);
			else callback(null);
		});
	}

	return {
		init: init,
		addRoute: addRoute,
		getRoute: getRoute,
		addSegment: addSegment,
		generate: generate
	};
}());

var testRoutes = [

];

bikelapse.init();
bikelapse.addRoute(testRoutes);
//bikelapse.generate();


 */