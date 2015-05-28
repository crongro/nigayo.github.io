QUnit.module("utils test")
test('모바일 기기인지 체크' , function() {
	equal(utils.isMobile() , false , '모바일기기가 아닙니다.');
});

test("마름모 UI 위치설정하기 위한 위치값", function() {
	ok(typeof parseInt(utils.getCalculateStaticValue().nHeightLeftMenuLi) === 'number', '마름모 UI구성을 위해 숫자 형태를 가져오는데 성공했습니다');
});


QUnit.module("Handler : layer" , {
	"setup" : function() {
		this._o = Nigayo.List().$_getPriv();
	},
	"teardown" : function() {
		//this._o = null;
	}
});
test(" 선택된 카테고리대로 리스트 영역이 노출되는지 테스트 " , function() {
	for(var i = 2 ; i < 6 ; i++) {
		//Given
		var _elLI = $Element($$.getSingle('#categoryList>li:nth-child('+i+')'));
		var _elLI_sibling_prev = _elLI.prev();
		var _elLI_sibling_next= _elLI.next();

		//when
		this._o._setMenu(_elLI);

		//Then
		equal(_elLI.css("backgroundColor"), 'rgb(187, 187, 187)', '선택된 '+i+'번째 메뉴영역의 배경색이 변경되었음');
		equal(_elLI_sibling_prev.css("backgroundColor"), 'white', '선택된 메뉴영역 이전 배경색이 변경되었음');
		equal(_elLI_sibling_next.css("backgroundColor"), 'white', '선택된 메뉴영역 이후 배경색이 변경되었음');
	}
});

//todo. change variable 'i'
test("카테고리와 일치하는 영역이 보이는지 확인", function() {
	//Given
	for(var i = 1 ; i < 7; i++) {
		var _elLI = $Element($$.getSingle('#categoryList>li:nth-child('+i+')'));
		var _elsCat = _elLI.text().trim();
		var _weMatchList = $Element($$.getSingle('.CAT_'+_elsCat));

		//when
		this._o._listController(_weMatchList, _elLI);

		//Then
		equal(_weMatchList.css("display") , 'block', "선택된 "+i+"번째 리스트 영역이 보인다고요");

		//reset
		var welSections     = $ElementList('section#list section');
		this._o._hideAllSection(welSections);
	}
});
