
var Nigayo = {};
Nigayo.List = Nigayo.List || {};

Nigayo.List = (function() {

  function MakeListUI (arg) {

    //new 키워드를 포함하지 호출하지 않을 때도 잘 되게 하자 
    if(this.constructor !== MakeListUI) {
      return new MakeListUI(arg);
    }

    this.elCategory = $Element('categoryList');

     //초기 레이아웃 설정
     var _nCategoryHeight = this.elCategory.height();
     var _nMainBodyHeight = $Element('mainBody').height();
     var _nTopPos = (_nMainBodyHeight - _nCategoryHeight)/2;
     this.elCategory.css('top',_nTopPos+'px');

     this._resetCategoryMenu();
  }

  MakeListUI.prototype._resetCategoryMenu = function() {
    var ellist = $$("#list section");
    var listmenu = $$("#categoryList > li");

    for(var i=0; i< ellist.length;i++){
      var _wEl = $Element(ellist[i]);
      var _ulCount = _wEl.query("ul").child().length;
      if(_ulCount < 1) $Element(listmenu[i]).leave();
    }
 };

  MakeListUI.prototype.attachEvents = function() {
    this.elCategory.delegate('click', 
        function (oEle, oClickEle) {
          return ((oClickEle.nodeName == "LI") && !utils.isMobile());
        },
    MakeListUI._menuHandler); //end of Delegate
  };


  MakeListUI.prototype.fireLayer = function() {
    var oLiOffset = this.elCategory.query('li:first-child').offset();
    this.elCategory.query('li:first-child').fireEvent('click');
  };


  //  이 함수는 테스트코드에서만 호출하도록 한다 
  MakeListUI.prototype.$_getPriv = function() {
    return this.constructor;
  };

  MakeListUI._menuHandler = function(eEvent) {
      // declaration Variables
      var weSelectedMenu  = $Element(eEvent.element); //좌측 선택영역
      var sCat            = weSelectedMenu.text().trim();
      var weMatchedList   = $Element($$.getSingle('.CAT_'+sCat));
      var welefoot        = $Element($$.getSingle('footer'));
      var welSections     = $ElementList('section#list section');

      //초기화 작업. 모든 section 태그를 숨긴다.
      MakeListUI._hideAllSection(welSections);

      /* MENU */ 
      MakeListUI._setMenu(weSelectedMenu);

      /* LIST */
      MakeListUI._listController(weMatchedList, weSelectedMenu);

      //본문을 이제 보여줘야 할때임
      $("mainBody").style.visibility = "visible";

      /* FOOTER */
       //_setFooter(weMatchedList,welefoot);

  }; //end of menuHandler Function


  /**
   * 좌측 메뉴가 선택될때 마다 배경/색깔을 설정 함 (css toggle)
   * @param {[Jindo Element]} selectedEle
   */
  MakeListUI._setMenu = function(wselectedEle) {

    var weChilds = wselectedEle.parent().child();

    for(var i = 0 , len = weChilds.length ; i <len ; i++) {
      if(weChilds[i].$value() === wselectedEle.$value()) {
        weChilds[i].css({ 'backgroundColor' : 'rgb(187,187,187)', 'color' : 'white' });
      }else {
        weChilds[i].css({ 'backgroundColor' : 'white', 'color' : 'black' });
      }
    }
  };

  /*
   * 리스트 영역 컨트롤러 
   * @param {jindo element} weMatchedList , 일치하는 리스트
   * @param {jindo element} weSelectedMenu, 일치하는 좌측메뉴 */
  MakeListUI._listController = function(list , menu) {
      /* display Section List */ 
      _displayMatchedList(list);

      /* set position Section List */
      _setTopPositionMatchedList(list, menu);

      /*
       * 매치된 리스트 영역 보여주기  
       * @param {void}
       */
      function _displayMatchedList(weMatchedList) {
        //
        weMatchedList.css({
          'display' : 'block'
        });
      }


      /*
       * 매치된 리스트 영역의 top 위치와 마름모 위치값을 조정
       * @param {jindo element} weMatchedList , 일치하는 리스트
       * @param {jindo element} weSelectedMenu, 일치하는 좌측메뉴 
       */
      function _setTopPositionMatchedList(weMatchedList, weSelectedMenu) {
          //매치된 리스트 영역의 top 위치 설정
          var eleHeight = parseInt(weMatchedList.css('height'));
          var offsetYSectionEle = $Element('mainBody').offset().top;
          var offsetYClickEle = weSelectedMenu.offset().top;
          weMatchedList.css({
            'top' : offsetYClickEle- offsetYSectionEle - (eleHeight/2) + "px"
          });

          //화살표 마름모의 위치값 조정.
          //TODO. getCalculateStaticValue 이미 계산된 값을 가져오게 preprocess개발 
          var nHeight = parseInt(utils.getCalculateStaticValue().nHeightLeftMenuLi);
          var weListWrap = $Element('list');
          weListWrap.query('div').css({
            'top' : offsetYClickEle - offsetYSectionEle + (nHeight / 4)+ "px"  //4는 마름모 놈의 대충 모양의 위치를 잡으려고 박아둔 값이다 (쉣~)
          });
        }


  }; //end of _listController function

  MakeListUI._hideAllSection = function(el) {
      el.css('display', 'none'); 
  }

  return MakeListUI;

})();

  /***************************************** UTILITIES *****************************************/
  /**
  * [utiliy 모음]
   * @return {[JAVASCRIPT Object ]}
   */
  var utils = (function() {

    function getCalculateStaticValue() {
      var oPageData = {};
      //oPageData['nHeightLeftMenuLi'] = $Element('categoryList').query('li:first-child').height();  // margin등이 포함되어 있다.
      oPageData['nHeightLeftMenuLi'] = $Element('categoryList').query('li:first-child').css('height');
      return oPageData;
    }

    function isMobile() {
      function isMobileAgent() {
        return !! (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      }
      function isMobileWidth() {
        return !! ($Document(document).clientSize().width < 401);
      }
      return !! (isMobileAgent() && isMobileWidth());
    }

    return  { 
              getCalculateStaticValue : getCalculateStaticValue,
              isMobile : isMobile
            };
  })(); //end of utils
