app.directive('responsiveBg', function(Auth){
  return {
    restrict: 'A',
    scope: {
      bgImage: '='
    },
    link: function(scope, element, attr) {
      element.css('background-image', 'url(' + scope.bgImage + ')');
    },
  };
});
