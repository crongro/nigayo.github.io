var fs = require('fs');

var inFile = "../page/lecture/uib/template.html";
var outFile = "./result.html";

(function() {

	//설정파일 읽기
    var htData = require('./data/webuibasic.js').data;

    fs.readFile(inFile, 'utf8', function(err,data){
    	if(err) return console.log("file error");

    	for(var value in htData[0]) {
    		var _sReg = '<!--%'+value +'-->';
	    	data = data.replace(_sReg, htData[0][value]);
    	}


    	fs.writeFile(outFile, data , 'utf8', function(err) {
    		if(err) return console.log('error write', err);
    	});
    });

})();