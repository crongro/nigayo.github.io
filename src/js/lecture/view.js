define(["common", "data"] , function(oCommon, oData) {
	var _innerVar;
	var _welNav;
	var _welGithubAnswerUrl;
	var _nST;
	var _welWindow;
	var _nNavTopPos;
	var _welNavMobile;
	var _welAllMenu;
	var _welCloseNav;
	var nScrollStart;
	var jindo;
	var oUtil;

	function _init() {
		_initElements();
		_showGithubArea();
		_setViewerSize();
		_onEvents();
	}

	function _initElements() {
		jindo 			= oCommon.jindo;
		oUtil 			= oCommon.util;
		_welWindow 		= jindo.$Element(window);
		_welMainBody 	= jindo.$Element("mainBody");
		_welAllMenu 	= jindo.$Element("all_menu");
		_welNav 		= _welMainBody.query(".left_nav");
		_welNavMobile	= _welAllMenu.query(".left_nav_mobile");
		_welCloseNav 	= _welAllMenu.query(".left_nav_mobile .closeNav");
		_nNavTopPos 	= _welMainBody.offset().top;
		_welGithubAnswerUrl = _welMainBody.query(".lecture_content:last-child a");
	}

	function _showGithubArea() {
		var _sURL = _welGithubAnswerUrl.attr("href");
		if(_sURL === "") _welGithubAnswerUrl.parent().parent().css("display", "none");
	}

	function _setViewerSize() {
		if( !oUtil.isMobile() ) return;

		var _wElListLectureContent = jindo.$ElementList(".lecture_content iframe");
		_wElListLectureContent.attr("width", "100%");
		_wElListLectureContent.attr("height", "300px");
	}

	function _onEvents () {


		if( oUtil.isMobile() )  { 
			_welAllMenu.attach("touchEnd" , function(we) {
				if(_welNavMobile.css("display") === "none") _welNavMobile.css("display", "block");
				//we.stop(jindo.$Event.CANCEL_ALL);
			});


			_welCloseNav.attach("touchEnd" , function(we){
				_welNavMobile.css("display", "none");
				we.stop(jindo.$Event.CANCEL_ALL);
			});

		} else {
			_welAllMenu.attach("click" , function(we) {
				if(_welNavMobile.css("display") === "none") _welNavMobile.css("display", "block");
				//we.stop(jindo.$Event.CANCEL_ALL);
			});


			_welCloseNav.attach("click" , function(we){
				_welNavMobile.css("display", "none");
				we.stop(jindo.$Event.CANCEL_ALL);
			});

			_welWindow.attach("scroll", function(we) {
				_scrollMonitorHandler(we);
			});
		}

	}

	function _scrollMonitorHandler(we) {
			//_nScrollY = we.currentElement.scrollY;
			_nScrollY = we.currentElement.pageYOffset;

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