(function(win, doc){
	win.addEventListener("load", function() {
		initAnimation();
	});


	function initAnimation() {
		var elUL = doc.querySelector("ul");
		var nSize = 680;

		var sTF = (typeof document.body.style.webkitTransform !== 'undefined') ? "webkitTransform" : 'transform';

		doc.querySelector("#controller").addEventListener("click", function(ev) {

			var preCss = elUL.style[sTF];
			var nPreX = +preCss.replace(/translate3d\((-*\d+)(px)*\,.+\)/g , "$1");
			nNewX = nPreX + (-nSize);

			elUL.style[sTF] = "translate3d("+ nNewX +"px, 0, 0)";

		},false);
	}
})(window, document);