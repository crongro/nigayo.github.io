var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var inFile = "../page/lecture/uib/template.html";

(function() {

	var _sFileType;

	rl.question("select basic or advanced : ", function(answer) {
	  _fileType = answer || "basic";
	  execMainProcess(_sFileType);
	  rl.close();
	});

	//설정파일 읽기

	function execMainProcess(_sFileType) {

	    var htData = require('./data/'+_sFileType+'.js').data;
	    var htData_len = htData.length;

	    fs.readFile(inFile, 'utf8', function(err,data){
	    	if(err) return console.log("file error");

	    	for(var i=0; i<htData_len; i++) {

	    		var result = data;

		    	for(var value in htData[i]) {
		    		var _sReg = '<!--%'+value +'-->';
			    	result = result.replace(_sReg, htData[i][value]);
		    	}

		    	//var _p = htData[i].title === "WEB UI BASIC" ? i+1 : "adv_"+(i-9);
		    	var _f = htData[i].title === "WEB UI BASIC" ? "uib" : "adv_"+(i-9);

		    	fs.writeFile("./"+ _f + ".html", result, 'utf8', function(err) {
		    		if(err) return console.log('error write', err);
		    	});
	    	}
	    });
	}

})();