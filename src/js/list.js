
(function(){
  $Element(document).attach('domready', function() {
    //set verticle center
    utils.setLayout();
    attachEvents();
    fireLayer(); //본문 영역을 첫번째 선택한 것으로 fire!!
  });

  function fireLayer() {
    var oLiOffset = $Element('categoryList').query('li:first-child').offset();
    $Element('categoryList').query('li:first-child').fireEvent('click');
  }

  function attachEvents() {
    /* Left Menu */
    //TODO. 기능 분리.
    $Element('categoryList').delegate('click', 
        function (oEle, oClickEle) {
          return ((oClickEle.nodeName == "LI") && !utils.isMobile());
        }, menuHandler); //end of Delegate

    function menuHandler(eEvent) {
        //alert('not mobilella');

        // declaration Variables
        var weSelectedMenu  = $Element(eEvent.element); //좌측 선택영역
        var sCat            = weSelectedMenu.text().trim();
        var weMatchedList   = $Element($$.getSingle('.CAT_'+sCat));
        var welefoot        = $Element($$.getSingle('footer'));
        var welSections     = $ElementList('section#list section');

        //초기화 작업. 모든 section 태그를 숨긴다.
        welSections.css('display', 'none'); 

        /* MENU */ 
        _setMenu(weSelectedMenu);

        /* LIST */
        _listController(weMatchedList, weSelectedMenu);

        /* FOOTER */
         _setFooter(weMatchedList,welefoot);

      } //end of menuHandler Function
  } //end of AttachEvents



  /******************************** Handler Action Functions **************************************************/
  /**
   * 좌측 메뉴가 선택될때 마다 배경/색깔을 설정 함 (css toggle)
   * @param {[Jindo Element]} selectedEle
   */
  function _setMenu(wselectedEle) {

    var weChilds = wselectedEle.parent().child();

    for(var i = 0 , len = weChilds.length ; i <len ; i++) {
      if(weChilds[i].$value() === wselectedEle.$value()) {
        weChilds[i].css({ 'backgroundColor' : 'rgb(187, 187, 187)', 'color' : 'white' });
      }else {
        weChilds[i].css({ 'backgroundColor' : 'white', 'color' : 'black' });
      }
    }
  }

  /*
   * 리스트 영역 컨트롤러 
   * @param {jindo element} weMatchedList , 일치하는 리스트
   * @param {jindo element} weSelectedMenu, 일치하는 좌측메뉴 
   */
  function _listController(list , menu) {
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
  } //end of _listController function




  /*
   * 
   */
  function _setFooter(weMatchedList, welefoot) {
     var weMatchedListTop = weMatchedList.offset().top;
     var weMatchedListHeight = weMatchedList.height();
     var nMatchEleBottomOffsetTop = weMatchedListTop + weMatchedListHeight;
     var nFooterTop = welefoot.offset().top;
     var nGap = nMatchEleBottomOffsetTop - nFooterTop;
     var nFootMarginTop = parseInt(welefoot.css("marginTop"));
     if( nGap > 0) welefoot.css({'top' : nGap + nFootMarginTop + "px"}); 
  }



  /***************************************** UTILITIES *****************************************/
  /**
  * [utiliy 모음]
   * @return {[JAVASCRIPT Object ]}
   */
  var utils = (function() {
    function setLayout() {
      var elCategory = $Element('categoryList')
      var nCategoryHeight = elCategory.height();
      var nMainBodyHeight = $Element('mainBody').height();
      var nTopPos = (nMainBodyHeight - nCategoryHeight)/2;
      elCategory.css('top',nTopPos+'px');
    }

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
              setLayout : setLayout,
              getCalculateStaticValue : getCalculateStaticValue,
              isMobile : isMobile
            };
  })(); //end of utils

})();
