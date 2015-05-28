require.config({
    baseUrl:"/src",
    paths : {
    	jindo : "lib/js/jindo",
    	util : "js/lecture/util",
    	common : "js/lecture/common",
    	data : "js/lecture/data"
    },
    waitSeconds: 15
});

require([
    "js/lecture/view"
], function (oIntro) {
	oIntro.init();
});