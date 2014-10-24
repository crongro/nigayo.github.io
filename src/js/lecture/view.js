define(["jindo"] , function(jindo) {
	var _innerVar;

	function _init() {
		console.log("initfunction");
		console.log("jindo test 2", jindo)
	}

	return {
		"init" : _init
	}
});