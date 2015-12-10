var karma = angular.module('SteroidsApplication', [
  'supersonic',
  'infinite-scroll'
]);

karma.controller('IndexController', function($scope, supersonic, Karma) {
  
  $scope.search_term = '';

  $scope.navbarTitle = "Библиотека online";
  
  $scope.Karma = new Karma();
  
});

// Reddit constructor function to encapsulate HTTP and pagination logic
karma.factory('Karma', function($http) {
    
  var Karma = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
    this.page = 1;
    this.items_per_page = 20;
    this.search_term = 'Пушкин';
  };

  Karma.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = "http://env-0112901.j.layershift.co.uk/?q=" + this.search_term;
    
//    alert($http.get(url))
    
    $http.get(url).then(function(data) {
      console.log(data);
      var items = data;
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i].data);
      }
      this.after = this.items[this.items.length - 1].id;
      this.busy = false;
    }.bind(this), function(e){
        console.log(e)
    });
  };

  return Karma;
});