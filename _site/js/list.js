$Element(document).attach('domready', function() {
  utils.setLayout();
});


var utils = (function() {
  function setLayout() {
    var elCategory = $Element('categoryList')

    var nCategoryHeight = elCategory.height();
    var nMainBodyHeight = $Element('mainBody').height();
    var nTopPos = (nMainBodyHeight - nCategoryHeight)/2;
    elCategory.css('top',nTopPos+'px');
  }
  return  { 
            setLayout : setLayout
          };
})();
