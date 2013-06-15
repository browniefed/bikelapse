

var bikelapse = (function(){
	var hyperlapse = new Hyperlapse(document.getElementById('pano')),
	lookat = [],
	zoom: 1,
	use_lookat: false,
	elevation: 50,
	directions_service = new google.maps.DirectionsService(),
	route: [],
	travelMode = google.maps.DirectionsTravelMode.DRIVING;



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
	//ARRAY WITH FOLLOWING FORMAT
	//origin: new google.maps.LatLng(37.816480000000006,-122.47825,37),
	//	destination: new google.maps.LatLng(37.81195,-122.47773000000001),
	//	travelMode: (Optional)
	function addRoute(segments)
	{
		segments.forEach(segment, function() {
			segment.travelMode = segment.travelMode || travelMode;
			directions_service.route(segment, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					routes.push(response);
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
		return route;
	}

	function generate()
	{
		hyperlapse.generate(route);
	}

	return {
		init: init,
		addRoute: addRoute,
		getRoute: getRoute,
		addSegment: addSegment,
		generate: generate
	}
})
			
/*
var route = {
				request:{
					
				}
			};
 */
			