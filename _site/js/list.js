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
        
        //선택한 카테고리의 정보만 보여준다. 
        var sCat = eEvent.element.innerText;
        var weMatchEle = $Element($$.getSingle('.CAT_'+sCat));
        weMatchEle.css({
          'display' : 'block',
          'padding' : '30px 0px'
        });

        //메인 영역의 크기 설정
        var eleHeight = weMatchEle.css('height').replace(/px/i,"");
        var offsetYSectionEle = $Element('mainBody').offset().top;
        var offsetYClickEle = $Element(eEvent.element).offset().top;
        weMatchEle.css({
          'top' : offsetYClickEle- offsetYSectionEle - (eleHeight/2) + "px"
        })

        //TODO. getCalculateStaticValue 이미 계산된 값을 가져오게 preprocess개발 
        var nHeight = utils.getCalculateStaticValue().nHeightLeftMenuLi.replace(/px/i,"");

        var listEle = $Element('list');
        
        listEle.query('div').css({
          'top' : offsetYClickEle - offsetYSectionEle + (nHeight / 4)+ "px"  //4는 마름모 놈의 대충 모양의 위치를 잡으려고 박아둔 값이다 (쉣~)
        });
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
    //oPageData['nHeightLeftMenuLi'] = $Element('categoryList').query('li:first-child').height();
    oPageData['nHeightLeftMenuLi'] = $Element('categoryList').query('li:first-child').css('height');
    return oPageData;
  }

  return  { 
            setLayout : setLayout,
            getCalculateStaticValue : getCalculateStaticValue
          };
})();
