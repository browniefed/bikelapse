
var HyperlapseContainer = function(container, params)
{
	//EXTEND PARAMS LATER
	var _hyperlapses = [],
	_container = document.getElementById(container),
	_default_params = params,
	_current = 0,
	self = this;

	//SEGMENTS CAN BE A COMBINATION OF HYERPALPSE OBJECTS OR PARAMS 
	this.addRoutes = function(routes) {

		segments = [];
		if (!Array.isArray(routes))
		{
			segments.push(routes);
		}
		else
		{
			segments = routes;
		}
		segments.forEach(function(segment) {
			var isHyperlapse = segment instanceof Hyperlapse;
			if (!isHyperlapse)
			{
				return false;
			}
				//RESET IT TO THE APPROPRIATE PANO, REGENERATE, ETC
				if (segment.isPlaying() || segment.isLoading())
				{
					//segment.pause();
					//segment.cancel();
				}
				//segment._container = this._container;
				//segment.reset();
			
			segment.onError = self.onError;
			segment.onRouteComplete = self.onRouteComplete;
			segment.onLoadComplete = self.onLoadComplete;
			segment.onLoadProgress = self.onLoadProgress;
			segment.onPlay = self.onPlay;
			segment.onFrame = self.onFrame;
			segment.onRouteProgress = self.onRouteProgress;
			_hyperlapses.push(segment);
		});

		return true;
	}

	this.onPlay = function()
	{

	}

	this.onFrame = function (e) {
		/*var img = new Image();
		img.src = this.getCurrentImage().toDataURL();
		document.body.appendChild( img );*/
		if (e.position === (this.length() - 1) )
		{
			this.setCurrentPoint(0);
			this.pause();
			self.playNext();
		}
	}

	this.onError = function(e)
	{
		console.log("ERRRRRORRR")
		console.log(e);
	}
	this.onRouteProgress = function(e)
	{
	}
	this.onRouteComplete = function(e)
	{
		this.load();
	}

	this.onLoadProgress = function(e)
	{
	}
	this.onLoadComplete = function(e)
	{
		var allLoaded = false,
		loadCount = 0;

		self.getHyperlapses().forEach(function(hyperlapse)
		{
			if (!hyperlapse.isLoading())
			{
				loadCount++;
			}
		});
		if (loadCount === self.getHyperlapses().length)
		{
			console.log('all loaded');
			//this.play();
			//self.play();
		}
	}

	this.generate = function()
	{

	}

	this.play = function()
	{
		_hyperlapses[0].play();
		//_hyperlapses[0].play();
	}

	this.playNext = function()
	{

		if (_current + 1 <= _hyperlapses.length - 1)
		{
			_current++;
		}
		else
		{
			_current = 0;
		}
		console.log(_current);
		_hyperlapses[_current].play();
	}

	this.pause = function()
	{

	}

	this.getHyperlapses = function()
	{
		return _hyperlapses;
	}


}