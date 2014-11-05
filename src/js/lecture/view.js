define(["common", "data"] , function(oCommon, oData) {
	var _innerVar;
	var _welNav;
	var _welGithubAnswerUrl;
	var _nST;
	var _welWindow;
	var _nNavTopPos;
	var nScrollStart;


	function _init() {
		_initElements();
		_showGithubArea();
		_onEvents();
	}

	function _initElements() {
		_welWindow 		= jindo.$Element(window);
		_welMainBody 	= jindo.$Element("mainBody");
		_welNav 		= _welMainBody.query(".left_nav");
		_nNavTopPos 	= _welMainBody.offset().top;
		_welGithubAnswerUrl = _welMainBody.query(".lecture_content:last-child a");
	}

	function _showGithubArea() {
		var _sURL = _welGithubAnswerUrl.attr("href");
		if(_sURL === "") _welGithubAnswerUrl.parent().parent().css("display", "none");
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

			_nST =  setTimeout(function(){
						var _afterTime = new jindo.$Date(Date.now());
						if((nScrollStart.compare(_afterTime)) >= oData.nav_lazy_time) {
							_execAnimationNav(_nScrollY);
						}
					}, oData.nav_lazy_time);
	}

	// 효과는 transition에 위임했음
	function _execAnimationNav(_nScrollY) {
		var _nowTopPos = parseInt(_welNav.css('top'));
		var _resultTopPos = _nScrollY - _nNavTopPos;
		var _nBuffer = 50;

		if (_resultTopPos < 0) _resultTopPos = 0;
		_welNav.css("top", _resultTopPos + _nBuffer +"px");
	}

	return {
		"init" : _init
	}
});