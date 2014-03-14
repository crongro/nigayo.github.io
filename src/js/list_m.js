
function isMobile() {
      function isMobileAgent() {
        return !! (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      }
      function isMobileWidth() {
        return !! ($Document(document).clientSize().width < 401);
      }
      return !! (isMobileAgent() && isMobileWidth());
}