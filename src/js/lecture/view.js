define(["common", "data"] , function(oCommon, oData) {
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
		var _welWindow = jindo.$Element(window);
		var _nNavTopPos = _welMainBody.offset().top; //220
		var _nST;
		var nScrollStart = 0;

		_welWindow.attach("scroll", function(we) {
			_nScrollY = we.currentElement.scrollY;

			if(_nScrollY < _nNavTopPos)  return;

			//새로운 scroll을 적용할때 이전 timeout은 지워버린다.
			if(typeof _nST == "number")  {
				window.clearTimeout(_nST);
				_nST = undefined;
			}

			var _nNowScrollTime = new jindo.$Date(Date.now());
			nScrollStart = _nNowScrollTime;

			_nST = setTimeout(function(){
				var _afterTime = new jindo.$Date(Date.now());
					if((nScrollStart.compare(_afterTime)) > oData.nav_lazy_time) {
						console.log("1초 동안 scroll 변화없었음",nScrollStart.time(), _afterTime.time(), nScrollStart.compare(_afterTime));
						//TODO apply animation
					}
			}, oData.nav_lazy_time);
		});
	}

	return {
		"init" : _init
	}
});