define([], function() {
	function isMobile() {
		if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
			return true;
		} 
		return false;
	}
	return {
		"isMobile" : isMobile
	}
});
