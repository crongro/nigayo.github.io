require.config({
    baseUrl:"/src",
    paths : {
    	jindo : "lib/js/jindo"
    },
    waitSeconds: 15
});

require([
    "js/lecture/view",
], function (oIntro) {
	console.log("called main callback function");
	oIntro.init();
});