var fs = require('fs');

var inFile = "../page/lecture/uib/template.html";

(function() {

	//설정파일 읽기
    var htData = require('./data/webuibasic.js').data;
    var htData_len = htData.length;

    fs.readFile(inFile, 'utf8', function(err,data){
    	if(err) return console.log("file error");

    	for(var i=0; i<htData_len; i++) {

    		var result = data;

	    	for(var value in htData[i]) {
	    		var _sReg = '<!--%'+value +'-->';
		    	result = result.replace(_sReg, htData[i][value]);
	    	}

	    	fs.writeFile("./"+(i+1)+".html", result, 'utf8', function(err) {
	    		if(err) return console.log('error write', err);
	    	});
    	}
    });

})();