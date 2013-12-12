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
        return oClickEle.nodeName == "LI";
      },
      function(eEvent) {

        //모든 section 태그를 숨긴다.
        var elSections = $ElementList('section#list section');
        elSections.css('display', 'none'); 

        //좌측 선택영역
        var weSelectedMenu = $Element(eEvent.element);

        //선택한 카테고리의 정보만 보여준다. 
        var sCat = weSelectedMenu.text().trim();
        var weMatchedList = $Element($$.getSingle('.CAT_'+sCat));
        var elefoot = $Element($$.getSingle('footer'));


        _setStyleMenu(weSelectedMenu);


        //매치된 리스트 영역 보여주기 
        weMatchedList.css({
          'display' : 'block'
        });

        //매치된 리스트 영역의 크기 설정
        var eleHeight = parseInt(weMatchedList.css('height'));
        var offsetYSectionEle = $Element('mainBody').offset().top;
        var offsetYClickEle = weSelectedMenu.offset().top;
        weMatchedList.css({
          'top' : offsetYClickEle- offsetYSectionEle - (eleHeight/2) + "px"
        })

        //화살표 마름모의 위치값 조정.
        //TODO. getCalculateStaticValue 이미 계산된 값을 가져오게 preprocess개발 
        var nHeight = parseInt(utils.getCalculateStaticValue().nHeightLeftMenuLi);
        var weListWrap = $Element('list');
        weListWrap.query('div').css({
          'top' : offsetYClickEle - offsetYSectionEle + (nHeight / 4)+ "px"  //4는 마름모 놈의 대충 모양의 위치를 잡으려고 박아둔 값이다 (쉣~)
        });

        //footer 조정이 필요하면 아래로 밀어버리기
        var weMatchedListTop = weMatchedList.offset().top;
        var weMatchedListHeight = weMatchedList.height();
        var nMatchEleBottomOffsetTop = weMatchedListTop + weMatchedListHeight;
        var nFooterTop = elefoot.offset().top;
        var nGap = nMatchEleBottomOffsetTop - nFooterTop;
        var nFootMarginTop = parseInt(elefoot.css("marginTop"));
        if( nGap > 0) {
            elefoot.css({'top' : nGap + nFootMarginTop + "px"})
        }

        //internal function
        function _setStyleMenu(selectedEle) {
            var weChilds = $Element(eEvent.element.parentElement).child();

            for(var i = 0 , len = weChilds.length ; i <len ; i++) {
                if(weChilds[i].$value() === selectedEle.$value()) {
                    weChilds[i].css({ 'backgroundColor' : 'rgb(163, 163, 163)', 'color' : 'white' });
                }else {
                    weChilds[i].css({ 'backgroundColor' : 'white', 'color' : 'black' });
                }
            }
        }

      }
  );

}

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

  return  { 
            setLayout : setLayout,
            getCalculateStaticValue : getCalculateStaticValue
          };
})();
