var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var DATA = {
	TEMPLATE_PATH 	: "./data/template.html",
	//BASIC_NAME 		: "WEB UI BASIC",
};

(function() {

	var _sFileType, lectureType, _lectureNumber;


	rl.question("select basic or advanced : ", function(answer) {
		_sFileType = answer || "basic";
		_execProcess(_sFileType);
		rl.close();
	});

	//설정파일 읽기

	function _execProcess(_sFileType) {

	    var htData = require('./data/'+_sFileType+'.js').data;
	    var htData_len = htData.length;

	    fs.readFile(DATA.TEMPLATE_PATH, 'utf8', function(err,data){
	    	if(err) return console.log("file error");

	    	//전체항목의 LIST를 만든다.
	    	data = _getLeftMenuData(data, htData, htData_len);

	    	for(var i=0; i<htData_len; i++) {

	    		var result = data;

		    	for(var value in htData[i]) {
		    		var _sReg = new RegExp('<!--%'+value +'-->','g');
			    	result = result.replace(_sReg, htData[i][value]);
		    	}

		    	fs.writeFile("./"+_sFileType+"/"+(i+1)+".html", result, 'utf8', function(err) {
		    		if(err) return console.log('error write', err);
		    	});
	    	}
	    });
	}

	function _getLeftMenuData(data, htData, htData_len) {

		var _sReg;

		for(var i=0; i<htData_len; i++) {
			_sReg = new RegExp('<!--%lecture'+(i+1)+'-->' , 'g');
			//_sReg = '<!--%lecture'+(i+1)+'-->';
			// console.log(_sReg);
			// console.log(htData[i].Lecture_title);
			data = data.replace(_sReg, htData[i].Lecture_title);
		}

		return data;
	}

})();