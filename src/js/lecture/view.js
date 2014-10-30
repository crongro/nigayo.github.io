define(["common", "data"] , function(oCommon, oData) {
	var _innerVar;
	var _welNav;
	var _nST;
	var _welWindow;
	var _nNavTopPos;
	var nScrollStart;


	function _init() {
		_initElements();
		_onEvents();
	}

	function _initElements() {
		_welWindow 		= jindo.$Element(window);
		_welMainBody 	= jindo.$Element("mainBody");
		_welNav 		= _welMainBody.query(".left_nav");
		_nNavTopPos 	= _welMainBody.offset().top;
	}

	function _onEvents () {
		_welWindow.attach("scroll", function(we) {
			_scrollMonitorHandler(we);
		});
	}

	function _scrollMonitorHandler(we) {
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
						//console.log("1초 동안 scroll 변화없었음",nScrollStart.time(), _afterTime.time(), nScrollStart.compare(_afterTime));
						//TODO apply animation
						_execAnimationNav(_nScrollY);
					}
			}, oData.nav_lazy_time);
	}

	function _execAnimationNav(_nScrollY) {
		var _nowTop = parseInt(_welNav.css('top'));
		console.log("현재 스크롤 위치 -> " , _nowTop);
		console.log("가야할 위치 -> " , (_nScrollY-220));
	}

	return {
		"init" : _init
	}
});