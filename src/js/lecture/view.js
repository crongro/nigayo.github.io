//define(["jindo"] , function(jindo) {
define(["common"] , function(oCommon) {
	var _innerVar;
	var _welNav;


	function _init() {
		_initElements();
		_onEvents();
	}

	function _initElements() {
		_welMainBody = jindo.$Element("mainBody");
		_welNav = _welMainBody.query(".left_nav");
	}

	function _onEvents () {
		//TODO
		//_welNav.attach('')
		var _welWindow = jindo.$Element(window);
		var _nNavTopPos = _welMainBody.offset().top; //220

		var nScrollStart = 0;
		_welWindow.attach("scroll", function(we) {
			_nScrollY = we.currentElement.scrollY;

			if(_nScrollY < _nNavTopPos)  return;

			var _nNowScrollTime = new jindo.$Date(Date.now());
			nScrollStart = _nNowScrollTime;

			setTimeout(function(){
				var _afterTime = new jindo.$Date(Date.now());
					if((nScrollStart.compare(_afterTime)) > 500) {
						console.log("1초 동안 scroll 변화없었음",nScrollStart.time(), _afterTime.time(), nScrollStart.compare(_afterTime));
					}
			},500);
		});
	}

	return {
		"init" : _init
	}
});